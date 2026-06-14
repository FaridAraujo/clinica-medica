// Tipos
export type Publication = {
  id: string
  // article     - publicación científica o académica del Dr. Alvarado
  // video       - material audiovisual
  // recognition - editorial o nota de terceros que reconoce su trabajo
  // reference   - material de referencia bibliográfica recomendado
  type: 'article' | 'video' | 'recognition' | 'reference'
  title: string
  authors: string
  journal?: string
  year: number
  abstract?: string
  tags: string[]
  pdfPath?: string   // '/publications/nombre-del-archivo.pdf'
  videoId?: string   // ID de YouTube (lo que va después de ?v=)
}

// Publicaciones
// Agrega o edita entradas aquí. Los PDF van en la carpeta:
//   public/publications/nombre-del-archivo.pdf
export const publications: Publication[] = [

  // Videos

  {
    id: 'estenosis-valvula-aortica-tavi',
    type: 'video',
    title: 'Estenosis de la Válvula Aórtica',
    authors: 'Dr. Edwin Manuel Alvarado Arce',
    year: 2024,
    abstract:
      'Explicación de la estenosis aórtica: una condición en que la válvula se vuelve rígida y obliga al corazón a trabajar con mayor esfuerzo. Se presentan los síntomas (fatiga, dolor en el pecho, disnea) y tratamientos modernos como el TAVI.',
    tags: ['Estenosis Aórtica', 'TAVI', 'Cardiología', 'Divulgación'],
    videoId: 'h2Sb2vcZDA8',
  },

  // Artículos científicos

  {
    id: 'primer-triage-costa-rica-virilla-2024',
    type: 'article',
    title: 'El primer triage efectuado en Costa Rica en un desastre mayor: análisis retrospectivo del accidente del Río Virilla, 1926',
    authors: 'Alvarado Arce EM, Velázquez Rojas L, Granados Granados W',
    journal: 'Revista Médica de la Escuela de Medicina UCR',
    year: 2024,
    abstract:
      'Análisis retrospectivo de la primera aplicación documentada del triage en Costa Rica durante el trágico accidente ferroviario del Río Virilla en marzo de 1926, destacando la participación del Dr. Ricardo Moreno Cañas y la relevancia histórica del evento para la medicina de emergencias costarricense.',
    tags: ['Triage', 'Historia de la Medicina', 'Medicina de Emergencias', 'Costa Rica'],
    pdfPath: '/publications/primer-triage-costa-rica-virilla-2024.pdf',
  },

  {
    id: 'unidades-sanitarias-salud-publica-costa-rica-2021',
    type: 'article',
    title: 'Las Unidades Sanitarias: Un Modelo Ejemplar en la Evolución Histórica de la Salud Pública en Costa Rica',
    authors: 'Alvarado Arce EM, Granados Granados W, Velázquez Rojas L',
    journal: 'Revista Médica de la Universidad de Costa Rica',
    year: 2021,
    abstract:
      'Investigación histórica sobre el papel fundamental de las Unidades Sanitarias en el desarrollo de los servicios de salud y la salud pública de Costa Rica, desde sus orígenes hasta la universalización de la Caja Costarricense de Seguro Social en 1961.',
    tags: ['Salud Pública', 'Historia de la Medicina', 'Sistemas de Salud', 'Costa Rica'],
    pdfPath: '/publications/unidades-sanitarias-salud-publica-costa-rica-2021.pdf',
  },

  {
    id: 'trauma-salud-publica-costa-rica-2018',
    type: 'article',
    title: 'El Trauma como Problema de Salud Pública en Costa Rica',
    authors: 'Alvarado Arce EM, Velázquez Rojas LE, Mayorga Quirós K',
    journal: 'Revista Médica de Costa Rica y Centroamérica',
    year: 2018,
    abstract:
      'Los traumatismos se han convertido en una epidemia real en los países en desarrollo, causando aproximadamente 5 millones de muertes por año. El artículo analiza el impacto del trauma vial en Costa Rica, proponiendo una política de seguridad vial efectiva para reducir la morbimortalidad.',
    tags: ['Salud Pública', 'Trauma', 'Accidentes de Tránsito', 'Costa Rica'],
    pdfPath: '/publications/trauma-salud-publica-costa-rica-2018.pdf',
  },

  {
    id: 'perthes-syndrome-traumatic-asphyxia-2017',
    type: 'article',
    title: "Perthes' Syndrome: Traumatic Asphyxia",
    authors: 'Ochoa-Jiménez R, Víquez-Beita K, Alvarado-Arce EM',
    journal: 'Journal of Case Reports',
    year: 2017,
    abstract:
      'Traumatic asphyxia is a clinical condition caused by the sharp increase in venous pressure in the superior vena cava territory due to violent thoracic compression. Case report of conservative management with supplemental oxygen and analgesia showing favorable clinical evolution.',
    tags: ['Cirugía Torácica', 'Trauma Torácico', 'Reporte de Caso'],
    pdfPath: '/publications/perthes-syndrome-traumatic-asphyxia-2017.pdf',
  },

  {
    id: 'remembranzas-hospital-mexico-50-aniversario-2020',
    type: 'article',
    title: 'Remembranzas del Servicio de Cirugía de Tórax y Cardiovascular en la historia del Hospital México en su 50° Aniversario',
    authors: 'Alvarado Arce EM',
    journal: 'Revista Costarricense de Cardiología',
    year: 2020,
    abstract:
      'Reseña histórica del Servicio de Cirugía de Tórax y Cardiovascular del Hospital México desde su fundación, destacando hitos como el primer laboratorio de cirugía experimental, los primeros marcapasos permanentes en Centroamérica y el Caribe, y las primeras cirugías de revascularización coronaria en América Latina.',
    tags: ['Historia de la Medicina', 'Cirugía Cardiovascular', 'Hospital México', 'Costa Rica'],
    pdfPath: '/publications/remembranzas-hospital-mexico-50-aniversario-2020.pdf',
  },

  // Reconocimientos editoriales

  {
    id: 'editorial-reconocimiento-historia-cirugia-cardiovascular',
    type: 'recognition',
    title: 'Un Médico Justo y de Gran Prestigio',
    authors: 'Zeledón Pérez M (Director, Revista Médica de Costa Rica)',
    journal: 'Revista Médica de Costa Rica',
    year: 2014,
    abstract:
      'Editorial del Dr. Manuel Zeledón Pérez destacando la presentación del Dr. Alvarado Arce sobre "Historia de la Cirugía Cardiovascular en Costa Rica" en el 76° Congreso Médico Nacional. Reconoce la profundidad, justicia investigativa y el valor histórico de su trabajo.',
    tags: ['Reconocimiento', 'Historia de la Medicina', 'Cirugía Cardiovascular'],
    pdfPath: '/publications/editorial-reconocimiento-historia-cirugia-cardiovascular.pdf',
  },

  // Material de referencia

  {
    id: 'guia-cirugia-paciente-politraumatizado-aec-2001',
    type: 'reference',
    title: 'Cirugía del Paciente Politraumatizado',
    authors: 'Jover Navalón JM, López Espadas F (eds.), Asociación Española de Cirujanos',
    journal: 'Guías Clínicas de la Asociación Española de Cirujanos',
    year: 2001,
    abstract:
      'Guía clínica multidisciplinaria sobre la atención y tratamiento del paciente politraumatizado, siguiendo los criterios del ATLS (Advanced Trauma Life Support). Cubre evaluación inicial, traumatismos específicos por órgano y manejo farmacológico del dolor.',
    tags: ['Trauma', 'Cirugía General', 'Guía Clínica', 'ATLS'],
    pdfPath: '/publications/guia-cirugia-paciente-politraumatizado-aec-2001.pdf',
  },

  {
    id: 'arte-y-medicina-topolanski',
    type: 'reference',
    title: 'El Arte y la Medicina: Alegorías',
    authors: 'Topolanski R',
    year: 2003,
    abstract:
      'Exploración de las representaciones simbólicas y alegóricas de la medicina a través del arte, desde la mitología griega (Apolo, Esculapio, Quirón) hasta obras modernas como las de Klimt y murales universitarios latinoamericanos.',
    tags: ['Arte y Medicina', 'Historia de la Medicina', 'Humanidades Médicas'],
    pdfPath: '/publications/arte-y-medicina-topolanski.pdf',
  },

]
