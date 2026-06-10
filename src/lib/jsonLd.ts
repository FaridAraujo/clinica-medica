/**
 * Schema.org JSON-LD para el sitio del Dr. Edwin Alvarado.
 *
 * Combina dos entidades enlazadas:
 *   1. Physician — el doctor (con educación, especialidades, contacto)
 *   2. MedicalBusiness — el consultorio (con dirección, geo, horarios)
 *
 * Google usa esto para:
 *   - Knowledge Panel (perfil profesional en búsquedas de su nombre)
 *   - Local Pack (resultados de mapa para "cirujano cardiovascular Heredia")
 *   - Rich results en búsquedas relacionadas
 */
import {
  SITE_URL,
  CLINIC_ADDRESS,
  CLINIC_GEO,
  PHONE_OFFICE,
  PHONE_MOBILE,
  EMAIL,
} from './constants';

const PHYSICIAN_ID = `${SITE_URL}/#doctor`;
const BUSINESS_ID = `${SITE_URL}/#consultorio`;

// Convierte "2237-0269" → "+506-2237-0269"
const intlPhone = (local: string) => `+506-${local}`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: '50 metros al oeste de la Mussi de la UNA',
  addressLocality: 'Heredia',
  addressRegion: 'Heredia',
  addressCountry: 'CR',
} as const;

export function buildPhysicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': PHYSICIAN_ID,
    name: 'Dr. Edwin Manuel Alvarado Arce',
    honorificPrefix: 'Dr.',
    givenName: 'Edwin Manuel',
    familyName: 'Alvarado Arce',
    description:
      'Cirujano especializado en Cirugía Cardiovascular y General con más de 40 años de trayectoria. Formado en el Hospital Ramón y Cajal de Madrid. Ex jefe del Servicio de Cirugía Cardiovascular del Hospital México (CCSS) y profesor universitario en UCR y UCIMED.',
    image: `${SITE_URL}/images/donManuel.png`,
    url: SITE_URL,
    telephone: intlPhone(PHONE_OFFICE),
    email: EMAIL,
    address: { ...postalAddress, description: CLINIC_ADDRESS },
    medicalSpecialty: ['CardiovascularSurgery', 'GeneralSurgery'],
    alumniOf: [
      {
        '@type': 'Hospital',
        name: 'Hospital Ramón y Cajal',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Madrid',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad de Alcalá de Henares',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Madrid',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad de Costa Rica',
      },
    ],
    worksFor: { '@id': BUSINESS_ID },
  };
}

export function buildMedicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': BUSINESS_ID,
    name: 'Consultorio Dr. Edwin Alvarado',
    description:
      'Consulta privada de cirugía cardiovascular y general en Heredia, Costa Rica. Atención directa con el especialista, sin intermediarios.',
    image: `${SITE_URL}/images/donManuel.png`,
    url: SITE_URL,
    telephone: intlPhone(PHONE_OFFICE),
    email: EMAIL,
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINIC_GEO.latitude,
      longitude: CLINIC_GEO.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Heredia' },
      { '@type': 'Country', name: 'Costa Rica' },
    ],
    medicalSpecialty: ['CardiovascularSurgery', 'GeneralSurgery'],
    priceRange: '$$$',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: intlPhone(PHONE_OFFICE),
        contactType: 'reservations',
        availableLanguage: ['Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: intlPhone(PHONE_MOBILE),
        contactType: 'customer service',
        contactOption: 'TollFree',
        availableLanguage: ['Spanish'],
      },
    ],
    employee: { '@id': PHYSICIAN_ID },
  };
}

/**
 * Devuelve el grafo combinado listo para inyectar como JSON-LD.
 * Uso:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
 *   />
 */
export function buildHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildPhysicianSchema(), buildMedicalBusinessSchema()],
  };
}
