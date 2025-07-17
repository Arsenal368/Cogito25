import { motion } from 'framer-motion';
import { PoliticalLeanings } from '@/lib/types';

interface PoliticalCompassProps {
  leanings: PoliticalLeanings;
  size?: 'small' | 'medium' | 'large';
}

export function PoliticalCompass({ leanings, size = 'medium' }: PoliticalCompassProps) {
  const sizeClasses = {
    small: 'w-48 h-48',
    medium: 'w-64 h-64',
    large: 'w-80 h-80',
  };

  const getPositionStyle = () => {
    // Convert -100 to 100 scale to percentage position
    const leftPercent = ((leanings.economic + 100) / 200) * 100;
    const topPercent = ((100 - leanings.social) / 200) * 100;
    
    return {
      left: `${leftPercent}%`,
      top: `${topPercent}%`,
    };
  };

  const quadrants = [
    { label: 'Liberal\nAuthoritarian', position: 'top-left' },
    { label: 'Conservative\nAuthoritarian', position: 'top-right' },
    { label: 'Liberal\nLibertarian', position: 'bottom-left' },
    { label: 'Conservative\nLibertarian', position: 'bottom-right' },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className={`glass-card olive-border ${sizeClasses[size]} relative p-4`}>
        {/* Grid */}
        <div className="w-full h-full border-2 olive-border rounded-lg relative">
          {/* Quadrant labels */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
            {quadrants.map((quadrant, index) => (
              <div
                key={index}
                className={`flex items-center justify-center text-xs olive-header text-center whitespace-pre-line
                  ${index === 0 ? 'border-r border-b olive-border' : ''}
                  ${index === 1 ? 'border-b olive-border' : ''}
                  ${index === 2 ? 'border-r olive-border' : ''}
                `}
              >
                {quadrant.label}
              </div>
            ))}
          </div>
          
          {/* Center lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-0.5 bg-olive opacity-50" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-olive opacity-50" />
          </div>
          
          {/* User position */}
          <motion.div
            className="absolute w-4 h-4 bg-olive rounded-full border-2 border-ivory shadow-lg"
            style={{
              ...getPositionStyle(),
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-lg font-semibold text-olive">{leanings.label}</span>
        <p className="text-sm text-sage mt-1">Based on your responses</p>
      </div>
    </div>
  );
}
