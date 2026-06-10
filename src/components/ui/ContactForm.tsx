'use client';

import { useState, type FormEvent } from 'react';
import { PHONE_MOBILE, EMAIL } from '@/lib/constants';

type Channel = 'whatsapp' | 'email';

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email',    label: 'Correo electrónico' },
];

/**
 * Formulario de contacto rápido — el usuario elige entre WhatsApp o email.
 * No requiere backend: usa wa.me (WhatsApp) o mailto: (correo).
 */
export default function ContactForm() {
  const [name, setName]         = useState('');
  const [message, setMessage]   = useState('');
  const [channel, setChannel]   = useState<Channel>('whatsapp');
  const [sending, setSending]   = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);

    const composed = `Hola Dr. Alvarado, mi nombre es ${name.trim()}.\n\n${message.trim()}`;

    let url: string;
    if (channel === 'whatsapp') {
      const phone = '506' + PHONE_MOBILE.replace(/-/g, '');
      url = `https://wa.me/${phone}?text=${encodeURIComponent(composed)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      url = `mailto:${EMAIL}?subject=${encodeURIComponent('Consulta médica — ' + name.trim())}&body=${encodeURIComponent(composed)}`;
      // mailto no necesita new tab — el SO lo maneja
      window.location.href = url;
    }

    setTimeout(() => setSending(false), 800);
  };

  const isWhatsApp = channel === 'whatsapp';
  const canSubmit  = !sending && !!name.trim() && !!message.trim();

  const buttonLabel = sending
    ? (isWhatsApp ? 'Abriendo WhatsApp…' : 'Abriendo correo…')
    : (isWhatsApp ? 'Enviar por WhatsApp' : 'Enviar por correo');

  const hint = isWhatsApp
    ? 'Se abrirá WhatsApp con su mensaje pre-compuesto listo para el consultorio.'
    : 'Se abrirá su cliente de correo con el mensaje listo para enviar.';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7" noValidate>

      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45"
        >
          Nombre completo
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          placeholder="Ej. María Vargas"
          className="border-b border-navy/[0.15] bg-transparent py-3 font-body text-[1rem] text-navy placeholder:text-navy/25 transition-colors focus:border-navy focus:outline-none"
        />
      </div>

      {/* Motivo de consulta */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45"
        >
          Motivo de consulta
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Describa brevemente el motivo por el cual desea agendar una cita…"
          className="resize-none border-b border-navy/[0.15] bg-transparent py-3 font-body text-[1rem] leading-relaxed text-navy placeholder:text-navy/25 transition-colors focus:border-navy focus:outline-none"
        />
      </div>

      {/* Selector de canal */}
      <div className="flex flex-col gap-2.5">
        <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
          Enviar por
        </p>
        <div className="flex" role="group" aria-label="Canal de envío">
          {CHANNELS.map(({ id, label }) => {
            const active = channel === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setChannel(id)}
                aria-pressed={active}
                className={[
                  'flex flex-1 items-center justify-center gap-2 border px-4 py-3 font-body text-[0.775rem] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2',
                  // Borde derecho solo en el primer item (el segundo se apoya en él)
                  id === 'whatsapp' ? '-mr-px' : '',
                  active
                    ? 'relative z-10 border-navy bg-navy text-white'
                    : 'border-navy/[0.18] bg-transparent text-navy/55 hover:text-navy hover:border-navy/40',
                ].join(' ')}
              >
                {id === 'whatsapp' ? <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" /> : <EmailIcon className="h-3.5 w-3.5 shrink-0" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit + nota */}
      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-12 items-center justify-center bg-red px-7 font-body text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-[#9a0e1a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonLabel}
        </button>
        <p className="font-body text-[0.75rem] leading-relaxed text-navy/40">
          {hint}
        </p>
      </div>
    </form>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}
