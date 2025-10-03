import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  youtubeId: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    youtubeId: '8oU8QOeZDjc',
    name: 'Dra Karen Geraldina'
  },
  {
    id: '2',
    youtubeId: 'vPc2TNvS39I',
    name: 'Dra Kauezada do Espetinho'
  },
  {
    id: '3',
    youtubeId: 'ezf8ERVWyq8',
    name: 'Glenda Barros'
  }
];

interface TestimonialsSectionProps extends React.HTMLProps<HTMLElement> {}

export function TestimonialsSection({
  className,
  ...props
}: TestimonialsSectionProps) {
  return (
    <section className={cn('py-20 px-4 bg-background mb-[116px] md:mb-[120px]', className)} {...props}>
      <div className="max-w-7xl mx-auto">
        <h2 className="italic font-light text-[48px] leading-[120%] text-black mb-14 text-center">
          O que os clientes falam
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="group relative">
              {/* YouTube Shorts embed with vertical aspect ratio */}
              <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  src={`https://www.youtube.com/embed/${testimonial.youtubeId}?controls=1&rel=0&playsinline=0&modestbranding=0&autoplay=0`}
                  title={`Depoimento de ${testimonial.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading='lazy'
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Name below video */}
              <p className="mt-3 text-center font-semibold text-foreground">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
