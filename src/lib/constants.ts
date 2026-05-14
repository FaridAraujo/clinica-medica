export const CLINIC_ADDRESS = '50 metros al oeste de la Mussi de la UNA, Heredia';

// URL de embed de Google Maps — obtener desde maps.google.com > Compartir > Incorporar un mapa
// TODO: Reemplazar con la URL exacta del embed una vez confirmada
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2007573364986!2d-84.11317129999999!3d10.000269399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fba37d24b8cd%3A0x704fd40c95cbf458!2sMia%20Araujo%20Studio!5e0!3m2!1ses!2scr!4v1778734934947!5m2!1ses!2scr';

// TODO: Confirm consultation hours with Dr. Alvarado before launch
export const CLINIC_HOURS: string | null = null;

// Contact info from business card
export const PHONE_OFFICE = '2237-0269';       // landline
export const PHONE_MOBILE = '8541-8877';       // mobile / WhatsApp
export const EMAIL = 'ed_malva@hotmail.com';

// WhatsApp — uses mobile number (landlines don't work on WhatsApp)
const WA_PHONE = '50685418877'; // +506 8541-8877
const WA_MESSAGE = 'Hola Dr. Alvarado, me gustaría agendar una cita en su consultorio.';
export const WHATSAPP_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;
