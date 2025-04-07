import * as motion from 'motion/react-client';
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

import MentorIcon from '../Sidebar/assets/section_icons/mentor';
import CvIcon from '../Sidebar/assets/section_icons/cv';
import JobIcon from '../Sidebar/assets/section_icons/job';
import ClubIcon from './assets/club-icon.svg';
import Link from 'next/link';
import { api } from '~/trpc/server';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { PlanType } from '~/server/models/userData';

// Premium feature data
const premiumFeatures = [
  {
    id: 'mentor',
    title: 'Персональный куратор ✌️',
    description:
      'Куратор окажет помощь в решении сложных задач и ответит на все ваши вопросы до завершения курса.',
    image: MentorImage,
    bgColor: 'bg-primary',
    tariff: 'PRO TARIF',
    tariffIcon: TARIFFS[2]?.bigIcon,
    icon: <MentorIcon className="h-5 w-5" />,
    label: 'Твой куратор',
    href: '/mentor',
  },
  {
    id: 'cv',
    title: 'Подготовка резюме 💣',
    description:
      'После прохождения каждого этапа, вы разблокируете возможность улучшить свое резюме с куратором для работадателей.',
    image: CVImage,
    bgColor: 'bg-[#E57A2E]',
    tariff: 'PRO TARIF',
    tariffIcon: TARIFFS[2]?.bigIcon,
    icon: <CvIcon className="h-5 w-5" />,
    label: 'Подготовка резюме',
    href: '/cv',
  },
  {
    id: 'jobs',
    title: 'Трудоустройство 👑',
    description:
      'Мы агрегируем актуальные вакансии для наших учеников. Доступны персонализированные предложения от наших партнеров.',
    image: JobsImage,
    bgColor: 'bg-[#7417E5]',
    tariff: 'PRO TARIF',
    tariffIcon: TARIFFS[2]?.bigIcon,
    icon: <JobIcon className="h-5 w-5" />,
    label: 'Трудоустройство',
    href: '/employment',
  },
  {
    id: 'club',
    title: 'Закрытый клуб BlockFirst 😎',
    description:
      'Доступ к закрытому комьюнити энтузиастов. Cможете найти сокомандников и построить будущее в блокчейн индустрии.',
    image: ClubImage,
    bgColor: 'bg-[#30BF69]',
    tariff: 'STARTER TARIF',
    tariffIcon: TARIFFS[1]?.bigIcon,
    icon: <Image src={ClubIcon} alt="Club" className="h-5 w-5" />,
    label: 'Закрытый клуб BlockFirst',
    href: '#',
  },
];

// Group features by tariff type
const proFeatures = premiumFeatures.filter(
  (feature) => feature.tariff === 'PRO TARIF'
);
const starterFeatures = premiumFeatures.filter(
  (feature) => feature.tariff === 'STARTER TARIF'
);

export default async function PremiumPage({ session }: { session: Session }) {
  const userData = await api.userData.getUserData();
  const tariff = TARIFFS.find(
    (t) => t.name === planTypeToSubscriptionType(userData.plan as PlanType)
  );

  return (
    <main className="border-accent border-r-0 border-l-0 sm:border-r sm:border-l">
      <div className="flex min-h-screen w-full flex-col bg-cover bg-center">
        {/* <Topbar /> */}

        {userData.plan === 'free' && (
          <>
            <section className="relative px-5 pt-5 pb-10">
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

            <section className="space-y-3 px-2 py-3 pb-10">
              {premiumFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  className={`${feature.bgColor} rounded-xl p-5`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
                        <Image
                          src={feature.tariffIcon!}
                          alt={feature.tariff}
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                        <span className="text-background ml-2 text-sm font-medium">
                          {feature.tariff}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={LockImage}
                        alt="Lock"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <Image src={feature.image} alt={feature.title} />

                    <div className="text-foreground">
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="text-foreground/90 mt-4 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </section>
          </>
        )}
        {/* Account Info */}
        <section className="mt-auto mb-10">
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
                      <span>Оплачен </span>
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
                    <div className="flex items-center">
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
                    <div className="flex items-center">
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
