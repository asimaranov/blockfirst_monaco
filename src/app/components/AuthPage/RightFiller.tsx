'use client';
import Image from 'next/image';
import CodeSnippetSvg from './assets/right-section/code_snippet.svg';
import AvatarsBgSvg from './assets/right-section/avatars_bg.svg';
import AvatarsItems from './assets/right-section/avatars_items.png';
import Reviews from './assets/right-section/reviews.svg';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function RightFiller() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate position relative to center (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set((x - centerX) / centerX);
    mouseY.set((y - centerY) / centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Transform mouse position into movement values with spring physics
  const codeSnippetX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), {
    stiffness: 150,
    damping: 15,
  });
  const codeSnippetY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), {
    stiffness: 150,
    damping: 15,
  });

  const statsBoxX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 150,
    damping: 15,
  });
  const statsBoxY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), {
    stiffness: 150,
    damping: 15,
  });

  const reviewsX = useSpring(useTransform(mouseX, [-1, 1], [-25, 25]), {
    stiffness: 150,
    damping: 15,
  });
  const reviewsY = useSpring(useTransform(mouseY, [-1, 1], [-25, 25]), {
    stiffness: 150,
    damping: 15,
  });

  // Planet rotation based on mouse position
  const planetRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const planetRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  // Different movement speeds for each layer
  const baseLayerX = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });
  const baseLayerY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  const lightLayerX = useSpring(useTransform(mouseX, [-1, 1], [-25, 25]), {
    stiffness: 80,
    damping: 15,
  });
  const lightLayerY = useSpring(useTransform(mouseY, [-1, 1], [-25, 25]), {
    stiffness: 80,
    damping: 15,
  });

  const gridLayerX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 120,
    damping: 25,
  });
  const gridLayerY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), {
    stiffness: 120,
    damping: 25,
  });

  return (
    <div
      className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '2000px',
      }}
    >
      {/* Background light layer - furthest back */}
      <motion.div
        className="absolute inset-0 -z-30"
        style={{
          backgroundImage: 'url(/bg/planet_background_light.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(-300px)',
          x: lightLayerX,
          y: lightLayerY,
          rotateX: planetRotateX,
          rotateY: planetRotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          willChange: 'transform',
          scale: 1.2,
          opacity: 0.2,
        }}
      />

      {/* Grid layer - middle back */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: 'url(/bg/planet_grid.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(-150px)',
          x: gridLayerX,
          y: gridLayerY,
          // rotateX: planetRotateX,
          // rotateY: planetRotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          willChange: 'transform',
          scale: 1.25,
        }}
      />

      {/* Base planet layer - front */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url(/bg/planet_base.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0px)',
          x: baseLayerX,
          y: baseLayerY,
          rotateX: planetRotateX,
          rotateY: planetRotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          willChange: 'transform',
          scale: 1.2,
        }}
      />

      <div className="absolute right-0 top-0 z-50 mr-[64px] mt-[64px] flex h-[32px] w-[133px] items-center justify-center rounded-[100px] border-[0.5px] border-foreground/20 text-[12px] uppercase text-secondary">
        Version 01.12.01
      </div>
      <div
        className="relative z-40 flex flex-col items-center justify-center"
        style={{ transform: 'translateZ(200px)' }}
      >
        <div>
          <motion.div
            style={{
              x: codeSnippetX,
              y: codeSnippetY,
              transformStyle: 'preserve-3d',
            }}
            className="mb-[33px] ml-[4.05vw]"
          >
            <Image
              src={CodeSnippetSvg}
              alt={''}
              className="relative mb-[33px] flex h-[128px] w-[417px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[28px] py-[24px] backdrop-blur-[10px]"
            />
          </motion.div>

          <motion.div
            className="relative mb-[36px] flex h-[107px] w-[383px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[22px] backdrop-blur-[10px]"
            style={{
              x: statsBoxX,
              y: statsBoxY,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex h-[53px] flex-col justify-center text-nowrap">
              <span className="text-[26.4px] text-foreground">2310+</span>
              <span className="text-[15.4px] text-secondary">
                Прошедших курс
              </span>
            </div>
            <div className="w-[70px]"></div>
            <Image
              src={AvatarsItems}
              alt={''}
              className="h-[53px] w-[145px]"
              width={145}
              height={53}
            />
            <div className="flex-grow"></div>
          </motion.div>

          <motion.div
            style={{
              x: reviewsX,
              y: reviewsY,
              transformStyle: 'preserve-3d',
            }}
            className="relative mb-[36px] ml-[5.67vw] flex h-[74px] w-[244px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[22px] backdrop-blur-[10px]"
          >
            <div className="flex h-[53px] flex-col justify-center text-nowrap">
              <span className="text-[26.4px] text-foreground">4.9+</span>
            </div>
            <div className="flex-grow"></div>
            <Image
              src={Reviews}
              alt={''}
              className="h-[18px] w-[110px]"
              width={145}
              height={53}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
