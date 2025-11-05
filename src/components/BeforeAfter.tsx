import { useState, useRef, useEffect } from 'react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', () => setIsDragging(false));

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', () => setIsDragging(false));
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', () => setIsDragging(false));
      };
    }
  }, [isDragging]);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4" style={{ fontFamily: 'Montserrat Alternates, sans-serif' }}>
          Trasformazioni della Casa
        </h2>
        <p className="text-xl text-center text-blue-200 mb-12">Ogni dettaglio, curato da iDen Idraulica</p>

        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-col-resize"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="relative aspect-[16/10]">
            <img 
              src="/PrimaDopo/Prima.png" 
              alt="Dopo" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Scritta DOPO */}
            <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
              <p className="text-xl font-bold text-white">DOPO</p>
            </div>

            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src="/PrimaDopo/Dopo.png" 
                alt="Prima" 
                className="w-full h-full object-cover"
              />
              
              {/* Scritta PRIMA */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xl font-bold text-white">PRIMA</p>
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {Math.abs(sliderPosition - 50) < 2 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg animate-fade-in">
              <p className="text-sm font-semibold text-slate-900">Ogni dettaglio, curato da iDen Idraulica</p>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 mt-8">Trascina il cursore per vedere la trasformazione</p>
      </div>
    </section>
  );
}
