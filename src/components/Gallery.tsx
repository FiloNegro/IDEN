import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  title: string;
  folder: string;
  description: string;
  images: string[];
  labels?: string[];
  /** Which folders use the before/after paired layout */
  paired?: boolean;
  /** Extra images section (e.g. "Altri lavori completati") */
  extraStart?: number;
  extraLabel?: string;
}

const categories: Category[] = [
  {
    title: 'Ristrutturazione bagni chiavi in mano',
    folder: 'ristrutturazione-bagni',
    description: 'Trasformazioni complete di bagni: dalla demolizione alla posa di sanitari, rivestimenti e finiture di pregio. Ogni progetto curato nei minimi dettagli per creare spazi moderni e funzionali.',
    // Riordinate: foto 2 (prima) → foto 1 (dopo), foto 4 (prima) → foto 3 (dopo)
    images: [
      '/gallery/ristrutturazione-bagni/2.png',
      '/gallery/ristrutturazione-bagni/1.png',
      '/gallery/ristrutturazione-bagni/4.png',
      '/gallery/ristrutturazione-bagni/3.png',
    ],
    labels: ['Prima', 'Dopo', 'Prima', 'Dopo'],
    paired: true,
  },
  {
    title: 'Sostituzioni e manutenzione caldaie',
    folder: 'caldaie',
    description: 'Installazione e manutenzione di caldaie a condensazione di ultima generazione. Interventi certificati per garantire massima efficienza energetica e sicurezza.',
    images: Array.from({ length: 6 }, (_, i) => `/gallery/caldaie/${i + 1}.png`),
    labels: ['Prima', 'Dopo', 'Prima', 'Dopo', 'Caldaia installata', 'Caldaia installata'],
    paired: true,
    extraStart: 4,
    extraLabel: 'Altri lavori completati',
  },
  {
    title: 'Riparazioni',
    folder: 'riparazioni',
    description: 'Interventi rapidi e risolutivi per ogni tipo di guasto idraulico. Disponibilità immediata per emergenze e riparazioni urgenti.',
    // Riordinate: foto 2 (prima) → foto 1 (dopo)
    images: [
      '/gallery/riparazioni/2.png',
      '/gallery/riparazioni/1.png',
      '/gallery/riparazioni/3.png',
      '/gallery/riparazioni/4.png',
    ],
    labels: ['Prima', 'Dopo', 'Prima', 'Dopo'],
    paired: true,
  },
  {
    title: 'Condizionamento',
    folder: 'condizionamento',
    description: 'Sistemi di climatizzazione su misura per ogni ambiente. Installazioni professionali con impianti silenziosi e ad alta efficienza energetica.',
    images: Array.from({ length: 4 }, (_, i) => `/gallery/condizionamento/${i + 1}.png`),
  },
  {
    title: 'Impiantistica: Sanitaria / Riscaldamento / Gas',
    folder: 'impiantistica',
    description: 'Progettazione e realizzazione di impianti completi: idrico-sanitari, termici e gas. Soluzioni personalizzate con certificazioni a norma di legge.',
    images: Array.from({ length: 4 }, (_, i) => `/gallery/impiantistica/${i + 1}.png`),
  },
];

