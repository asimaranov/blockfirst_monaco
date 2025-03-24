import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
} from '~/app/components/shared/Topbar';
import HeaderIcon from './assets/header-icon.png';
import Image from 'next/image';
import CopyButton from '../shared/CopyButton/CopyButton';
export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink = 'www.blockfirst.ru/ref2001';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UnifiedTopbar
      showBorder={false}
      className="relative  bg-[#01050d]"
      leftContent={
        <div className="flex flex-row items-center space-x-5">
          <div className="relative h-15.25 w-15.25 overflow-hidden">
            {/* Logo/Icon container with images from Figma */}
            <div className="absolute inset-0 bg-[#01050d]">
              <Image
                src={HeaderIcon}
                alt="Header Icon"
                className="h-15 w-15 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-foreground text-3xl font-medium leading-8.25">
              Реферальная программа
            </h1>
            <p className="text-secondary text-xs leading-5">
              Приглашайте друзей и коллег для обучения в BlockFirst и
              увеличивайте свой доход!
            </p>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-row items-center gap-8">
          <div className="relative">
            <div className="flex items-center space-x-2">
              <span className="text-foreground text-sm">{referralLink}</span>
              <CopyButton appearanceType="near" />
            </div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-8 right-0 z-10 mt-2"
                >
                  <div className="relative">
                    <div className="absolute -top-1 right-7 h-0 w-0 border-x-[6.5px] border-b-[6px] border-x-transparent border-b-[#0f1217]"></div>
                    <div className="bg-dark-bg rounded-lg px-3 py-2">
                      <span className="text-secondary text-xs">
                        Скопировано
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-primary hover:bg-primary flex h-10 w-33 items-center justify-center rounded-full border bg-[#01050d] cursor-pointer">
            <div className="flex items-center space-x-0">
              <span className="text-foreground text-sm">Блогерам</span>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className='w-5 h-5'
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.2307 4.43351C14.5295 4.14669 15.0043 4.15643 15.2911 4.45527L19.9065 9.26401C20.185 9.55421 20.185 10.0125 19.9065 10.3027L15.2911 15.1114C15.0043 15.4103 14.5295 15.42 14.2307 15.1332C13.9318 14.8464 13.9221 14.3716 14.2089 14.0727L18.3258 9.78335L14.2089 5.49395C13.9221 5.19511 13.9318 4.72034 14.2307 4.43351Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        </div>
      }
    />
  );
}
