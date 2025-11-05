import Hero from './components/Hero';
import BeforeAfter from './components/BeforeAfter';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <ScrollProgress />
      <Hero />
      <BeforeAfter />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
