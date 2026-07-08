import { useEffect, useRef, useState } from 'react';
import type { Meta, Sesion, Valor } from '../lib/tipos';
import { BANCO, TOTAL_PREGUNTAS } from '../data/banco';
import { contarRespondidas } from '../lib/scoring';
import {
  cargarSesiones,
  guardarSesiones,
  nuevaSesion,
  etiquetaSesion,
  cargarTema,
  guardarTema,
  exportarJSON,
  exportarCSV,
  exportarConsolidadoCSV,
  importarJSON,
} from '../lib/persistencia';
import { bajarSesiones, subirSesiones, borrarSesionRemota, fusionar } from '../lib/sync';
import Portada from './Portada';
import Cuestionario from './Cuestionario';
import Resultados from './Resultados';
import Consolidado from './Consolidado';

type Vista = 'portada' | 'cuestionario' | 'resultados' | 'consolidado';
const FECHA_LIMITE = new Date(2026, 11, 1); // 1-dic-2026

export default function App() {
  const [vista, setVista] = useState<Vista>('portada');
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [activaId, setActivaId] = useState<string | null>(null);
  const [cargado, setCargado] = useState(false);
  /** Conexión con el servidor local de sesiones (SQLite): probando / conectado / no disponible. */
  const [bd, setBd] = useState<'probando' | 'on' | 'off'>('probando');
  /** Hora del último autoguardado local, para mostrar al encuestado. */
  const [guardadoEn, setGuardadoEn] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // A dónde volver tras importar un JSON (portada/cuestionario vs consolidado).
  const importDestino = useRef<Vista>('cuestionario');

  // Trae las sesiones de la base local (si el servidor está corriendo) y las combina.
  const sincronizarDesdeServidor = async () => {
    const remotas = await bajarSesiones();
    if (remotas === null) {
      setBd('off');
      return;
    }
    setBd('on');
    if (remotas.length > 0) {
      setSesiones((prev) => {
        // Al fusionar, descarta sesiones locales totalmente vacías (la sesión "en blanco"
        // que se crea al abrir la app por primera vez) para no ensuciar la lista.
        const conContenido = prev.filter(
          (s) => Object.keys(s.respuestas).length > 0 || Object.values(s.meta).some(Boolean)
        );
        return fusionar(conContenido.length > 0 ? conContenido : prev, remotas);
      });
    }
  };

  // Cargar estado guardado al montar (solo en el cliente). Migra el formato v1 si existe.
  useEffect(() => {
    const d = cargarSesiones();
    if (d && d.sesiones.length > 0) {
      setSesiones(d.sesiones);
      setActivaId(d.activaId && d.sesiones.some((s) => s.id === d.activaId) ? d.activaId : d.sesiones[0]!.id);
    } else {
      const s = nuevaSesion();
      setSesiones([s]);
      setActivaId(s.id);
    }
    const t = cargarTema();
    if (t) document.documentElement.setAttribute('data-theme', t);
    setCargado(true);
    void sincronizarDesdeServidor();
  }, []);

  // Si la sesión activa desaparece (p. ej. tras fusionar con la base), activar la primera.
  useEffect(() => {
    if (cargado && sesiones.length > 0 && !sesiones.some((s) => s.id === activaId)) {
      setActivaId(sesiones[0]!.id);
    }
  }, [sesiones, activaId, cargado]);

  // Reintentar la conexión con la base al volver a la pestaña.
  useEffect(() => {
    const alVolver = () => {
      if (bd === 'off') void sincronizarDesdeServidor();
    };
    window.addEventListener('focus', alVolver);
    return () => window.removeEventListener('focus', alVolver);
  }, [bd]);

  // Autoguardar cada cambio: siempre en este navegador y, si está disponible, en la base local.
  useEffect(() => {
    if (!cargado) return;
    guardarSesiones({ sesiones, activaId });
    setGuardadoEn(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }));
    if (bd === 'on') {
      void subirSesiones(sesiones).then((ok) => {
        if (!ok) setBd('off');
      });
    }
  }, [sesiones, activaId, cargado, bd]);

  const activa = sesiones.find((s) => s.id === activaId) ?? sesiones[0] ?? null;
  const respuestas = activa?.respuestas ?? {};
  const meta = activa?.meta ?? {};

  const mutarActiva = (fn: (s: Sesion) => Sesion) => {
    setSesiones((prev) =>
      prev.map((s) => (s.id === activaId ? { ...fn(s), actualizada: new Date().toISOString() } : s))
    );
  };

  const responder = (qid: string, val: Valor) => {
    mutarActiva((s) => {
      const r = { ...s.respuestas };
      if (r[qid] === val) delete r[qid]; // volver a hacer clic = deseleccionar
      else r[qid] = val;
      return { ...s, respuestas: r };
    });
  };

  const setMetaCampo = (campo: keyof Meta, valor: string) =>
    mutarActiva((s) => ({ ...s, meta: { ...s.meta, [campo]: valor } }));

  const irVista = (v: Vista) => {
    setVista(v);
    window.scrollTo(0, 0);
  };

  const crearSesion = () => {
    const s = nuevaSesion();
    setSesiones((prev) => [...prev, s]);
    setActivaId(s.id);
    irVista('portada');
  };

  const abrirSesion = (id: string) => {
    setActivaId(id);
    irVista('cuestionario');
  };

  const eliminarSesion = (id: string) => {
    const idx = sesiones.findIndex((x) => x.id === id);
    const s = sesiones[idx];
    if (!s) return;
    const n = contarRespondidas(BANCO, s.respuestas);
    const et = etiquetaSesion(s, idx);
    if (!window.confirm(`¿Eliminar la sesión «${et}» (${n} respuestas)? Esta acción no se puede deshacer.`)) return;
    if (bd === 'on') void borrarSesionRemota(id);
    let next = sesiones.filter((x) => x.id !== id);
    let nextId = activaId === id ? next[0]?.id ?? null : activaId;
    if (next.length === 0) {
      const nueva = nuevaSesion();
      next = [nueva];
      nextId = nueva.id;
    }
    setSesiones(next);
    setActivaId(nextId);
  };

  const toggleTema = () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = cur === 'dark' ? 'light' : cur === 'light' ? 'dark' : prefiereOscuro ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    guardarTema(next);
  };

  const pedirImportar = (destino: Vista) => {
    importDestino.current = destino;
    fileRef.current?.click();
  };

  const doImportar = (file: File) => {
    importarJSON(file)
      .then((d) => {
        const s = nuevaSesion(d.meta, d.respuestas);
        setSesiones((prev) => [...prev, s]);
        if (importDestino.current === 'consolidado') {
          irVista('consolidado');
        } else {
          setActivaId(s.id);
          irVista('cuestionario');
        }
        alert('Respuestas importadas como una nueva sesión.');
      })
      .catch(() => alert('No se pudo leer el archivo. Verifique que sea un JSON exportado por esta herramienta.'));
  };

  const dias = Math.ceil((FECHA_LIMITE.getTime() - Date.now()) / 86400000);
  const etiquetaActiva = activa ? etiquetaSesion(activa, sesiones.indexOf(activa)) : '';

  return (
    <>
      <header className="topbar no-print">
        <div className="wrap">
          <div className="brand">
            Autoevaluación de madurez en protección y gobernanza de datos
            <small>Ley 21.719 (vigente 1-dic-2026) + Marco MGDE</small>
          </div>
          <div className="spacer" />
          <span
            className={`bd-chip ${bd}`}
            title={
              bd === 'on'
                ? 'Las sesiones se respaldan en la base de datos local (SQLite) además de este navegador.'
                : 'Las respuestas se guardan solo en este navegador. Para respaldarlas en la base local, ejecute `npm run servidor` en el equipo que sirve la app.'
            }
          >
            {bd === 'on' ? '● BD conectada' : bd === 'off' ? '○ solo este equipo' : '…'}
          </span>
          <button className="icon-btn" onClick={toggleTema} title="Cambiar tema claro/oscuro">◑ Tema</button>
        </div>
      </header>

      {vista === 'portada' && (
        <Portada
          meta={meta}
          onMeta={setMetaCampo}
          onComenzar={() => irVista('cuestionario')}
          onImportarClick={() => pedirImportar('cuestionario')}
          sesiones={sesiones}
          activaId={activa?.id ?? null}
          total={TOTAL_PREGUNTAS}
          dias={dias}
          onNuevaSesion={crearSesion}
          onAbrirSesion={abrirSesion}
          onEliminarSesion={eliminarSesion}
          onVerConsolidado={() => irVista('consolidado')}
        />
      )}

      {vista === 'cuestionario' && (
        <Cuestionario
          key={activa?.id ?? 'sin-sesion'}
          respuestas={respuestas}
          etiqueta={etiquetaActiva}
          guardadoEn={guardadoEn}
          onResponder={responder}
          onVerResultados={() => irVista('resultados')}
          onVolver={() => irVista('portada')}
          onExportar={() => exportarJSON(respuestas, meta)}
        />
      )}

      {vista === 'resultados' && (
        <Resultados
          respuestas={respuestas}
          meta={meta}
          onEditar={() => irVista('cuestionario')}
          onPrint={() => window.print()}
          onCSV={() => exportarCSV(BANCO, respuestas, meta)}
          onJSON={() => exportarJSON(respuestas, meta)}
        />
      )}

      {vista === 'consolidado' && (
        <Consolidado
          sesiones={sesiones}
          onVolver={() => irVista('portada')}
          onImportarClick={() => pedirImportar('consolidado')}
          onAbrirSesion={abrirSesion}
          onCSV={(conDatos) => exportarConsolidadoCSV(BANCO, conDatos)}
          onPrint={() => window.print()}
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) doImportar(f);
          e.target.value = '';
        }}
      />
    </>
  );
}
