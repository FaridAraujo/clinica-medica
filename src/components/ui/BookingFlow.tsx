'use client';

import { useState, useMemo } from 'react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4;

interface PatientInfo {
  name: string;
  phone: string;
  motivo: string;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const MORNING_SLOTS   = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30'];
const AFTERNOON_SLOTS = ['14:00','14:30','15:00','15:30','16:00','16:30'];
const WA_PHONE        = '50685418877';

const DAYS_SHORT  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MONTHS_LONG = ['enero','febrero','marzo','abril','mayo','junio',
                     'julio','agosto','septiembre','octubre','noviembre','diciembre'];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function isTaken(date: Date, time: string): boolean {
  const seed    = date.getDate() * 7 + date.getMonth() * 31;
  const timeIdx = [...MORNING_SLOTS, ...AFTERNOON_SLOTS].indexOf(time);
  return (seed + timeIdx * 3) % 4 === 0;
}

type CalCell = { date: Date; status: 'past' | 'today' | 'available' };

function buildCalendar(weeksCount = 3): { weeks: CalCell[][]; today: Date } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Lunes de la semana actual (si hoy es domingo, retrocede 6; si es lunes, 0; etc.)
  const cursor = new Date(today);
  const dow = cursor.getDay();
  const daysFromMonday = dow === 0 ? 6 : dow - 1;
  cursor.setDate(cursor.getDate() - daysFromMonday);

  const weeks: CalCell[][] = [];
  for (let w = 0; w < weeksCount; w++) {
    const week: CalCell[] = [];
    for (let d = 0; d < 5; d++) {
      const date = new Date(cursor);
      const status: CalCell['status'] =
        date < today ? 'past' :
        date.getTime() === today.getTime() ? 'today' :
        'available';
      week.push({ date, status });
      cursor.setDate(cursor.getDate() + 1);
    }
    cursor.setDate(cursor.getDate() + 2); // saltar fin de semana
    weeks.push(week);
  }

  return { weeks, today };
}

function formatLong(d: Date) { return `${DAYS_SHORT[d.getDay()]}, ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}`; }

