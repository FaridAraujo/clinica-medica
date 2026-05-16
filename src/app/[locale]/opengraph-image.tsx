import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          background: '#0d2240',
          position: 'relative',
        }}
      >
        {/* Subtle grid lines — editorial texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Medical cross — top right watermark */}
        <svg
          viewBox="0 0 12 12"
          style={{
            position: 'absolute',
            top: 80,
            right: 80,
            width: 64,
            height: 64,
            opacity: 0.12,
            fill: '#ffffff',
          }}
        >
          <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
        </svg>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>

          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg viewBox="0 0 12 12" style={{ width: 12, height: 12, fill: '#c1121f', flexShrink: 0 }}>
              <path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" />
            </svg>
            Consultorio Médico · Heredia, Costa Rica
          </div>

          {/* Red rule */}
          <div style={{ width: 56, height: 2, background: '#c1121f', marginBottom: 32 }} />

          {/* Doctor name */}
          <div
            style={{
              fontFamily: 'serif',
              fontSize: 72,
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.05,
              marginBottom: 28,
            }}
          >
            Dr. Edwin Manuel
            <br />
            Alvarado Arce
          </div>

          {/* Specialty */}
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 18,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Cirujano Cardiovascular y General · +40 años de experiencia
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
