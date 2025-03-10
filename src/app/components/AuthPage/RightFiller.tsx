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
      <div className="absolute top-0 right-0 w-[133px] h-[32px] rounded-[100px] border-[0.5px] mt-[64px] mr-[64px] border-foreground/20 text-secondary text-[12px] flex items-center justify-center uppercase">
        Version 01.12.01
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <motion.div
            style={{
              x: codeSnippetX,
              y: codeSnippetY,
            }}
          >
            <Image
              src={CodeSnippetSvg}
              alt={''}
              className="mb-[33px] ml-[70px]"
            />
          </motion.div>

          <motion.div
            className="relative mb-[36px] flex h-[107px] w-[383px] items-center justify-center rounded-[8px] border-[0.5px] border-[#F2F2F2] border-opacity-10 bg-[#01050D] bg-opacity-30 px-[22px] backdrop-blur-[10px]"
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
          >
            <Image
              src={Reviews}
              alt={''}
              className="mb-[33px] ml-[98px] h-[74px] w-[244px]"
              width={244}
              height={74}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
