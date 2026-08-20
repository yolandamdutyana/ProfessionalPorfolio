import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CertificationsPage from '@/pages/CertificationsPage';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route === '#certs') {
    return (
      <div className="min-h-screen bg-rose-50 text-slate-600">
        <Navbar />
        <main>
          <CertificationsPage />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 text-slate-600">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
