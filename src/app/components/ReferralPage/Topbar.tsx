import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
} from '~/app/components/shared/Topbar';
import HeaderIcon from './assets/header-icon.png';
import Image from 'next/image';
import CopyButton from '../shared/CopyButton/CopyButton';
import { Modal } from '../shared/Modal';
import BloggerForm from './BloggerForm';

export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink = 'www.blockfirst.ru/ref2001';

  const [isBloggersFormOpen, setIsBloggersFormOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isBloggersFormOpen}
        onClose={() => setIsBloggersFormOpen(false)}
      >
        <BloggerForm onClose={() => setIsBloggersFormOpen(false)} />
      </Modal>
      <UnifiedTopbar
        showBorder={false}
        className="relative bg-[#01050d] bg-[url('/images/misc/referral-header-bg-mobile.png')] sm:bg-[url('/images/misc/header-bg.png')] bg-cover bg-center"
        leftContent={
          <div className="flex flex-col">
            <div className="flex flex-row space-x-5">
              <Image
                src={HeaderIcon}
                alt="Header Icon"
                className="h-10 w-10 object-cover sm:h-15.25 sm:w-15.25"
              />
              <div className="flex flex-col space-y-2">
                <h1 className="text-foreground text-xl leading-8.25 font-medium sm:text-3xl">
                  Реферальная программа
                </h1>
                <p className="text-secondary text-xs leading-5">
                  Приглашайте друзей и коллег для обучения в BlockFirst и
                  увеличивайте свой доход!
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 pt-10 sm:hidden">
              <div className="flex flex-1 flex-row items-center justify-center gap-2 text-sm">
                <div>Реф. ссылка</div>
                <CopyButton
                  appearanceType="near"
                  className="flex items-center"
                />
              </div>
              <button
                className="flex flex-1 flex-row justify-center rounded-full border border-[#195AF4] py-2 text-sm bg-dark-bg"
                onClick={() => {
                  console.log('clicked');
                  setIsBloggersFormOpen(true);
                }}
              >
                Блогерам
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7307 4.43156C15.0295 4.14474 15.5043 4.15448 15.7911 4.45332L20.4065 9.26205C20.685 9.55226 20.685 10.0105 20.4065 10.3007L15.7911 15.1095C15.5043 15.4083 15.0295 15.418 14.7307 15.1312C14.4318 14.8444 14.4221 14.3696 14.7089 14.0708L18.8258 9.78139L14.7089 5.492C14.4221 5.19316 14.4318 4.71838 14.7307 4.43156Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </button>
            </div>
          </div>
        }
        rightContent={
          <div className="hidden flex-row items-center gap-8 sm:flex">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <span className="text-foreground text-sm">{referralLink}</span>
                <CopyButton
                  appearanceType="near"
                  className="flex items-center"
                />
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

            <button
              className="border-primary hover:bg-primary flex h-10 w-33 cursor-pointer items-center justify-center rounded-full border bg-[#01050d]"
              onClick={() => setIsBloggersFormOpen(true)}
            >
              <div className="flex items-center space-x-0">
                <span className="text-foreground text-sm">Блогерам</span>
                <Image src={'/images/icons/forward-arrow.svg'} alt="forward-arrow" width={21} height={20} className="h-5 w-5" />
              </div>
            </button>
          </div>
        }
      />
    </>
  );
}
