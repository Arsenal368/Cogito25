import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function VisualEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(196, 255, 116, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(85, 107, 47, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-16 h-16 rounded-full"
        style={{ border: '1px solid rgba(196, 255, 116, 0.4)' }}
        animate={{
          rotate: 360,
          y: [-10, 10, -10],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute top-2/3 right-1/4 w-12 h-12 rounded-lg"
        style={{ border: '1px solid rgba(85, 107, 47, 0.4)' }}
        animate={{
          rotate: -360,
          x: [-15, 15, -15],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-3/4 w-8 h-8 rounded-full"
        style={{ backgroundColor: 'rgba(196, 255, 116, 0.3)' }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/6 w-6 h-6 rounded-full"
        style={{ backgroundColor: 'rgba(85, 107, 47, 0.3)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, rgba(196, 255, 116, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
}

export function NewsBackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Newspaper-inspired elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-1"
        style={{ 
          background: 'linear-gradient(to right, rgba(196, 255, 116, 0.4), transparent)'
        }}
        animate={{
          width: [256, 300, 256],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-48 h-1"
        style={{ 
          background: 'linear-gradient(to left, rgba(85, 107, 47, 0.4), transparent)'
        }}
        animate={{
          width: [192, 240, 192],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Perspective lines */}
      <motion.div
        className="absolute top-60 left-1/4 w-32 h-32 rounded-full"
        style={{ border: '1px solid rgba(196, 255, 116, 0.3)' }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-1/3 w-24 h-24 rounded-lg"
        style={{ border: '1px solid rgba(85, 107, 47, 0.3)' }}
        animate={{
          scale: [1, 0.9, 1],
          rotate: -360,
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
    </div>
  );
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#C4FF74' : '#556B2F',
        opacity: Math.random() * 0.4 + 0.1
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      style={{ zIndex: -1 }}
    />
  );
}