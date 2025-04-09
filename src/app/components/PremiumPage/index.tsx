import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { TARIFFS } from '~/app/lib/constants/tariff';
import MentorImage from './assets/mentor.png';
import CVImage from './assets/cv.png';
import JobsImage from './assets/jobs.png';
import LockImage from './assets/lock.svg';
import ClubImage from './assets/club.png';
import proIMG from 'public/subscriptions/pro.svg';
import starterIMG from 'public/subscriptions/starter.svg';
import TariffCard from './TariffCard';
import PremiumFeatureCard from './PremiumFeatureCard';
import NftDiplomaMobile from './assets/nft-diploma-mobile.png';

import MentorIcon from '../Sidebar/assets/section_icons/mentor';
import CvIcon from '../Sidebar/assets/section_icons/cv';
import JobIcon from '../Sidebar/assets/section_icons/job';
import ClubIcon from '../Sidebar/assets/section_icons/club';
import Link from 'next/link';
import { api } from '~/trpc/server';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { PlanType } from '~/server/models/userData';
import TopbarDecoration from './assets/topbar-decoration.png';
import StarterIcon from './assets/starter-icon.png';
import ProIcon from './assets/pro-icon.png';

import FullAccessMobile from './assets/full-access-mobile.png';

import NotPaidBadge from './assets/not-paid-badge.svg';
import { cn } from '~/helpers';

const menuItems = [
  {
    id: 'mentor',
    icon: <MentorIcon className="h-5 w-5" />,
    label: 'Твой куратор',
    href: '/mentor',
    tariff: 'PRO TARIFF',
  },
  {
    id: 'cv',
    icon: <CvIcon className="h-5 w-5" />,
    label: 'Подготовка резюме',
    href: '/cv',
    tariff: 'PRO TARIFF',
  },
  {
    id: 'jobs',
    icon: <JobIcon className="h-5 w-5" />,
    label: 'Трудоустройство',
    href: '/employment',
    tariff: 'PRO TARIFF',
  },
  {
    id: 'club',
    icon: <ClubIcon className="h-5 w-5" />,
    label: 'Закрытый клуб BlockFirst',
    href: '#',
    tariff: 'STARTER TARIFF',
  },
];
// Premium feature data
const premiumFeatures = [
  {
    id: 'mentor',
    title: 'Персональный куратор ✌️',
    description:
      'Куратор окажет помощь в решении сложных задач и ответит на все ваши вопросы до завершения курса.',
    image: MentorImage,
    bgColor: 'bg-primary',
    tariff: 'PRO TARIFF',
    tariffIcon: TARIFFS[2]?.bigIcon,
  },
  {
    id: 'cv',
    title: 'Подготовка резюме 💣',
    description:
      'После прохождения каждого этапа, вы разблокируете возможность улучшить свое резюме с куратором для работадателей.',
    image: CVImage,
    bgColor: 'bg-[#E57A2E]',
    tariff: 'PRO TARIFF',
    tariffIcon: TARIFFS[2]?.bigIcon,
  },
  {
    id: 'jobs',
    title: 'Трудоустройство 👑',
    description:
      'Мы агрегируем актуальные вакансии для наших учеников. Доступны персонализированные предложения от наших партнеров.',
    image: JobsImage,
    bgColor: 'bg-[#7417E5]',
    tariff: 'PRO TARIFF',
    tariffIcon: TARIFFS[2]?.bigIcon,
  },
  {
    id: 'club',
    title: 'Закрытый клуб BlockFirst 😎',
    description:
      'Доступ к закрытому комьюнити энтузиастов. Cможете найти сокомандников и построить будущее в блокчейн индустрии.',
    image: ClubImage,
    bgColor: 'bg-[#30BF69]',
    tariff: 'STARTER TARIFF',
    tariffIcon: TARIFFS[1]?.bigIcon,
  },
  {
    id: 'full-access',
    title: 'Полный доступ 🔥',
    description:
      'Получите доступ ко всем основным материалам курса, автоматическую проверку решений, образовательные материалы по теме курса.',
    image: FullAccessMobile,
    bgColor: 'bg-[#14171C] border-accent sm:border-t sm:border-r sm:border-b',
    tariff: 'STARTER TARIFF',
    tariffIcon: TARIFFS[1]?.bigIcon,
  },
  {
    id: 'nft-diploma',
    title: 'NFT диплом ⚡️',
    description:
      'Разблокируется после прохождения каждого курса. Интерактивный диплом обновляется с каждой новой записью о ваших компетенциях. ',
    image: NftDiplomaMobile,
    bgColor: 'bg-[#14171C]  border-accent sm:border-t sm:border-b',
    tariff: 'STARTER TARIFF',
    tariffIcon: TARIFFS[1]?.bigIcon,
  },
];

const premiumFeatures2 = [
  premiumFeatures[4]!,
  premiumFeatures[5]!,
  premiumFeatures[3]!,
];

// Group features by tariff type
const proFeatures = menuItems.filter(
  (feature) => feature.tariff === 'PRO TARIFF'
);
const starterFeatures = menuItems.filter(
  (feature) => feature.tariff === 'STARTER TARIFF'
);

