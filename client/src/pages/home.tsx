import { HeroSection } from '@/components/hero-section';
import { ThoughtNode } from '@/components/thought-node';
import { BackgroundAnimation } from '@/components/background-animation';
import { VisualEffects, ParticleSystem } from '@/components/visual-effects';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-black relative overflow-hidden">
      <VisualEffects />
      <ParticleSystem />
      <BackgroundAnimation />
      <ThoughtNode />
      <HeroSection />
    </div>
  );
}
