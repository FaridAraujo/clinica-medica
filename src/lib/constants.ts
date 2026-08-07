// ⚠️ FUENTE ÚNICA DE VERDAD del dominio: lo consumen metadataBase (layout),
// el sitemap, el robots y todo el JSON-LD. No dupliques el dominio en otro lado.
export const SITE_URL = 'https://drealvaradoarce.com';

// Nombre del sitio para Open Graph / structured data
export const SITE_NAME = 'Dr. Edwin Alvarado · Cirugía Cardiovascular';

// Perfiles externos verificables — cuando tenga Google Business Profile o
// directorios médicos, agregar las URLs aquí para activar sameAs en JSON-LD.
export const SOCIAL_PROFILES: string[] = [];

export const CLINIC_ADDRESS = '50 metros al oeste de la Mussi de la UNA, Heredia';

// Coordenadas exactas del consultorio — extraídas del Google Business Profile verificado
export const CLINIC_GEO = {
  latitude: 10.0001219,
  longitude: -84.1131542,
} as const;

// Embed de Google Maps — apunta al perfil verificado "Consultorio Dr. Edwin Manuel Alvarado Arce"
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.202540951632!2d-84.1131542!3d10.000121900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fbc1cc6e7665%3A0xd7d51f18c717c804!2sConsultorio%20Dr.%20Edwin%20Manuel%20Alvarado%20Arce!5e0!3m2!1ses-419!2scr!4v1786061700394!5m2!1ses-419!2scr';

// El horario varía según citas — no se publica horario fijo.
// En JSON-LD se declara explícitamente "por cita previa".
export const CLINIC_HOURS: string | null = null;

// Contact info from business card
export const PHONE_OFFICE = '2237-0269';       // landline
export const PHONE_MOBILE = '8541-8877';       // mobile / WhatsApp
export const EMAIL = 'ed_malva@hotmail.com';

// WhatsApp — uses mobile number (landlines don't work on WhatsApp)
const WA_PHONE = '50685418877'; // +506 8541-8877
const WA_MESSAGE = 'Hola Dr. Alvarado, me gustaría agendar una cita en su consultorio.';
export const WHATSAPP_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

// Google Maps — abre el perfil verificado del consultorio
export const MAPS_DIRECTIONS_URL = 'https://maps.app.goo.gl/dJkvWLHfaJHE7tHb8';
