import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
} from '~/app/components/shared/Topbar';
import HeaderIcon from './assets/header-icon.png';
import Image from 'next/image';
import CopyButton from '../shared/CopyButton/CopyButton';
import { Modal } from '../shared/Modal';
import BloggerForm from './BloggerForm';
import { api } from '~/trpc/react';

export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [isBloggersFormOpen, setIsBloggersFormOpen] = useState(false);

  // Fetch user's referral code
  const { data: referralCodeData, isLoading } =
    api.referrals.getUserReferralCode.useQuery();

  // Fetch blogger status
  const { data: bloggerStatus } = api.referrals.getBloggerStatus.useQuery();

  // Update referral link when data is loaded
  useEffect(() => {
    if (referralCodeData && referralCodeData.code) {
      const baseUrl = window.location.origin;
      setReferralLink(`${baseUrl}/ref/${referralCodeData.code}`);
    }
  }, [referralCodeData]);

  // Handle copy function
  const handleCopy = async () => {
    if (referralLink) {
      try {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
  };

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
        className="relative bg-[#01050d] bg-[url('/images/misc/referral-header-bg-mobile.png')] bg-cover bg-center sm:bg-[url('/images/misc/header-bg.png')]"
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
                <p className="text-secondary text-sm leading-5 sm:text-xs">
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
                  onCopy={handleCopy}
                />
              </div>
              <button
                className="flex flex-1 flex-row justify-center rounded-full border border-[#195AF4] bg-[#01050d] py-2 text-sm"
                onClick={() => {
                  console.log('clicked');
                  setIsBloggersFormOpen(true);
                }}
              >
                {bloggerStatus?.isBlogger ? 'Аккаунт блогера' : 'Блогерам'}
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
                <span className="text-foreground text-sm">
                  {isLoading ? 'Загрузка...' : referralLink}
                </span>
                <CopyButton
                  appearanceType="near"
                  className="flex items-center"
                  onCopy={handleCopy}
                />
              </div>
            </div>
            {bloggerStatus?.isBlogger ? (
              <div className="rounded-[100px] bg-[#33CF8E]/10 px-6 py-2.5 text-sm text-[#33CF8E] flex flex-row gap-1 items-center justify-center">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.44922 11.15L8.04922 13.75L14.5492 7.25"
                    stroke="#33CF8E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Аккаунт блогера
              </div>
            ) : (
              <button
                className="border-primary hover:bg-primary flex h-10 w-33 cursor-pointer items-center justify-center rounded-full border bg-[#01050d]"
                onClick={() => setIsBloggersFormOpen(true)}
              >
                <div className="flex items-center space-x-0">
                  <span className="text-foreground text-sm">Блогерам</span>
                  <Image
                    src={'/images/icons/forward-arrow.svg'}
                    alt=""
                    width={21}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </button>
            )}
          </div>
        }
      />
    </>
  );
}
