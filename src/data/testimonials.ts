export type TestimonialMedia =
  | { type: 'video'; youtubeId: string }
  | { type: 'image'; alt: string; src?: string }
  | { type: 'text' };

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  extra?: string;
  media: TestimonialMedia;
  stagger?: 'up' | 'down';
}

export const testimonials: Testimonial[] = [
  {
    id: 'jprado-fitness',
    name: 'Jprado Fitness',
    business: 'Loja de roupas fitness',
    quote:
      'Aumento considerado de tráfego no site e vendas na loja fisica em Londrina',
    extra:
      'No mês de agosto de 2022, conseguimos um total em vendas de R$11.408,58 com um Roas 6,61',
    media: { type: 'image', alt: 'Logomarca Jprado Fitness' },
    stagger: 'down',
  },
  {
    id: 'glenda-barros',
    name: 'Glenda Barros',
    business: 'Curso de Pudim',
    quote:
      'Valor investido no primeiro lançamento R$2258, retorno R$14.328',
    media: { type: 'video', youtubeId: 'ezF8ERVWyq8' },
    stagger: 'up',
  },
  {
    id: 'dra-jessyca-martins',
    name: 'Dra. Jessyca Martins',
    business: 'Captação de Pacientes em 1 trimestre 2023',
    quote:
      'Faturamento constante mensal da clinica entre 80K a 100K em serviços de estética avançada',
    media: { type: 'image', alt: 'Foto da Dra. Jessyca Martins' },
    stagger: 'down',
  },
  {
    id: 'dra-karen-geraldina',
    name: 'Dra Karen Geraldina',
    business: 'Dentista',
    quote:
      'Faturamento da clinica de serviços odontonosológicos e estéticos triplicado após o tráfego pago',
    media: { type: 'video', youtubeId: '8oU8QOeZDjc' },
    stagger: 'up',
  },
  {
    id: 'valessa-store',
    name: 'Valessa Store',
    business: 'Loja de celulares',
    quote: 'Aumento de 30% no faturamento em 6 meses',
    media: { type: 'video', youtubeId: '7-IUTG5p3b8' },
    stagger: 'down',
  },
  {
    id: 'soeducador',
    name: 'Sóeducador',
    business: 'Plataforma de cursos online',
    quote:
      'Expansão de novos canais de aquisição, faturamento mais de 6 dígitos todos os meses',
    media: { type: 'text' },
    stagger: 'up',
  },
];
