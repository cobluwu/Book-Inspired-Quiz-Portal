import React from 'react';
import { motion } from 'motion/react';

interface PageFlipWrapperProps {
  children: React.ReactNode;
  pageKey: string;
}

const pageFlipVariants = {
  initial: {
    rotateY: 85,
    opacity: 0,
    scale: 0.97,
    z: -50,
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    z: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // custom easeOutQuint for fluid flipping
    }
  },
  exit: {
    rotateY: -85,
    opacity: 0,
    scale: 0.97,
    z: -50,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export default function PageFlipWrapper({ children, pageKey }: PageFlipWrapperProps) {
  return (
    <div 
      className="w-full flex justify-center perspective-1500 preserve-3d py-1"
      id={`page-flip-container-${pageKey}`}
    >
      <motion.div
        key={pageKey}
        variants={pageFlipVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex justify-center flip-origin-left preserve-3d backface-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
