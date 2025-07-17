import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

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
    <section className="min-h-screen flex items-center justify-center grain-overlay pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-ink">Cogito.</span>
            <span className="text-cogito-blue">Therefore,</span>
            <motion.span 
              className="text-sage block mt-2"
              key={currentTextIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {rotatingTexts[currentTextIndex]}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Navigate truth through perspective. Discover how your political leanings shape your worldview, 
            then explore news through opposing viewpoints.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="bg-cogito-blue text-white hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Brain className="mr-2 h-5 w-5" />
                Assess Your Perspective
              </Button>
            </Link>
            <Link href="/news">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cogito-blue text-cogito-blue hover:bg-cogito-blue hover:text-white transition-all"
              >
                <Newspaper className="mr-2 h-5 w-5" />
                Explore News
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                className="perspective-card bg-white rounded-xl p-6 shadow-lg animate-float"
                style={{ animationDelay: `${index}s` }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-cogito-blue mb-2">{card.value}</div>
                <div className="text-neutral-600">{card.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
