// ⚠️ FUENTE ÚNICA DE VERDAD del dominio: lo consumen metadataBase (layout),
// el sitemap, el robots y todo el JSON-LD. No dupliques el dominio en otro lado.
export const SITE_URL = 'https://drealvaradoarce.com';

// Nombre del sitio para Open Graph / structured data
export const SITE_NAME = 'Dr. Edwin Alvarado · Cirugía Cardiovascular';

// Perfiles externos verificables — cuando tenga Google Business Profile o
// directorios médicos, agregar las URLs aquí para activar sameAs en JSON-LD.
export const SOCIAL_PROFILES: string[] = [];

export const CLINIC_ADDRESS = '50 metros al oeste de la Mussi de la UNA, Heredia';

// Coordenadas aproximadas del consultorio en Heredia
// TODO: Confirmar coordenadas exactas con Google Maps
export const CLINIC_GEO = {
  latitude: 10.000269,
  longitude: -84.113171,
} as const;

// URL de embed de Google Maps — obtener desde maps.google.com > Compartir > Incorporar un mapa
// TODO: Reemplazar con la URL exacta del embed una vez confirmada
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2007573364986!2d-84.11317129999999!3d10.000269399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fba37d24b8cd%3A0x704fd40c95cbf458!2sMia%20Araujo%20Studio!5e0!3m2!1ses!2scr!4v1778734934947!5m2!1ses!2scr';

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

// Google Maps — opens directions to the clinic
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${CLINIC_GEO.latitude},${CLINIC_GEO.longitude}`;
