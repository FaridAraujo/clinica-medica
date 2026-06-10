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

function buildCalendar(weeksCount = 5): { weeks: CalCell[][] } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cursor = new Date(today);
  const dow = cursor.getDay();
  cursor.setDate(cursor.getDate() - (dow === 0 ? 6 : dow - 1));

  const weeks: CalCell[][] = [];
  for (let w = 0; w < weeksCount; w++) {
    const week: CalCell[] = [];
    for (let d = 0; d < 5; d++) {
      const date = new Date(cursor);
      const status: CalCell['status'] =
        date < today ? 'past' :
        date.getTime() === today.getTime() ? 'today' : 'available';
      week.push({ date, status });
      cursor.setDate(cursor.getDate() + 1);
    }
    cursor.setDate(cursor.getDate() + 2);
    weeks.push(week);
  }
  return { weeks };
}

function formatLong(d: Date) {
  return `${DAYS_SHORT[d.getDay()]}, ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}`;
}

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

/* ─── Step nav ───────────────────────────────────────────────────────────── */
const STEP_NAMES = ['Fecha', 'Horario', 'Datos', 'Confirmar'] as const;

function StepNav({ current }: { current: Step }) {
  return (
    <nav aria-label="Pasos de agendamiento" className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-navy/[0.08] pb-6">
      {STEP_NAMES.map((label, i) => {
        const n = (i + 1) as Step;
        const isDone   = n < current;
        const isActive = n === current;
        return (
          <span key={label} className="flex items-center gap-2">
            <span
              aria-current={isActive ? 'step' : undefined}
              className={[
                'font-body text-[0.78rem] transition-colors',
                isActive ? 'font-semibold text-navy' : isDone ? 'text-navy/35' : 'text-navy/18',
              ].join(' ')}
            >
              {label}
            </span>
            {i < STEP_NAMES.length - 1 && (
              <span className="font-body text-[0.6rem] text-navy/15" aria-hidden="true">·</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* ─── Selection badge ────────────────────────────────────────────────────── */
function SelectionBadge({ date, time }: { date?: Date | null; time?: string | null }) {
  if (!date && !time) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 border-l-2 border-red pl-4">
      {date && (
        <span className="font-body text-[0.85rem] font-medium text-navy">{formatLong(date)}</span>
      )}
      {date && time && <span className="text-navy/25" aria-hidden="true">·</span>}
      {time && (
        <span className="font-body text-[0.85rem] font-medium text-navy">{time} hrs</span>
      )}
    </div>
  );
}

/* ─── Back button ────────────────────────────────────────────────────────── */
function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ touchAction: 'manipulation' }}
      className="inline-flex items-center gap-1.5 font-body text-[0.8rem] text-navy/35 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue active:opacity-60"
    >
      <span aria-hidden="true">←</span>
      {label}
    </button>
  );
}

/* ─── STEP 1: Fecha ──────────────────────────────────────────────────────── */
function StepDate({ onSelect }: { onSelect: (d: Date) => void }) {
  const { weeks } = useMemo(() => buildCalendar(5), []);

  const monthsShown = useMemo(() => {
    const seen = new Set<string>();
    weeks.forEach(w => w.forEach(c => seen.add(`${c.date.getFullYear()}-${c.date.getMonth()}`)));
    return Array.from(seen).map(s => {
      const [, m] = s.split('-').map(Number);
      return MONTHS_LONG[m];
    });
  }, [weeks]);

  return (
    <div className="flex flex-col gap-7">
      <p className="font-body text-[0.9rem] leading-relaxed text-navy/55">
        Seleccione un día disponible. Atención de lunes a viernes.
      </p>

      <div>
        {/* Month + year */}
        <div className="mb-5 flex items-baseline justify-between">
          <span className="font-heading text-[1.375rem] font-light capitalize text-navy">
            {monthsShown.join(' - ')}
          </span>
          <span className="font-body text-[0.6rem] tabular-nums uppercase tracking-[0.2em] text-navy/30">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-5 border-b border-navy/[0.07] pb-3 mb-1">
          {['Lun','Mar','Mié','Jue','Vie'].map(d => (
            <div key={d} className="text-center font-body text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-navy/28">
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-5 border-b border-navy/[0.05] last:border-b-0">
            {week.map(({ date, status }) => {
              const isPast      = status === 'past';
              const isToday     = status === 'today';
              const isAvailable = status === 'available';
              return (
                <button
                  key={date.toISOString()}
                  disabled={!isAvailable}
                  onClick={() => isAvailable && onSelect(date)}
                  style={{ touchAction: 'manipulation' }}
                  className={[
                    'group relative flex flex-col items-center justify-center py-4 transition-colors duration-150 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue sm:py-5',
                    isAvailable ? 'cursor-pointer [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy/[0.04] active:bg-navy/[0.06]' : 'cursor-default',
                  ].join(' ')}
                  aria-label={isAvailable ? `${formatLong(date)}, disponible` : undefined}
                >
                  <span className={[
                    'font-body text-[1rem] font-semibold tabular-nums leading-none',
                    isAvailable ? 'text-navy' : '',
                    isPast      ? 'text-navy/15' : '',
                    isToday     ? 'text-navy/30' : '',
                  ].join(' ')}>
                    {date.getDate()}
                  </span>
                  {isToday && (
                    <span className="mt-1.5 block h-1 w-1 rounded-full bg-red" aria-label="hoy" />
                  )}
                  {/* Red accent on hover */}
                  {isAvailable && (
                    <span
                      className="absolute bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 bg-red opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}

        <p className="mt-5 font-body text-[0.7rem] leading-relaxed text-navy/28">
          Para fechas más allá de estas 5 semanas, contáctenos directamente por WhatsApp.
        </p>
      </div>
    </div>
  );
}

/* ─── STEP 2: Horario ────────────────────────────────────────────────────── */
function StepTime({ date, onSelect, onBack }: {
  date: Date;
  onSelect: (t: string) => void;
  onBack: () => void;
}) {
  const morning   = MORNING_SLOTS.filter(t => !isTaken(date, t));
  const afternoon = AFTERNOON_SLOTS.filter(t => !isTaken(date, t));
  const noSlots   = morning.length === 0 && afternoon.length === 0;

  function TimeButton({ time }: { time: string }) {
    return (
      <button
        type="button"
        onClick={() => onSelect(time)}
        style={{ touchAction: 'manipulation' }}
        className="flex items-center justify-center border border-navy/[0.12] bg-white py-3.5 font-body text-[0.9rem] font-medium text-navy transition-all duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:border-navy [@media(hover:hover)_and_(pointer:fine)]:hover:bg-navy [@media(hover:hover)_and_(pointer:fine)]:hover:text-white active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
      >
        {time}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <SelectionBadge date={date} />

      {noSlots ? (
        <p className="font-body text-[0.9rem] text-navy/50">
          No hay horarios disponibles para este día. Por favor seleccione otra fecha.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {morning.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/35">
                Mañana
              </span>
              <div className="grid grid-cols-4 gap-2">
                {morning.map(t => <TimeButton key={t} time={t} />)}
              </div>
            </div>
          )}

          {afternoon.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy/35">
                Tarde
              </span>
              <div className="grid grid-cols-4 gap-2">
                {afternoon.map(t => <TimeButton key={t} time={t} />)}
              </div>
            </div>
          )}
        </div>
      )}

      <BackButton onClick={onBack} label="Cambiar fecha" />
    </div>
  );
}

/* ─── STEP 3: Datos ──────────────────────────────────────────────────────── */
function StepInfo({ date, time, onSubmit, onBack }: {
  date: Date;
  time: string;
  onSubmit: (info: PatientInfo) => void;
  onBack: () => void;
}) {
  const [name,   setName]   = useState('');
  const [phone,  setPhone]  = useState('');
  const [motivo, setMotivo] = useState('');
  const valid = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 8;

  const labelCls = 'mb-2 block font-body text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-navy/45';
  const inputCls = [
    'w-full border border-navy/[0.15] bg-white px-4 py-3.5 font-body text-[0.9375rem] text-navy',
    'placeholder:text-navy/20 transition-colors duration-150',
    'focus:border-navy focus:outline-none',
  ].join(' ');

  return (
    <div className="flex flex-col gap-8">
      <SelectionBadge date={date} time={time} />

      <div className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>
            Nombre completo <span className="text-red" aria-hidden="true">*</span>
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

        <div>
          <label className={labelCls}>
            Número de WhatsApp <span className="text-red" aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Ej. 8888-8888"
            autoComplete="tel"
            className={inputCls}
          />
          <p className="mt-1.5 font-body text-[0.7rem] text-navy/30">
            Le confirmaremos la cita a este número.
          </p>
        </div>

        <div>
          <label className={labelCls}>
            Motivo de la consulta{' '}
            <span className="font-normal normal-case tracking-normal text-navy/25">(opcional)</span>
          </label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="Ej. Valoración post-operatoria, seguimiento, consulta general…"
            className={`${inputCls} resize-none`}
          />
          <p className="mt-1 text-right font-body text-[0.65rem] text-navy/20">{motivo.length}/200</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => valid && onSubmit({ name: name.trim(), phone: phone.trim(), motivo: motivo.trim() })}
          disabled={!valid}
          style={{ touchAction: 'manipulation' }}
          className={[
            'inline-flex h-12 w-full items-center justify-center px-8 font-body text-sm font-medium tracking-wide text-white transition-all sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
            valid
              ? 'bg-navy [@media(hover:hover)_and_(pointer:fine)]:hover:bg-blue active:scale-[0.97] cursor-pointer'
              : 'cursor-not-allowed bg-navy/20',
          ].join(' ')}
        >
          Revisar solicitud
        </button>
        <BackButton onClick={onBack} label="Cambiar horario" />
      </div>
    </div>
  );
}

/* ─── STEP 4: Confirmación ───────────────────────────────────────────────── */
function StepConfirm({ date, time, info, onBack, onRestart }: {
  date: Date; time: string; info: PatientInfo;
  onBack: () => void; onRestart: () => void;
}) {
  const waUrl = buildWaUrl(date, time, info);

  return (
    <div className="flex flex-col gap-8">

      {/* Resumen — receipt style */}
      <div className="border border-navy/[0.08]">
        <div className="grid grid-cols-2 divide-x divide-navy/[0.08] border-b border-navy/[0.08]">
          <Cell label="Fecha"   value={formatLong(date)} />
          <Cell label="Horario" value={`${time} hrs`}    />
        </div>
        <div className="grid grid-cols-2 divide-x divide-navy/[0.08]">
          <Cell label="Nombre"   value={info.name}  />
          <Cell label="WhatsApp" value={info.phone} />
        </div>
        {info.motivo && (
          <div className="border-t border-navy/[0.08] px-5 py-4">
            <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/30">Motivo</p>
            <p className="mt-1.5 font-body text-[0.875rem] leading-relaxed text-navy/70">{info.motivo}</p>
          </div>
        )}
      </div>

      <p className="font-body text-[0.85rem] leading-relaxed text-navy/45">
        Al confirmar se abrirá WhatsApp con su solicitud ya redactada. Solo presione enviar y le respondemos en menos de 24 horas hábiles.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ touchAction: 'manipulation' }}
          className="inline-flex h-12 w-full items-center justify-center gap-2.5 bg-[#25D366] px-8 font-body text-sm font-medium tracking-wide text-white transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#1aad53] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] sm:w-auto"
        >
          <WaIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          Confirmar por WhatsApp
        </a>
        <BackButton onClick={onBack} label="Modificar datos" />
      </div>

      <div className="border-t border-navy/[0.07] pt-5">
        <button
          type="button"
          onClick={onRestart}
          style={{ touchAction: 'manipulation' }}
          className="font-body text-[0.775rem] text-navy/30 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue active:opacity-60"
        >
          Hacer otra solicitud
        </button>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 px-5 py-4">
      <p className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/30">{label}</p>
      <p className="font-body text-[0.9rem] font-medium leading-snug text-navy">{value}</p>
    </div>
  );
}

/* ─── Root ────────────────────────────────────────────────────────────────── */
export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [info, setInfo] = useState<PatientInfo | null>(null);

  function restart() { setStep(1); setDate(null); setTime(null); setInfo(null); }

  return (
    <div className="flex flex-col gap-8">
      <StepNav current={step} />

      {step === 1 && (
        <StepDate onSelect={d => { setDate(d); setTime(null); setStep(2); }} />
      )}
      {step === 2 && date && (
        <StepTime date={date} onSelect={t => { setTime(t); setStep(3); }} onBack={() => setStep(1)} />
      )}
      {step === 3 && date && time && (
        <StepInfo date={date} time={time} onSubmit={i => { setInfo(i); setStep(4); }} onBack={() => setStep(2)} />
      )}
      {step === 4 && date && time && info && (
        <StepConfirm date={date} time={time} info={info} onBack={() => setStep(3)} onRestart={restart} />
      )}
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