function buildWaUrl(date: Date, time: string, info: PatientInfo) {
  const lines = [
    'Hola Dr. Alvarado, me gustaría solicitar una cita:',
    '',
    `📅 Fecha: ${formatLong(date)}`,
    `⏰ Hora: ${time} hrs`,
    `👤 Nombre: ${info.name}`,
    `📱 WhatsApp: ${info.phone}`,
    info.motivo ? `📋 Motivo: ${info.motivo}` : null,
    '',
    'Quedo atento a su confirmación.',
  ].filter(Boolean).join('\n');
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines)}`;
}

/* ─── Step indicator — header confiado, no wizard genérico ──────────────── */
const STEP_LABELS = ['Fecha', 'Horario', 'Sus datos', 'Confirmación'];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-3.5">
        <span className="font-body text-[0.625rem] font-semibold uppercase tabular-nums tracking-[0.22em] text-red">
          Paso {String(current).padStart(2, '0')}
        </span>
        <span className="h-3 w-px bg-navy/[0.18]" aria-hidden="true" />
        <span className="font-body text-[0.95rem] font-medium tracking-[-0.005em] text-navy">
          {STEP_LABELS[current - 1]}
        </span>
      </div>
      <span className="font-body text-[0.625rem] font-medium tabular-nums uppercase tracking-[0.16em] text-navy/35">
        {String(current).padStart(2, '0')} <span className="text-navy/15">/</span> {String(STEP_LABELS.length).padStart(2, '0')}
      </span>
    </div>
  );
}

/* ─── Barra de progreso superior — al borde de la card ──────────────────── */
function ProgressBar({ current }: { current: Step }) {
  return (
    <div className="relative h-[3px] bg-navy/[0.06]">
      <div
        className="absolute inset-y-0 left-0 bg-red transition-[width] duration-500 ease-out"
        style={{ width: `${(current / STEP_LABELS.length) * 100}%` }}
      />
    </div>
  );
}

/* ─── Selección actual — breadcrumb sutil para los pasos 2-4 ────────────── */
function SelectionBadge({ date, time }: { date?: Date | null; time?: string | null }) {
  if (!date && !time) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border border-navy/[0.08] bg-warm-white px-4 py-3">
      <p className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-navy/40">
        Selección
      </p>
      <div className="h-3 w-px bg-navy/[0.15]" aria-hidden="true" />
      {date && <span className="font-body text-[0.825rem] font-medium text-navy">{formatLong(date)}</span>}
      {date && time && <span className="font-body text-[0.825rem] text-navy/30">·</span>}
      {time && <span className="font-body text-[0.825rem] font-medium text-navy">{time} hrs</span>}
    </div>
  );
}

/* ─── Back button ────────────────────────────────────────────────────────── */
function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 border border-navy/[0.15] px-4 py-2.5 font-body text-[0.775rem] font-medium text-navy/55 transition-all duration-150 hover:border-navy/40 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true">
        <path d="M10 3L5 8l5 5" />
      </svg>
      {label}
    </button>
  );
}

/* ─── STEP 1: Date ───────────────────────────────────────────────────────── */
function StepDate({ onSelect }: { onSelect: (d: Date) => void }) {
  const { weeks } = useMemo(() => buildCalendar(3), []);

  // Mes(es) que abarca la vista actual — para el subtitle contextual
  const monthsShown = useMemo(() => {
    const set = new Set<string>();
    weeks.forEach(w => w.forEach(c => set.add(`${c.date.getFullYear()}-${c.date.getMonth()}`)));
    return Array.from(set).map(s => {
      const [y, m] = s.split('-').map(Number);
      return { year: y, month: m };
    });
  }, [weeks]);

  return (
    <div className="flex flex-col gap-8">

      {/* Heading editorial */}
      <div className="flex flex-col gap-2">
        <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
          Atención de lunes a viernes. Seleccione un día para ver los horarios disponibles.
        </p>
      </div>

      {/* Calendario — semanas como filas, formato libreta de citas */}
      <div className="flex flex-col">

        {/* Etiqueta del mes — separador editorial */}
        <div className="flex items-baseline gap-3 border-b border-navy/[0.10] pb-3">
          <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-navy">
            {monthsShown.map(({ month }) => MONTHS_LONG[month]).join(' / ')}
          </span>
          <div className="h-px flex-1 bg-navy/[0.06]" aria-hidden="true" />
          <span className="font-body text-[0.55rem] tabular-nums uppercase tracking-[0.18em] text-navy/35">
            {monthsShown[0].year}
          </span>
        </div>

        {/* Encabezado de días de la semana */}
        <div className="grid grid-cols-5 pt-4 pb-2.5">
          {['Lun','Mar','Mié','Jue','Vie'].map(d => (
            <div key={d} className="text-center font-body text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-navy/35">
              {d}
            </div>
          ))}
        </div>

        {/* Filas de semanas */}
        {weeks.map((week, wi) => (
          <div
            key={wi}
            className={[
              'grid grid-cols-5 border-t border-navy/[0.06]',
              wi === weeks.length - 1 ? 'border-b border-navy/[0.06]' : '',
            ].join(' ')}
          >
            {week.map(({ date, status }) => {
              const isPast      = status === 'past';
              const isToday     = status === 'today';
              const isClickable = status === 'available';

              return (
                <button
                  key={date.toISOString()}
                  disabled={!isClickable}
                  onClick={() => isClickable && onSelect(date)}
                  className={[
                    'group relative flex flex-col items-center justify-center gap-1 py-4 transition-colors duration-150 focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue sm:py-5',
                    isClickable
                      ? 'cursor-pointer hover:bg-navy active:scale-[0.97]'
                      : 'cursor-not-allowed',
                  ].join(' ')}
                >
                  <span className={[
                    'font-body font-bold tabular-nums leading-none tracking-[0.04em] transition-colors',
                    'text-[0.9375rem] sm:text-[1rem]',
                    isClickable ? 'text-navy group-hover:text-white' : '',
                    isPast      ? 'text-navy/15 line-through decoration-navy/15 decoration-1' : '',
                    isToday     ? 'text-navy/35' : '',
                  ].join(' ')}>
                    {date.getDate()}
                  </span>

                  {/* Mini-label debajo según estado */}
                  {isToday && (
                    <span className="font-body text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-red">
                      Hoy
                    </span>
                  )}
                  {isPast && (
                    <span className="font-body text-[0.5rem] uppercase tracking-[0.14em] text-navy/20">
                      —
                    </span>
                  )}
                  {isClickable && (
                    <span className="font-body text-[0.5rem] uppercase tracking-[0.14em] text-navy/30 transition-colors group-hover:text-white/50">
                      Disponible
                    </span>
                  )}

                  {/* Acento rojo en hover */}
                  {isClickable && (
                    <span className="absolute bottom-1.5 left-1/2 h-px w-3 -translate-x-1/2 bg-red opacity-0 transition-opacity duration-150 group-hover:opacity-100" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Footer del calendario — leyenda discreta */}
        <p className="mt-4 font-body text-[0.7rem] leading-relaxed text-navy/40">
          Mostrando 3 semanas. Para fechas más lejanas, escríbanos directamente por WhatsApp.
        </p>
      </div>
    </div>
  );
}

/* ─── STEP 2: Time ───────────────────────────────────────────────────────── */
function StepTime({ date, onSelect, onBack }: {
  date: Date;
  onSelect: (t: string) => void;
  onBack: () => void;
}) {
  const hasMorning   = MORNING_SLOTS.some(t => !isTaken(date, t));
  const hasAfternoon = AFTERNOON_SLOTS.some(t => !isTaken(date, t));

  function Slot({ time }: { time: string }) {
    const taken = isTaken(date, time);
    return (
      <button
        disabled={taken}
        onClick={() => onSelect(time)}
        className={[
          'flex items-center justify-center border bg-white py-3.5 font-body text-[0.9rem] font-medium tracking-[-0.01em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue',
          taken
            ? 'cursor-not-allowed border-navy/[0.06] bg-navy/[0.02] text-navy/20'
            : 'border-navy/[0.15] text-navy hover:border-navy hover:bg-navy hover:text-white active:scale-[0.96]',
        ].join(' ')}
      >
        {taken ? <span className="text-[0.7rem] uppercase tracking-[0.1em]">Ocupado</span> : time}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
        Seleccione un horario disponible para su consulta.
      </p>

      <SelectionBadge date={date} />

      <div className="flex flex-col gap-7">
        {hasMorning && (
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Mañana
              </span>
              <div className="h-px flex-1 bg-navy/[0.06]" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {MORNING_SLOTS.map(t => <Slot key={t} time={t} />)}
            </div>
          </div>
        )}

        {hasAfternoon && (
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
                Tarde
              </span>
              <div className="h-px flex-1 bg-navy/[0.06]" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {AFTERNOON_SLOTS.map(t => <Slot key={t} time={t} />)}
            </div>
          </div>
        )}
      </div>

      <BackButton onClick={onBack} label="Cambiar fecha" />
    </div>
  );
}

/* ─── STEP 3: Patient info ───────────────────────────────────────────────── */
function StepInfo({ date, time, onSubmit, onBack }: {
  date: Date;
  time: string;
  onSubmit: (info: PatientInfo) => void;
  onBack: () => void;
}) {
  const [name,   setName]   = useState('');
  const [phone,  setPhone]  = useState('');
  const [motivo, setMotivo] = useState('');
  const valid = name.trim().length >= 2 && phone.replace(/\D/g,'').length >= 8;

  const inputCls = [
    'w-full border border-navy/[0.15] bg-white px-4 py-3.5 font-body text-[1rem] text-navy',
    'placeholder:text-navy/25 transition-colors',
    'focus:border-navy focus:outline-none',
  ].join(' ');

  return (
    <div className="flex flex-col gap-8">
      <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
        Solo necesitamos su nombre y un número de WhatsApp para confirmarle la cita.
      </p>

      <SelectionBadge date={date} time={time} />

      <div className="flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <label className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
            Nombre completo <span className="text-red">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ej. María González Mora"
            autoComplete="name"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
            Número de WhatsApp <span className="text-red">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Ej. 8888-8888"
            autoComplete="tel"
            className={inputCls}
          />
          <p className="font-body text-[0.725rem] text-navy/35">
            Le enviaremos la confirmación a este número.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
            Motivo de la consulta{' '}
            <span className="font-normal normal-case tracking-normal text-navy/30">(opcional)</span>
          </label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="Ej. Valoración post-operatoria, seguimiento, consulta general…"
            className={`${inputCls} resize-none`}
          />
          <p className="self-end font-body text-[0.7rem] text-navy/25">
            {motivo.length}/200
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          onClick={() => valid && onSubmit({ name: name.trim(), phone: phone.trim(), motivo: motivo.trim() })}
          disabled={!valid}
          className={[
            'inline-flex items-center justify-center px-8 font-body text-sm font-medium tracking-wide text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
            valid
              ? 'bg-navy hover:bg-blue active:scale-[0.97] cursor-pointer'
              : 'cursor-not-allowed bg-navy/20',
          ].join(' ')}
          style={{ height: '3.25rem' }}
        >
          Revisar solicitud
        </button>
        <BackButton onClick={onBack} label="Cambiar horario" />
      </div>
    </div>
  );
}

/* ─── STEP 4: Confirm ────────────────────────────────────────────────────── */
function StepConfirm({ date, time, info, onBack, onRestart }: {
  date: Date;
  time: string;
  info: PatientInfo;
  onBack: () => void;
  onRestart: () => void;
}) {
  const waUrl = buildWaUrl(date, time, info);

  return (
    <div className="flex flex-col gap-8">
      <p className="font-body text-[0.875rem] leading-relaxed text-navy/55">
        Revise los detalles. Al confirmar se abrirá WhatsApp con su solicitud ya redactada — solo presione enviar.
      </p>

      {/* Tarjeta resumen — estilo "comprobante" */}
      <div className="border border-navy/[0.10] bg-warm-white">
        <div className="grid grid-cols-2 divide-x divide-navy/[0.08]">
          {[
            { label: 'Fecha',    value: formatLong(date) },
            { label: 'Horario',  value: `${time} hrs`    },
            { label: 'Nombre',   value: info.name        },
            { label: 'WhatsApp', value: info.phone       },
          ].map(({ label, value }, i) => (
            <div key={label} className={[
              'flex flex-col gap-1.5 px-5 py-5',
              i < 2 ? 'border-b border-navy/[0.08]' : '',
            ].join(' ')}>
              <p className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.18em] text-navy/35">
                {label}
              </p>
              <p className="font-body text-[0.9rem] font-medium leading-snug text-navy">
                {value}
              </p>
            </div>
          ))}
        </div>
        {info.motivo && (
          <div className="border-t border-navy/[0.08] px-5 py-5">
            <p className="font-body text-[0.575rem] font-semibold uppercase tracking-[0.18em] text-navy/35">Motivo</p>
            <p className="mt-1.5 font-body text-[0.875rem] leading-relaxed text-navy/70">{info.motivo}</p>
          </div>
        )}
      </div>

      {/* Qué pasa después */}
      <div className="flex flex-col gap-3">
        <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/40">
          Qué pasa después
        </p>
        <ol className="flex flex-col gap-2.5" role="list">
          {[
            'Enviamos su solicitud al Dr. Alvarado por WhatsApp.',
            'En menos de 24 horas hábiles le confirmamos la cita.',
            'Recibirá un recordatorio el día anterior.',
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 font-body text-[0.875rem] leading-relaxed text-navy/60">
              <span className="mt-2 h-px w-3 shrink-0 bg-red/60" aria-hidden="true" />
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] px-8 font-body text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-[#1aad53] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          style={{ height: '3.25rem' }}
        >
          <WaIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          Confirmar por WhatsApp
        </a>
        <BackButton onClick={onBack} label="Modificar datos" />
      </div>

      {/* Nueva solicitud */}
      <div className="border-t border-navy/[0.08] pt-6">
        <button
          onClick={onRestart}
          className="font-body text-[0.775rem] font-medium text-navy/45 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        >
          Hacer otra solicitud
        </button>
      </div>
    </div>
  );
}

/* ─── Root — card contenedora con header strip + content ─────────────────── */
export default function BookingFlow() {
  const [step,  setStep]  = useState<Step>(1);
  const [date,  setDate]  = useState<Date | null>(null);
  const [time,  setTime]  = useState<string | null>(null);
  const [info,  setInfo]  = useState<PatientInfo | null>(null);

  function restart() {
    setStep(1); setDate(null); setTime(null); setInfo(null);
  }

  return (
    <div className="border border-navy/[0.10] bg-white shadow-[0_1px_0_0_rgba(13,34,64,0.04)]">

      {/* Barra de progreso al borde superior */}
      <ProgressBar current={step} />

      {/* Header strip — único renglón confiado */}
      <div className="border-b border-navy/[0.08] bg-warm-white/40 px-5 py-4 sm:px-9 sm:py-5">
        <StepIndicator current={step} />
      </div>

      {/* Content area */}
      <div className="px-5 py-9 sm:px-9 sm:py-11">
        {step === 1 && (
          <StepDate
            onSelect={d => { setDate(d); setTime(null); setStep(2); }}
          />
        )}
        {step === 2 && date && (
          <StepTime
            date={date}
            onSelect={t => { setTime(t); setStep(3); }}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && date && time && (
          <StepInfo
            date={date}
            time={time}
            onSubmit={i => { setInfo(i); setStep(4); }}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && date && time && info && (
          <StepConfirm
            date={date}
            time={time}
            info={info}
            onBack={() => setStep(3)}
            onRestart={restart}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
