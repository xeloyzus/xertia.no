import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Smartphone, Brain, Network, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'code',
    title: 'Code',
    subtitle: 'Development',
    description: 'Clean, efficient, scalable code architecture for modern applications.',
    image: '/code_card.jpg',
    icon: Code,
    color: '#3B82F6',
  },
  {
    id: 'apps',
    title: 'Apps',
    subtitle: 'Applications',
    description: 'Native and cross-platform apps that deliver exceptional user experiences.',
    image: '/apps_card.jpg',
    icon: Smartphone,
    color: '#10B981',
  },
  {
    id: 'ai',
    title: 'AI Models',
    subtitle: 'Artificial Intelligence',
    description: 'Custom-trained models for computer vision, NLP, and predictive analytics.',
    image: '/ai_card.jpg',
    icon: Brain,
    color: '#8B5CF6',
  },
  {
    id: 'mcp',
    title: 'MCP',
    subtitle: 'Model Context Protocol',
    description: 'Advanced context management for large language models and AI systems.',
    image: '/mcp_card.jpg',
    icon: Network,
    color: '#F59E0B',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    subtitle: 'Automation',
    description: 'Intelligent robotic systems for manufacturing and logistics.',
    image: '/robotics_card.jpg',
    icon: Network,
    color: '#EF4444',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(services[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 280 + 16; // card width + gap
    const newIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1)
      : Math.min(services.length - 1, activeIndex + 1);
    
    setActiveIndex(newIndex);
    setSelectedService(services[newIndex]);
    
    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  const selectService = (index: number) => {
    setActiveIndex(index);
    setSelectedService(services[index]);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 min-h-screen"
    >
      <div className="px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-white/50 uppercase tracking-wider">
            Services
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              disabled={activeIndex === 0}
            >
              <ChevronLeft size={20} className={activeIndex === 0 ? 'text-white/30' : 'text-white'} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              disabled={activeIndex === services.length - 1}
            >
              <ChevronRight size={20} className={activeIndex === services.length - 1 ? 'text-white/30' : 'text-white'} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Cards - PS5 Style */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => selectService(index)}
              className={`relative flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[280px] aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? 'ring-2 ring-white/40 scale-105'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              {/* Card Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <service.icon 
                  size={24} 
                  className="mb-2" 
                  style={{ color: service.color }}
                />
                <h3 className="font-sora font-bold text-xl text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-white/50">{service.subtitle}</p>
              </div>

              {/* Active Indicator */}
              {activeIndex === index && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Activity Card - PS5 Style Info Panel */}
        <div className="mt-8 ps5-activity-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Service Icon */}
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${selectedService.color}20` }}
            >
              <selectedService.icon size={32} style={{ color: selectedService.color }} />
            </div>

            {/* Service Info */}
            <div className="flex-1">
              <h3 className="font-sora font-bold text-2xl text-white mb-1">
                {selectedService.title}
              </h3>
              <p className="text-white/50 text-sm mb-3">{selectedService.subtitle}</p>
              <p className="text-white/70 leading-relaxed max-w-2xl">
                {selectedService.description}
              </p>
            </div>

            {/* CTA */}
            <a
              href="mailto:hello@xertai.io"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors whitespace-nowrap"
            >
              <span>Learn more</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-white/40">{activeIndex + 1}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${((activeIndex + 1) / services.length) * 100}%`,
                  backgroundColor: selectedService.color 
                }}
              />
            </div>
            <span className="text-xs text-white/40">{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