export default async function PremiumPage({ session }: { session: Session }) {
  const userData = await api.userData.getUserData();
  const tariff = TARIFFS.find(
    (t) => t.name === planTypeToSubscriptionType(userData.plan as PlanType)
  );

  return (
    <main className="border-accent border-r-0 border-l-0 sm:border-r sm:border-l">
      <div className="flex min-h-screen w-full flex-col bg-cover bg-center">
        <div className="hidden w-full flex-row gap-5 bg-[#01050D] bg-[url('/images/misc/premium-header-bg.png')] bg-cover bg-right-bottom bg-no-repeat px-8 py-6 sm:flex">
          <Image
            src={TopbarDecoration}
            alt="Premium"
            className="h-15.25 w-15.25"
          />
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-medium">Премиум возможности</span>
            <span className="text-secondary text-xs">
              Улучшите качество своего обучения в WEB3 с помощью дополнительных
              функций!
            </span>
          </div>
          <div className="ml-auto self-center">
            <Link href="/pricing">
              <button className="text-foreground border-primary/50 hover:bg-primary flex cursor-pointer flex-row items-center justify-center rounded-full border bg-[#01050D] px-6 py-2.5 text-sm">
                Посмотреть тарифы
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M14.2305 4.93358C14.5292 4.6468 15.0042 4.65636 15.291 4.95506L19.9062 9.76365C20.1848 10.0539 20.1848 10.5125 19.9062 10.8027L15.291 15.6113C15.0042 15.9102 14.5293 15.9196 14.2305 15.6328C13.9319 15.3459 13.9222 14.871 14.209 14.5722L18.3262 10.2832L14.209 5.99412C13.9222 5.69533 13.9317 5.22041 14.2305 4.93358Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <TariffCard
          image={<Image src={ProIcon} alt="Pro" className="h-12.5 w-12.5" />}
          title="Pro tariff"
          subtitle="Откроете для себя все возможности, которые предлагает образовательная платформа BlockFirst."
          subtitleWhite="Включено все с Starter тарифа."
          isPaid={userData.plan === 'pro'}
        />

        <section
          className={cn(
            'relative flex px-5 pt-5 pb-10 sm:hidden',
            userData.plan !== 'free' && 'hidden'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b bg-[url('/images/misc/premium-grid.svg')] bg-top"></div>

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

        <section
          className={cn(
            'flex grid-cols-3 flex-col space-y-3 px-2 py-3 pb-10 sm:grid sm:flex-row sm:px-0 sm:py-0',
            userData.plan !== 'free' && 'hidden sm:grid'
          )}
        >
          {premiumFeatures.map((feature) => (
            <PremiumFeatureCard
              key={feature.id}
              {...feature}
              isLocked={userData.plan === 'free'}
            />
          ))}
        </section>
        <TariffCard
          image={
            <Image src={StarterIcon} alt="Starter" className="h-12.5 w-12.5" />
          }
          badgeText="Basic features"
          title="Starter Tariff"
          subtitle='С тарифом "Starter" вы получите доступ к основным функциям, необходимым для начала обучения'
          isPaid={userData.plan === 'starter' || userData.plan === 'pro'}
        />

        <section className="hidden grid-cols-3 space-y-3 px-2 py-3 pb-10 sm:grid sm:flex-row sm:px-0 sm:py-0">
          {premiumFeatures2.map((feature) => (
            <PremiumFeatureCard
              key={feature.id}
              {...feature}
              isLocked={userData.plan === 'free'}
            />
          ))}
        </section>

        {/* Account Info */}
        <section className="mt-auto mb-10 sm:hidden">
          <div className="bg-background flex items-center justify-between bg-[url(/images/misc/tariff-section-grid.svg)] bg-cover bg-right-bottom bg-no-repeat p-5">
            <div className="flex items-center">
              <div className="h-13 w-13 overflow-hidden rounded-full">
                <Image
                  src={tariff?.bigIcon!}
                  alt="User"
                  width={52}
                  height={52}
                />
              </div>
              <div className="ml-4">
                <div className="text-foreground text-2xl font-medium">
                  {tariff?.name}
                </div>
                <div className="text-secondary mt-2 text-sm whitespace-nowrap">
                  {userData.plan === 'free' ? (
                    'Стартовый тариф'
                  ) : (
                    <>
                      <span>Оплачен до </span>
                      <span className="text-foreground">
                        {userData.premiumEndDate?.toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <span className="text-success border-success/50 self-start rounded-full border px-3 py-1 text-xs whitespace-nowrap">
              Активный тариф
            </span>
          </div>
          <div className="rounded-lg p-5">
            <div className="mt-10">
              <div className="text-secondary mb-1 flex justify-between text-xs">
                <span className="text-secondary/50 text-sm uppercase">
                  персонально
                </span>
                {userData.plan != 'pro' && (
                  <div className="flex items-center">
                    <Image src={proIMG} alt="Pro" className="h-5 w-8.25" />
                  </div>
                )}
              </div>

              <div className="">
                {proFeatures.map((feature) => (
                  <Link
                    key={feature.id}
                    href={feature.href ?? '#'}
                    className="border-accent flex items-center justify-between border-b pt-7 pb-5"
                  >
                    <div
                      className="flex items-center group"
                      data-active={userData.plan === 'pro'}
                    >
                      {feature.icon}
                      <span className="text-secondary ml-3 text-base">
                        {feature.label}
                      </span>
                    </div>
                    {userData.plan !== 'pro' && (
                      <Image
                        src={LockImage}
                        alt="Lock"
                        width={20}
                        height={20}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="text-secondary mt-10 text-xs">
                <div className="flex justify-between">
                  <span className="text-secondary/50 text-sm uppercase">
                    Телеграм чат
                  </span>
                  {userData.plan === 'free' && (
                    <Image
                      src={starterIMG}
                      alt="Starter"
                      className="h-5 w-14.75"
                    />
                  )}
                </div>

                {starterFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="border-accent mt-3 flex items-center justify-between pt-5 pb-5"
                  >
                    <div
                      className="flex items-center group"
                      data-active={userData.plan !== 'free'}
                    >
                      {feature.icon}
                      <span className="text-secondary ml-3 text-base">
                        {feature.label}
                      </span>
                    </div>
                    {userData.plan === 'free' && (
                      <Image
                        src={LockImage}
                        alt="Lock"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
