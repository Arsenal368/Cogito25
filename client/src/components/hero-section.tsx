import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { VisualEffects } from './visual-effects'; // Added import for VisualEffects

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingTexts = [
    'I question.',
    'I analyze.',
    'I understand.',
    'I grow.',
    'I think.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    { value: '89%', label: 'More informed decisions' },
    { value: '2.3M', label: 'Articles analyzed' },
    { value: '150K', label: 'Users enlightened' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Interactive constellation/brain-like visual metaphor */}
      <VisualEffects />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Philosophical quote */}
          <motion.div 
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="quote-mark absolute -top-6 -left-4">"</span>
            <p className="philosophical-quote max-w-2xl mx-auto">
              In an era of manufactured truth, the examined mind becomes the ultimate sanctuary of wisdom.
            </p>
            <span className="quote-mark absolute -bottom-6 -right-4" style={{ transform: 'rotate(180deg)' }}>"</span>
          </motion.div>

          <motion.h1 
            className="hero-serif mb-12 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cogito.<br />
            Therefore,
            <motion.span 
              className="gradient-text block mt-2"
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {rotatingTexts[currentTextIndex]}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-gray mb-16 max-w-3xl mx-auto leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Navigate truth through perspective. Discover how your political leanings shape your worldview, 
            then explore news through opposing viewpoints to cultivate genuine understanding.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="button-glow px-8 py-4 rounded-xl font-heading"
              >
                <Brain className="mr-3 h-5 w-5" />
                <span className="font-heading">Assess Your Perspective</span>
              </Button>
            </Link>
            <Link href="/news">
              <Button 
                size="lg" 
                variant="outline" 
                className="button-glow px-8 py-4 rounded-xl font-heading"
              >
                <Newspaper className="mr-3 h-5 w-5" />
                <span className="font-heading">Explore News</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                className="sophisticated-card rounded-2xl p-8 elegant-shadow animate-float"
                style={{ animationDelay: `${index}s` }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="text-4xl font-display text-cogito-blue mb-3">{card.value}</div>
                <div className="text-elegant font-body">{card.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
