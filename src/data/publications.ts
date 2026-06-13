// ─── Tipos ───────────────────────────────────────────────────────────────────
export type Publication = {
  id: string
  type: 'article' | 'video'
  title: string
  authors: string
  journal?: string
  year: number
  abstract?: string
  tags: string[]
  // Para artículos: coloca el PDF en public/publications/ y referencia así:
  pdfPath?: string   // ejemplo: '/publications/mi-articulo.pdf'
  // Para videos de YouTube: solo el ID (lo que va después de ?v=)
  videoId?: string   // ejemplo: 'dQw4w9WgXcQ'
}

// ─── Publicaciones ───────────────────────────────────────────────────────────
// Agrega o edita entradas aquí. Los PDF van en la carpeta:
//   public/publications/nombre-del-archivo.pdf
// ─────────────────────────────────────────────────────────────────────────────
export const publications: Publication[] = [
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

  // ── Ejemplo de artículo con PDF ──
  // {
  //   id: 'valvula-aortica-2019',
  //   type: 'article',
  //   title: 'Resultados a largo plazo en cirugía de reemplazo valvular aórtico',
  //   authors: 'Alvarado Arce EM, et al.',
  //   journal: 'Revista Médica de Costa Rica',
  //   year: 2019,
  //   abstract: 'Análisis retrospectivo de resultados quirúrgicos a 10 años...',
  //   tags: ['Cirugía Cardiovascular', 'Válvula Aórtica'],
  //   pdfPath: '/publications/valvula-aortica-2019.pdf',
  // },

  // ── Ejemplo de video de YouTube ──
  // {
  //   id: 'cirugia-cardiovascular-video-2022',
  //   type: 'video',
  //   title: 'Técnicas modernas en cirugía cardiovascular',
  //   authors: 'Dr. Edwin Manuel Alvarado Arce',
  //   year: 2022,
  //   abstract: 'Presentación sobre avances en cirugía cardiovascular mínimamente invasiva.',
  //   tags: ['Cirugía Cardiovascular'],
  //   videoId: 'YOUTUBE_VIDEO_ID',
  // },
]
