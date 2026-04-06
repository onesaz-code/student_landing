import { motion } from 'motion/react';
import { GraduationCap, BarChart3, MessageCircle, Smartphone, ScanLine, Brain } from 'lucide-react';
import carouselImage from 'figma:asset/2ea9648e41220f79a0cd7b04c6507dfee8d8d8f0.png';
import globeImage from 'figma:asset/1845e55054c9424885caf9a3bea436c3cabf3e02.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LowPolyAnimation() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-visible">
      
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Right-aligned 3D Carousel Platform */}
        <div className="absolute right-[2%] xl:right-[5%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] xl:w-[550px] xl:h-[550px] hidden lg:block" style={{ perspective: '1400px' }}>
          
          {/* 3D Acadhub Globe with Professional Styling */}
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Subtle floating animation */}
            <motion.div
              className="relative w-full h-full"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Gentle rotation */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  rotateY: [0, 3, 0, -3, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Professional subtle glow */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] xl:w-[380px] xl:h-[380px] rounded-full blur-[60px] opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(103,57,183,0.3) 0%, rgba(103,57,183,0.15) 50%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main Globe Image - Crystal Clear */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <ImageWithFallback
                    src={globeImage}
                    alt="Acadhub 3D Globe with ERP, LMS, SMS, Bulk WhatsApp, and Question Bank modules"
                    className="relative w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 10px 30px rgba(103,57,183,0.15)) drop-shadow(0 4px 12px rgba(103,57,183,0.08))',
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Clean floor shadow */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[240px] h-[50px] xl:w-[280px] xl:h-[60px] rounded-full blur-xl pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(ellipse, rgba(103,57,183,0.15) 0%, rgba(103,57,183,0.08) 40%, transparent 70%)',
              }}
              animate={{
                opacity: [0.15, 0.25, 0.15],
                scaleX: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
