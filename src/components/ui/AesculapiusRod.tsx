/**
 * Vara de Esculapio — símbolo médico universal.
 * Bastón con una sola serpiente enrollada. Sin alas (eso sería el Caduceo,
 * que es un símbolo de Hermes/Mercurio, no de la medicina).
 *
 * Diseñado para funcionar bien a distintos tamaños:
 *  - Footer logo mark  → h-10 w-5   (40 × 20 px)
 *  - Watermark grande  → h-[380px] w-auto   (bajo opacity)
 *
 * viewBox 20 × 60, eje vertical dominante.
 */
export default function AesculapiusRod({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 60"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* ── Bastón ─────────────────────────────────────────── */}
      <rect x="8.5" y="5" width="3" height="52" rx="1.5" fill="currentColor" />
      {/* Capitel superior */}
      <circle cx="10" cy="5" r="2.2" fill="currentColor" />
      {/* Base — pequeño ensanchamiento */}
      <rect x="7" y="55" width="6" height="2" rx="1" fill="currentColor" />

      {/* ── Serpiente ──────────────────────────────────────── */}
      {/*
        Traza un coil en S ascendente alrededor del bastón:
        - Nace en la base derecha (10, 52)
        - Curva hacia la derecha (pico ~x17 en y=44)
        - Cruza el bastón por delante bajando a la izquierda (y≈34)
        - Curva hacia la izquierda (pico ~x2 en y=26)
        - Cruza de vuelta por delante subiendo a la derecha (y≈18)
        - Continúa al head superior-derecho (y≈7)
      */}
      <path
        d="M10,52 C17,47 18,38 12,32 C6,26 2,18 8,12 C10,9 13,7 15,6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cabeza — pequeña elipse inclinada en la punta */}
      <ellipse
        cx="15.5"
        cy="5"
        rx="2.6"
        ry="1.7"
        fill="currentColor"
        transform="rotate(-30 15.5 5)"
      />
    </svg>
  );
}
