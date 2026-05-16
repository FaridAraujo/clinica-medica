'use client';

/**
 * AvailabilityBadge — indicador de disponibilidad del consultorio.
 * Cuando CLINIC_HOURS es null (por confirmar), muestra un estado neutro
 * con enlace a WhatsApp. Cuando esté definido, mostrará Abierto/Cerrado
 * según la hora actual.
 */

import { CLINIC_HOURS, WHATSAPP_URL } from '@/lib/constants';

export default function AvailabilityBadge() {
  if (!CLINIC_HOURS) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-navy/20" />
          <span className="font-body text-[0.875rem] italic text-navy/35">
            Por confirmar
          </span>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-blue transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        >
          Consultar por WhatsApp
        </a>
      </div>
    );
  }

  // TODO: cuando CLINIC_HOURS se confirme, implementar parser de horario
  // y determinar si el consultorio está abierto según la hora actual.
  // Formato esperado: "Lun–Vie 8:00–17:00, Sáb 8:00–12:00"
  return (
    <div className="flex flex-col gap-2">
      <p className="font-body text-[0.9375rem] leading-relaxed text-navy/75">
        {CLINIC_HOURS}
      </p>
    </div>
  );
}
