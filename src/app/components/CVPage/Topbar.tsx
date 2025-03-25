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
    <UnifiedTopbar
      showBorder={false}
      className="relative bg-[#01050d] bg-[url('/images/misc/header-bg.png')] bg-cover bg-center"
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
            <h1 className="text-foreground text-3xl leading-8.25 font-medium">
              Персональное резюме
            </h1>
            <p className="text-secondary text-xs leading-5">
              После прохождения каждого этапа, вы разблокируете возможность
              улучшить свое резюме с куратором для работадателей
            </p>
          </div>
        </div>
      }
      
    />
  );
}
