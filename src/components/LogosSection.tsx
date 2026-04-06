import { motion } from 'motion/react';
import bhashyamLogo from 'figma:asset/829e4a90576f0a5e5aca38c261ed0f9619160e2c.png';
import agastyaLogo from 'figma:asset/7c05ad389050b250977a51b2da7a634b1c0046eb.png';
import ekluvyaLogo from 'figma:asset/5d2e2c50eda75af419a91341a59e351936135bc7.png';
import turitoLogo from 'figma:asset/523cc89e09841093d8d0e4f1bc2aeb26dba9f7e3.png';
import miitLogo from 'figma:asset/5e11a78fc96223a1b49bac8302827a23aff36624.png';
import bhashyamEduLogo from 'figma:asset/9eb39e2401b690179d4aeb5a695cd365c5806939.png';

const institutions = [
  { name: 'Bhashyam Medex', logoUrl: bhashyamLogo },
  { name: 'Agastya IIT-JEE Academy', logoUrl: agastyaLogo },
  { name: 'SR Ekluvya', logoUrl: ekluvyaLogo },
  { name: 'Turito', logoUrl: turitoLogo },
  { name: 'MIIT', logoUrl: miitLogo },
  { name: 'Bhashyam Educational Institutions', logoUrl: bhashyamEduLogo },
];

export function LogosSection() {
  // Duplicate the logos array for seamless infinite scroll
  const duplicatedLogos = [...institutions, ...institutions];

  return (
    <section 
      className="relative border-y dark:border-[#334155] light:border-[#E2E8F0] dark:bg-transparent light:bg-[#F1F5F9] overflow-hidden"
      style={{ 
        paddingTop: 'calc(var(--spacing-major-section) * 0.75)', 
        paddingBottom: 'calc(var(--spacing-major-section) * 0.75)' 
      }}
    >
      <div className="relative max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold dark:text-[#94A3B8] light:text-[#64748B] uppercase tracking-wider">
            Trusted by Leading Institutions
          </p>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 dark:bg-gradient-to-r dark:from-[#0F172A] dark:to-transparent light:bg-gradient-to-r light:from-[#F1F5F9] light:to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 dark:bg-gradient-to-l dark:from-[#0F172A] dark:to-transparent light:bg-gradient-to-l light:from-[#F1F5F9] light:to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Track */}
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -1 * (institutions.length * 200)], // 200px = logo width + gap
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((institution, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[180px] flex items-center justify-center p-4 dark:bg-[#1E293B] light:bg-white rounded-xl border dark:border-[#334155] light:border-[#E2E8F0] dark:hover:border-[#818CF8]/50 light:hover:border-[#4F46E5]/50 transition-all duration-300 group"
              >
                <img
                  src={institution.logoUrl}
                  alt={institution.name}
                  className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}