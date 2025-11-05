import { Droplet, Flame, Wind, Wrench, Home } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Droplet,
    title: 'Ristrutturazione bagni chiavi in mano',
    description: 'Dallo smantellamento al collaudo finale, seguiamo ogni fase con precisione artigianale.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Flame,
    title: 'Sostituzioni e manutenzione caldaie',
    description: 'Solo marchi certificati, efficienza e sicurezza al centro di ogni intervento.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Wind,
    title: 'Condizionamento',
    description: 'Impianti silenziosi e su misura per il massimo comfort della tua casa.',
    color: 'from-cyan-500 to-blue-400',
  },
  {
    icon: Wrench,
    title: 'Riparazioni',
    description: 'Interventi puntuali per evitare danni e sprechi, sempre disponibili.',
    color: 'from-slate-500 to-slate-600',
  },
  {
    icon: Home,
    title: 'Impiantistica: Sanitaria / Riscaldamento / Gas',
    description: 'Progettazione e installazione con precisione millimetrica per ogni tipo di impianto.',
    color: 'from-emerald-500 to-teal-500',
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToGallery = (slideIndex: number) => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      // Scroll alla sezione gallery
      gallerySection.scrollIntoView({ behavior: 'smooth' });
      // Imposta la slide corretta dopo un breve delay
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('setGallerySlide', { detail: slideIndex }));
      }, 500);
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" style={{ fontFamily: 'Montserrat Alternates, sans-serif' }}>
          I nostri flussi di lavoro
        </h2>
        <p className="text-xl text-center text-blue-200 mb-16">Servizi professionali per ogni esigenza</p>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t ${service.color} opacity-20 transition-all duration-700 group-hover:h-full`}
                  />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                      {service.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed">{service.description}</p>

                    <button
                      onClick={() => scrollToGallery(index)}
                      className="mt-6 text-blue-400 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                      <span>Scopri di più</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </button>
                  </div>

                  {hoveredIndex === index && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
