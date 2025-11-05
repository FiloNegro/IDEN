export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 relative overflow-hidden border-t border-slate-800/50">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-cyan-500 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg">
                <div className="text-white font-bold text-4xl">iDen</div>
              </div>
            </div>
          </div>

          <p className="text-slate-400 mb-2">© 2025 iDen Idraulica SRL - Tutti i diritti riservati</p>
          <p className="text-slate-500 text-sm">Design fluido e artigianale</p>

          <div className="mt-8 flex justify-center gap-8 text-sm text-slate-500">
            <span>P.IVA 12489430962</span>
            <span>•</span>
            <span>Concorezzo (MB)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
