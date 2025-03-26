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
      className="relative hidden h-full w-full flex-col items-center justify-center overflow-hidden md:flex"
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
          backgroundSize: 'cover',
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
          backgroundSize: 'cover',
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
          scale: 1,
        }}
      />

      {/* Base planet layer - front */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url(/bg/planet_base.svg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',

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

      <div className="absolute right-0 top-0 z-50 mr-16 mt-16 flex h-8 w-33 items-center justify-center rounded-[5.787vw] border-[0.0289vw] border-foreground/20 text-xs uppercase text-secondary">
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
            className="mb-8 ml-17.5"
          >
            <Image
              src={CodeSnippetSvg}
              alt={''}
              className="relative mb-8 flex h-32 w-104 items-center justify-center rounded-[0.463vw] border-[0.0289vw] border-foreground/10 bg-background/30 px-7 py-6 backdrop-blur-[10px]"
            />
          </motion.div>

          <motion.div
            className="relative mb-9 flex h-26.5 w-95.5 items-center justify-center rounded-[0.463vw] border-[0.0289vw] border-foreground/10 bg-background/30 px-5.5 backdrop-blur-[10px]"
            style={{
              x: statsBoxX,
              y: statsBoxY,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex h-13 flex-col justify-center text-nowrap">
              <span className="text-[1.5278vw] text-foreground">2310+</span>
              <span className="text-[0.8912vw] text-secondary">
                Прошедших курс
              </span>
            </div>
            <div className="w-17.5"></div>
            <Image
              src={AvatarsItems}
              alt={''}
              className="h-13 w-36"
              width={145}
              height={53}
            />
            <div className="grow"></div>
          </motion.div>

          <motion.div
            style={{
              x: reviewsX,
              y: reviewsY,
              transformStyle: 'preserve-3d',
            }}
            className="relative mb-9 ml-24.5 flex h-18.5 w-61 items-center justify-center rounded-[0.463vw] border-[0.0289vw] border-foreground/10 bg-background/30 px-5.5 backdrop-blur-[10px]"
          >
            <div className="flex h-13 flex-col justify-center text-nowrap">
              <span className="text-[1.5278vw] text-foreground">4.9+</span>
            </div>
            <div className="grow"></div>
            <Image
              src={Reviews}
              alt={''}
              className="h-4.5 w-27.5"
              width={110}
              height={18}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
