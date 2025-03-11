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

  return (
    <div
      className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[url(/bg/planet.svg)] bg-cover bg-center bg-no-repeat"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute right-0 top-0 mr-[64px] mt-[64px] flex h-[32px] w-[133px] items-center justify-center rounded-[100px] border-[0.5px] border-foreground/20 text-[12px] uppercase text-secondary">
        Version 01.12.01
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <motion.div
            style={{
              x: codeSnippetX,
              y: codeSnippetY,
            }}
            className="mb-[33px] ml-[70px]"
          >
            <Image
              src={CodeSnippetSvg}
              alt={''}
              className="mb-[33px] flex h-[128px] w-[417px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[28px] py-[24px] backdrop-blur-[10px]"
            />
          </motion.div>

          <motion.div
            className="mb-[36px] flex h-[107px] w-[383px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[22px] backdrop-blur-[10px]"
            style={{
              x: statsBoxX,
              y: statsBoxY,
            }}
          >
            <div className="z-10 flex h-[53px] flex-col justify-center text-nowrap">
              <span className="text-[26.4px] text-foreground">2310+</span>
              <span className="text-[15.4px] text-secondary">
                Прошедших курс
              </span>
            </div>
            <div className="w-[70px]"></div>
            <Image
              src={AvatarsItems}
              alt={''}
              className="z-0 h-[53px] w-[145px]"
              width={145}
              height={53}
            />
            <div className="flex-grow"></div>
          </motion.div>

          <motion.div
            style={{
              x: reviewsX,
              y: reviewsY,
            }}
            className="ml-[98px] mb-[36px] flex h-[74px] w-[244px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[22px] backdrop-blur-[10px]"
          >
            <div className="z-10 flex h-[53px] flex-col justify-center text-nowrap">
              <span className="text-[26.4px] text-foreground">4.9+</span>
            </div>
            <div className="flex-grow"></div>

            <Image
              src={Reviews}
              alt={''}
              className="z-0 h-[18px] w-[110px]"
              width={145}
              height={53}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
