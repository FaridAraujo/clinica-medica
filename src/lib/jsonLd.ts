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
  SOCIAL_PROFILES,
  MAPS_DIRECTIONS_URL,
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
    // Variantes con las que la gente realmente lo busca — ayuda a que Google
    // asocie todas con la misma entidad (clave para el Knowledge Panel).
    alternateName: [
      'Dr. Alvarado',
      'Dr. Edwin Alvarado',
      'Doctor Edwin Alvarado',
      'Dr. Edwin Alvarado Arce',
    ],
    honorificPrefix: 'Dr.',
    givenName: 'Edwin Manuel',
    familyName: 'Alvarado Arce',
    jobTitle: 'Cirujano Cardiovascular y General',
    description:
      'Cirujano especializado en Cirugía Cardiovascular y General con más de 40 años de trayectoria. Formado en el Hospital Ramón y Cajal de Madrid. Ex jefe del Servicio de Cirugía Cardiovascular del Hospital México (CCSS) y profesor universitario en UCR y UCIMED.',
    image: `${SITE_URL}/images/donManuel.png`,
    url: SITE_URL,
    telephone: intlPhone(PHONE_OFFICE),
    email: EMAIL,
    knowsLanguage: ['es'],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
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
    // MedicalClinic es subtipo de MedicalBusiness + MedicalOrganization:
    // encaja mejor con búsquedas de "clínica" / "consultorio".
    '@type': 'MedicalClinic',
    '@id': BUSINESS_ID,
    name: 'Consultorio Dr. Edwin Alvarado',
    alternateName: [
      'Clínica Dr. Alvarado',
      'Consultorio Médico Dr. Edwin Alvarado, Heredia',
    ],
    description:
      'Consulta privada de cirugía cardiovascular y general en Heredia, Costa Rica. Atención directa con el especialista, sin intermediarios.',
    image: `${SITE_URL}/images/donManuel.png`,
    url: SITE_URL,
    telephone: intlPhone(PHONE_OFFICE),
    email: EMAIL,
    address: postalAddress,
    hasMap: MAPS_DIRECTIONS_URL,
    knowsLanguage: ['es'],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
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
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Cirugía de corazón abierto' },
      { '@type': 'MedicalProcedure', name: 'Cirugía de válvulas cardíacas' },
      { '@type': 'MedicalProcedure', name: 'Revascularización coronaria (bypass)' },
      { '@type': 'MedicalProcedure', name: 'Cirugía de aorta' },
      { '@type': 'MedicalProcedure', name: 'Cirugía general' },
      { '@type': 'MedicalProcedure', name: 'Consulta especializada de cirugía cardiovascular' },
    ],
    // Horario por cita previa — sin horario fijo. No agregar
    // openingHoursSpecification porque induciría a error a los usuarios.
    availableByAppointment: true,
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
