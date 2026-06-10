export type Locale = 'es' | 'en';

export interface TimelineEntry {
  year: string;
  title: string;
  institution: string;
  description?: string;
}

export interface Specialty {
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
