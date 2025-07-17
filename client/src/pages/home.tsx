import { HeroSection } from '@/components/hero-section';
import { ThoughtNode } from '@/components/thought-node';

export default function Home() {
  return (
    <div className="min-h-screen bg-alabaster">
      <ThoughtNode />
      <HeroSection />
    </div>
  );
}
