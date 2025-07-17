import { useEffect, useRef } from 'react';

export function ThoughtNode() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const nodeX = useRef(0);
  const nodeY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animateNode = () => {
      const dx = mouseX.current - nodeX.current;
      const dy = mouseY.current - nodeY.current;
      
      nodeX.current += dx * 0.1;
      nodeY.current += dy * 0.1;
      
      if (nodeRef.current) {
        nodeRef.current.style.left = `${nodeX.current}px`;
        nodeRef.current.style.top = `${nodeY.current}px`;
      }
      
      requestAnimationFrame(animateNode);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateNode();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className="thought-node"
      style={{
        position: 'fixed',
        width: '8px',
        height: '8px',
        background: 'radial-gradient(circle, rgba(196, 255, 116, 0.8) 0%, rgba(196, 255, 116, 0.3) 70%, transparent 100%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'all 0.1s ease',
      }}
    />
  );
}
