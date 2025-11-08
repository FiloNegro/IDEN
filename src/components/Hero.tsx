import { Phone, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    let animationId: number;
    const waves: Array<{ y: number; speed: number; amplitude: number; frequency: number }> = [];

    // Onde che partono dal fondo (100%) e arrivano fino al 70% dell'altezza
    for (let i = 0; i < 5; i++) {
      waves.push({
        y: canvas.height * 0.3 + i * 30, // Partono dal fondo verso l'alto
        speed: 0.02 + i * 0.005,
        amplitude: 50 + i * 15, // Onde molto grandi
        frequency: 0.008 + i * 0.003,
      });
    }

    let offset = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.frequency + offset * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 - index * 0.03})`);
        gradient.addColorStop(1, `rgba(30, 64, 175, ${0.2 - index * 0.05})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      offset++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => setLogoAnimated(true), 500);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-slate-900 py-16 sm:py-20 md:py-24 border-b-4 border-blue-500">
      
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      <div className="relative z-10 text-center px-4 max-w-7xl w-full my-auto">
        <div className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {/* Logo spostato a sinistra */}
          <div className="relative group cursor-pointer flex-shrink-0 -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-20">
            <div
              className={`transform transition-all duration-1000 ${
                logoAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              {/* Esagono con effetto glow */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
                
                {/* Glow effect sull'esagono */}
                <div className="absolute inset-0 opacity-50 group-hover:opacity-75 transition-opacity duration-500">
                  <img 
                    src="/Esagono.png" 
                    alt="Esagono Glow" 
                    className="w-full h-full object-contain blur-2xl scale-110"
                    style={{ filter: 'blur(40px) brightness(1.2)' }}
                  />
                </div>
                
                {/* Esagono principale */}
                <img 
                  src="/Esagono.png" 
                  alt="Esagono" 
                  className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                  style={{ 
                    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))' 
                  }}
                />
                
                {/* S sovrapposta */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
                    logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: '800ms' }}
                >
                  <img 
                    src="/S.png" 
                    alt="S" 
                    className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain transition-all duration-500 group-hover:scale-105"
                    style={{ 
                      filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))' 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Nome aziendale a destra */}
          <div 
            className={`flex-shrink-0 transform transition-all duration-1000 ${
              logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <img 
              src="/Nome.png" 
              alt="iDen Idraulica" 
              className="h-48 sm:h-[14rem] md:h-[16rem] lg:h-[18rem] w-auto object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 5px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))' 
              }}
            />
          </div>
        </div>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 px-2 transform transition-all duration-1000 ${
            logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'Montserrat Alternates, sans-serif', transitionDelay: '1200ms' }}
        >
          Trasformiamo gli spazi in armonia perfetta
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 mb-3 sm:mb-4 px-2 transform transition-all duration-1000 ${
            logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1400ms' }}
        >
          Dove l'acqua incontra la precisione artigianale
        </p>

        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 md:mb-10 px-4 transform transition-all duration-1000 ${
            logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          Ristrutturazioni, manutenzioni e impianti chiavi in mano a Concorezzo (MB)
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 transform transition-all duration-1000 ${
            logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1800ms' }}
        >
          <a
            href="tel:3488709781"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Chiama ora
            </span>
          </a>

          <button
            onClick={scrollToServices}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-base sm:text-lg border-2 border-white/30 overflow-hidden hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
          >
            <span className="relative flex items-center justify-center gap-2">
              Guarda i lavori
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/50" />
      </div>
    </section>
  );
}
