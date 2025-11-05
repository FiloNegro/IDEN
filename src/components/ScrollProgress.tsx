import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        <div className="w-4 h-64 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50 overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-cyan-400 to-blue-300 transition-all duration-300 ease-out rounded-full"
            style={{ height: `${scrollProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 animate-pulse" />
          </div>
        </div>

        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-semibold whitespace-nowrap">
          {Math.round(scrollProgress)}%
        </div>

        {scrollProgress > 0 && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
}
