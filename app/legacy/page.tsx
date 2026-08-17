import { ExamplesGallery } from '@/components/landing/ExamplesGallery';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';

/**
 * Legacy landing page
 * The original design, kept at /legacy for reference while the
 * design-system landing page lives at the root route.
 */
export default function LegacyHome() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ExamplesGallery />
      <Footer />
    </main>
  );
}
