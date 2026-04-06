import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import screen1 from 'figma:asset/59c6fa0cb67d7131335937206f7e71a3b44a3d54.png';
import screen2 from 'figma:asset/baa53440fa0a3f20dceb4cc2dc699b615bbea9c9.png';
import screen3 from 'figma:asset/920d61f2b66c5dd6a5e010baeaa054d336d528bc.png';
import screen4 from 'figma:asset/789ab28e565f1550ba0e661522f60e2bef1ae4bc.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ClassSchedulingDemoProps {
  onClose: () => void;
}

export function ClassSchedulingDemo({ onClose }: ClassSchedulingDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      image: screen1,
      title: "Step 1: Navigate to Class Scheduling",
      description: "Click on 'Class Scheduling' from the Attendance menu"
    },
    {
      image: screen2,
      title: "Step 2: Create New Schedule",
      description: "Click the 'Create schedule' button to start scheduling classes"
    },
    {
      image: screen3,
      title: "Step 3: Configure Schedule Details",
      description: "Add time slots for each day, set start and end times, then save"
    },
    {
      image: screen4,
      title: "Step 4: Schedule Created Successfully",
      description: "Your class schedules are now created and visible in the schedules list"
    }
  ];

  // Auto-play like a GIF
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % screens.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [screens.length]);

  const nextStep = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative max-w-4xl w-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-10 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 z-50 shadow-lg"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Title Section */}
        <div className="text-center mb-6">
          <h2 className="text-white mb-2">Class Scheduling Workflow</h2>
          <p className="text-purple-200">
            Step-by-step guide to creating class schedules in Acadhub
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Mobile Mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[580px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl border-[6px] border-slate-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl z-10"></div>
                
                {/* Screen */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={screens[currentStep].image}
                        alt={screens[currentStep].title}
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full"></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-[3rem]"></div>
              </div>
            </div>
          </div>

          {/* Instructions Panel */}
          <div className="flex-1 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <span className="text-white">{currentStep + 1}</span>
                  </div>
                  <h3 className="text-white">{screens[currentStep].title}</h3>
                </div>
                <p className="text-purple-200 mb-6">
                  {screens[currentStep].description}
                </p>

                {/* Step Indicators */}
                <div className="flex gap-2 mb-6">
                  {screens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-gradient-to-r from-purple-500 to-indigo-500'
                          : 'w-2 bg-white/20 hover:bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      currentStep === 0
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === screens.length - 1}
                    className={`flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      currentStep === screens.length - 1
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Auto-play indicator */}
            <div className="mt-4 text-center">
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
