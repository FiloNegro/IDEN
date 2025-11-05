import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    title: 'Ristrutturazione bagni chiavi in mano',
    folder: 'ristrutturazione-bagni',
    description: 'Trasformazioni complete di bagni: dalla demolizione alla posa di sanitari, rivestimenti e finiture di pregio. Ogni progetto curato nei minimi dettagli per creare spazi moderni e funzionali.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/ristrutturazione-bagni/${i + 1}.png`),
  },
  {
    title: 'Sostituzioni e manutenzione caldaie',
    folder: 'caldaie',
    description: 'Installazione e manutenzione di caldaie a condensazione di ultima generazione. Interventi certificati per garantire massima efficienza energetica e sicurezza.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/caldaie/${i + 1}.png`),
  },
  {
    title: 'Condizionamento',
    folder: 'condizionamento',
    description: 'Sistemi di climatizzazione su misura per ogni ambiente. Installazioni professionali con impianti silenziosi e ad alta efficienza energetica.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/condizionamento/${i + 1}.png`),
  },
  {
    title: 'Riparazioni',
    folder: 'riparazioni',
    description: 'Interventi rapidi e risolutivi per ogni tipo di guasto idraulico. Disponibilità immediata per emergenze e riparazioni urgenti.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/riparazioni/${i + 1}.png`),
  },
  {
    title: 'Impiantistica: Sanitaria / Riscaldamento / Gas',
    folder: 'impiantistica',
    description: 'Progettazione e realizzazione di impianti completi: idrico-sanitari, termici e gas. Soluzioni personalizzate con certificazioni a norma di legge.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/impiantistica/${i + 1}.png`),
  },
];

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ categoryIndex: number; imageIndex: number } | null>(null);

  useEffect(() => {
    const handleSetSlide = (event: CustomEvent<number>) => {
      setCurrentSlide(event.detail);
    };

    window.addEventListener('setGallerySlide', handleSetSlide as EventListener);

    return () => {
      window.removeEventListener('setGallerySlide', handleSetSlide as EventListener);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" style={{ fontFamily: 'Montserrat Alternates, sans-serif' }}>
          Scatti dal cantiere
        </h2>
        <p className="text-xl text-center text-blue-200 mb-8">{categories[currentSlide].title}</p>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Slide precedente"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Slide successiva"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories[currentSlide].images.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500"
                onClick={() => setSelectedImage({ categoryIndex: currentSlide, imageIndex })}
              >
                <img
                  src={image}
                  alt={`${categories[currentSlide].title} - ${imageIndex + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-slate-700', 'to-slate-800');
                  }}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
                    Visualizza
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Vai alla slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 items-center" onClick={(e) => e.stopPropagation()}>
            {/* Descrizione a sinistra */}
            <div className="lg:w-1/3 text-white space-y-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {categories[selectedImage.categoryIndex].title}
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                {categories[selectedImage.categoryIndex].description}
              </p>
              <div className="flex items-center gap-2 text-blue-400">
                <span className="text-sm font-semibold">Foto {selectedImage.imageIndex + 1} di {categories[selectedImage.categoryIndex].images.length}</span>
              </div>
            </div>

            {/* Immagine a destra */}
            <div className="lg:w-2/3">
              <img
                src={categories[selectedImage.categoryIndex].images[selectedImage.imageIndex]}
                alt={`${categories[selectedImage.categoryIndex].title} - ${selectedImage.imageIndex + 1}`}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
