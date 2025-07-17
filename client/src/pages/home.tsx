import { HeroSection } from '@/components/hero-section';
import { ThoughtNode } from '@/components/thought-node';
import { BackgroundAnimation } from '@/components/background-animation';
import { VisualEffects, ParticleSystem } from '@/components/visual-effects';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="min-h-[60vh] flex items-center justify-center bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="hero-serif text-4xl mb-6">A Journey Through Thought</h2>
        <p className="text-gray text-xl mb-4 font-body">
          Cogito is more than a news site—it's a philosophical observatory. Our mission: help you examine your beliefs, understand your biases, and see the world through new perspectives.
        </p>
      </motion.div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="min-h-[60vh] flex items-center justify-center bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="hero-serif text-4xl mb-6">How It Works</h2>
        <p className="text-gray text-xl mb-4 font-body">
          Take our perspective quiz, then explore news and analysis from across the spectrum. Each scroll reveals a new layer of understanding—guiding you through a cinematic journey of cognition.
        </p>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-black relative overflow-hidden">
      <VisualEffects />
      <ParticleSystem />
      <BackgroundAnimation />
      <ThoughtNode />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
    </div>
  );
}