/** Renders a before/after pair with labels and arrow */
function BeforeAfterPair({
  category,
  pairIndex,
  onSelect,
  currentSlide,
}: {
  category: Category;
  pairIndex: number;
  onSelect: (imageIndex: number) => void;
  currentSlide: number;
}) {
  const startIdx = pairIndex * 2;
  return (
    <div className="relative">
      <div className="text-center mb-3">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Intervento {pairIndex + 1}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative">
        {[startIdx, startIdx + 1].map((imageIndex) => (
          <div
            key={imageIndex}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500"
            onClick={() => onSelect(imageIndex)}
          >
            <img
              src={category.images[imageIndex]}
              alt={`${category.title} - ${category.labels?.[imageIndex] ?? imageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg">
              {category.labels?.[imageIndex]}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">Visualizza</div>
            </div>
          </div>
        ))}
        {/* Arrow connecting before and after */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ categoryIndex: number; imageIndex: number } | null>(null);

  // Lightbox navigation
  const lightboxPrev = useCallback(() => {
    if (!selectedImage) return;
    const cat = categories[selectedImage.categoryIndex];
    const prevIdx = (selectedImage.imageIndex - 1 + cat.images.length) % cat.images.length;
    setSelectedImage({ ...selectedImage, imageIndex: prevIdx });
  }, [selectedImage]);

  const lightboxNext = useCallback(() => {
    if (!selectedImage) return;
    const cat = categories[selectedImage.categoryIndex];
    const nextIdx = (selectedImage.imageIndex + 1) % cat.images.length;
    setSelectedImage({ ...selectedImage, imageIndex: nextIdx });
  }, [selectedImage]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lightboxPrev();
      else if (e.key === 'ArrowRight') lightboxNext();
      else if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImage, lightboxPrev, lightboxNext]);

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

  const cat = categories[currentSlide];
  // Calculate number of before/after pairs (excluding extra images)
  const pairedCount = cat.paired ? Math.floor((cat.extraStart ?? cat.images.length) / 2) : 0;

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4" style={{ fontFamily: 'Montserrat Alternates, sans-serif' }}>
          Scatti dal cantiere
        </h2>
        <p className="text-lg sm:text-xl text-center text-blue-200 mb-8">{cat.title}</p>

        <div className="relative max-w-7xl mx-auto px-10 sm:px-14 md:px-16">
          {/* Category Navigation Arrows - inside the padded container so they never overflow */}
          <button
            onClick={prevSlide}
            aria-label="Slide precedente"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Slide successiva"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          {/* Images Grid */}
          {cat.paired ? (
            <div className="space-y-8">
              {/* Before/After pairs */}
              {Array.from({ length: pairedCount }, (_, i) => (
                <BeforeAfterPair
                  key={i}
                  category={cat}
                  pairIndex={i}
                  currentSlide={currentSlide}
                  onSelect={(imageIndex) => setSelectedImage({ categoryIndex: currentSlide, imageIndex })}
                />
              ))}

              {/* Extra images section (e.g. caldaie installate) */}
              {cat.extraStart !== undefined && cat.images.length > cat.extraStart && (
                <div className="relative">
                  <div className="text-center mb-3">
                    <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {cat.extraLabel ?? 'Altri lavori'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {cat.images.slice(cat.extraStart).map((_, idx) => {
                      const imageIndex = cat.extraStart! + idx;
                      return (
                        <div
                          key={imageIndex}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500"
                          onClick={() => setSelectedImage({ categoryIndex: currentSlide, imageIndex })}
                        >
                          <img
                            src={cat.images[imageIndex]}
                            alt={`${cat.title} - ${imageIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-emerald-600/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg">
                            {cat.labels?.[imageIndex]}
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">Visualizza</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              {cat.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500"
                  onClick={() => setSelectedImage({ categoryIndex: currentSlide, imageIndex })}
                >
                  <img
                    src={image}
                    alt={`${cat.title} - ${imageIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-slate-700', 'to-slate-800');
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">Visualizza</div>
                  </div>
                </div>
              ))}
            </div>
          )}

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

      {/* Lightbox with navigation */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            onClick={() => setSelectedImage(null)}
            aria-label="Chiudi"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Lightbox Prev Arrow */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Foto precedente"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Lightbox Next Arrow */}
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Foto successiva"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            className="max-w-6xl w-full flex flex-col items-center px-12 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main image */}
            <div className="w-full flex justify-center">
              <img
                src={categories[selectedImage.categoryIndex].images[selectedImage.imageIndex]}
                alt={`${categories[selectedImage.categoryIndex].title} - ${selectedImage.imageIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[65vh] sm:max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Info below image */}
            <div className="mt-4 sm:mt-6 text-center text-white space-y-2 max-w-2xl">
              <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {categories[selectedImage.categoryIndex].title}
              </h3>
              {categories[selectedImage.categoryIndex].labels && (
                <span className="inline-block bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {categories[selectedImage.categoryIndex].labels![selectedImage.imageIndex]}
                </span>
              )}
              <p className="text-sm sm:text-base text-slate-400">
                Foto {selectedImage.imageIndex + 1} di {categories[selectedImage.categoryIndex].images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
