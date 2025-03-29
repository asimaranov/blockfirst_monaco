'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { Tariff, TARIFFS } from '~/app/lib/constants/tariff';
import { cn } from '~/helpers';
import { formatPrice } from '~/app/lib/utils';
import { InfoPopover } from '~/app/components/shared/InfoPopover';
import MentorImage from './assets/mentor.png';
import CVImage from './assets/cv.png';
import JobsImage from './assets/jobs.png';
import LockImage from './assets/lock.svg';
import ClubImage from './assets/club.png';

export default function PremiumPage({ session }: { session: Session }) {
  const [selectedTariff, setSelectedTariff] = useState<Tariff>(TARIFFS[1]!); // Default to PRO

  return (
    <main className="border-accent border-r border-l">
      <div className="flex min-h-screen w-full flex-col">
        {/* <Topbar /> */}

        {/* Hero Section */}
        <section className=" relative px-5 pt-5 pb-10">
          <div className="from-background via-background/90 to-background/0 absolute inset-0 bg-gradient-to-b"></div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col gap-7">
            <div className="flex items-center justify-center">
              <Image
                src={'/images/logo/form-logo.svg'}
                alt="Logo"
                width={152}
                height={44}
                className="w-34.5"
              />
            </div>

            <div className="text-center">
              <h1 className="text-foreground text-3xl font-bold">
                Премиум возможности
              </h1>
              <p className="text-secondary mt-4 text-sm">
                Улучшите качество своего обучения в WEB3 с помощью
                дополнительных функций
              </p>
            </div>
          </div>
        </section>

        {/* Premium Cards */}
        <section className="space-y-3 px-2 py-3">
          {/* PRO Tariff Card */}
          <motion.div
            className="bg-primary rounded-xl p-5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
                  <Image
                    src={TARIFFS[2]?.bigIcon!}
                    alt="Pro"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="text-background ml-2 text-sm font-medium">
                    PRO TARIF
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Image src={LockImage} alt="Lock" width={20} height={20} />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Image src={MentorImage} alt="Mentor" />

              <div className="text-foreground">
                <h3 className="text-lg font-medium">Персональный куратор ✌️</h3>
                <p className="text-foreground/90 mt-4 text-sm">
                  Куратор окажет помощь в решении сложных задач и ответит на все
                  ваши вопросы до завершения курса.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Courses Card */}
          <motion.div
            className="rounded-xl bg-[#E57A2E] p-5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
                  <Image
                    src={TARIFFS[2]?.bigIcon!}
                    alt="Pro"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="text-background ml-2 text-sm font-medium">
                    PRO TARIF
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Image src={LockImage} alt="Lock" width={20} height={20} />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Image src={CVImage} alt="CV" />

              <div className="text-foreground">
                <h3 className="text-lg font-medium">Подготовка резюме 💣</h3>
                <p className="text-foreground/90 mt-4 text-sm">
                  После прохождения каждого этапа, вы разблокируете возможность
                  улучшить свое резюме с куратором для работадателей.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Jobs Card */}
          <motion.div
            className="rounded-xl bg-[#7417E5] p-5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
                  <Image
                    src={TARIFFS[2]?.bigIcon!}
                    alt="Pro"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="text-background ml-2 text-sm font-medium">
                    PRO TARIF
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Image src={LockImage} alt="Lock" width={20} height={20} />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Image src={JobsImage} alt="Jobs" />

              <div className="text-foreground">
                <h3 className="text-lg font-medium">Трудоустройство 👑</h3>
                <p className="text-foreground/90 mt-4 text-sm">
                  Мы агрегируем актуальные вакансии для наших учеников. Доступны
                  персонализированные предложения от наших партнеров.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div
            className="bg-[#30BF69] rounded-xl p-5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
                  <Image
                    src={TARIFFS[1]?.bigIcon!}
                    alt="Pro"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="text-background ml-2 text-sm font-medium">
                    STARTER TARIF
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Image src={LockImage} alt="Lock" width={20} height={20} />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Image src={ClubImage} alt="Club" />

              <div className="text-foreground">
                <h3 className="text-lg font-medium">
                  Закрытый клуб BlockFirst 😎
                </h3>
                <p className="text-foreground/90 mt-4 text-sm">
                  Доступ к закрытому комьюнити энтузиастов. Cможете найти
                  сокомандников и построить будущее в блокчейн индустрии.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Account Info */}
        <section className="mt-auto mb-10">
          <div className="bg-background rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-13 w-13 overflow-hidden rounded-full">
                  <Image
                    src={TARIFFS[0]?.bigIcon!}
                    alt="User"
                    width={52}
                    height={52}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-foreground font-medium text-2xl">Free</div>
                  <div className="text-secondary mt-2 text-sm">
                    Стартовый тариф
                  </div>
                </div>
              </div>
              <div className="border-success/50 rounded-full border px-3 py-1">
                <span className="text-success text-xs whitespace-nowrap">Активный тариф</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-secondary mb-8 flex justify-between text-xs">
                <span>персонально</span>
                <div className="flex items-center">
                  <div className="mr-2 h-1 w-1 rounded-full bg-pink-500"></div>
                  <span className="text-gradient-pink-orange text-xs">PRO</span>
                </div>
              </div>

              <div className="space-y-7">
                <div className="border-accent flex items-center justify-between border-t py-5">
                  <div className="flex items-center">
                    <Image
                      src="/images/user.svg"
                      alt="User"
                      width={20}
                      height={20}
                      className="text-secondary"
                    />
                    <span className="text-secondary ml-3">Твой куратор</span>
                  </div>
                  <Image
                    src="/images/lock.svg"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="border-accent flex items-center justify-between border-t py-5">
                  <div className="flex items-center">
                    <Image
                      src="/images/clipboard.svg"
                      alt="Clipboard"
                      width={20}
                      height={20}
                      className="text-secondary"
                    />
                    <span className="text-secondary ml-3">
                      Подготовка резюме
                    </span>
                  </div>
                  <Image
                    src="/images/lock.svg"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="border-accent flex items-center justify-between border-t py-5">
                  <div className="flex items-center">
                    <Image
                      src="/images/cup.svg"
                      alt="Cup"
                      width={20}
                      height={20}
                      className="text-secondary"
                    />
                    <span className="text-secondary ml-3">Трудоустройство</span>
                  </div>
                  <Image
                    src="/images/lock.svg"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="text-secondary mt-10 text-xs">
                <div className="flex justify-between">
                  <span>Телеграм чат</span>
                  <div className="flex items-center">
                    <div className="mr-2 h-1 w-1 rounded-full bg-pink-500"></div>
                    <span className="text-gradient-pink-orange text-xs">
                      STARTER
                    </span>
                  </div>
                </div>

                <div className="border-accent mt-8 flex items-center justify-between border-t py-5">
                  <div className="flex items-center">
                    <div className="bg-secondary text-background flex h-5 w-5 items-center justify-center rounded">
                      <span className="text-xs">BF</span>
                    </div>
                    <span className="text-secondary ml-3">
                      Закрытый клуб BlockFirst
                    </span>
                  </div>
                  <Image
                    src="/images/lock.svg"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
