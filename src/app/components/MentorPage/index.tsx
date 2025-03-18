'use client';

import { useState } from 'react';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CallIcon from './assets/calls.png';
import TextIcon from './assets/text.png';

const ComingSoon = () => {
  return (
    <svg
      width="103"
      height="24"
      viewBox="0 0 103 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.25"
        y="0.25"
        width="102.5"
        height="23.5"
        rx="11.75"
        stroke="url(#paint0_linear_1147_15805)"
        stroke-opacity="0.5"
        stroke-width="0.5"
      />
      <path
        d="M12.36 11.716C12.36 8.992 13.956 7.276 16.356 7.276C18.396 7.276 19.848 8.464 20.244 10.456H19.14C18.792 9.052 17.772 8.236 16.344 8.236C14.604 8.236 13.44 9.568 13.44 11.716C13.44 13.852 14.604 15.184 16.356 15.184C17.844 15.184 18.888 14.272 19.188 12.748H20.292C19.968 14.872 18.492 16.144 16.356 16.144C13.956 16.144 12.36 14.44 12.36 11.716ZM22.0644 12.76C22.0644 14.224 22.8444 15.208 24.1524 15.208C25.4604 15.208 26.2284 14.224 26.2284 12.76C26.2284 11.308 25.4604 10.324 24.1524 10.324C22.8444 10.324 22.0644 11.308 22.0644 12.76ZM21.0084 12.76C21.0084 10.756 22.2564 9.388 24.1524 9.388C26.0484 9.388 27.2844 10.756 27.2844 12.76C27.2844 14.764 26.0484 16.144 24.1524 16.144C22.2564 16.144 21.0084 14.764 21.0084 12.76ZM29.0605 12.76C29.0605 14.224 29.8405 15.208 31.1485 15.208C32.4565 15.208 33.2245 14.224 33.2245 12.76C33.2245 11.308 32.4565 10.324 31.1485 10.324C29.8405 10.324 29.0605 11.308 29.0605 12.76ZM28.0045 12.76C28.0045 10.756 29.2525 9.388 31.1485 9.388C33.0445 9.388 34.2805 10.756 34.2805 12.76C34.2805 14.764 33.0445 16.144 31.1485 16.144C29.2525 16.144 28.0045 14.764 28.0045 12.76ZM35.1926 16V9.532H36.1286L36.1646 10.684C36.4766 9.868 37.2086 9.388 38.1686 9.388C39.1766 9.388 39.8966 9.904 40.2086 10.768C40.5086 9.904 41.2646 9.388 42.2846 9.388C43.6646 9.388 44.5286 10.324 44.5286 11.836V16H43.4966V12.22C43.4966 10.972 43.0286 10.324 42.0806 10.324C41.0606 10.324 40.3766 11.08 40.3766 12.22V16H39.3446V12.22C39.3446 10.972 38.8766 10.324 37.9286 10.324C36.9086 10.324 36.2246 11.08 36.2246 12.22V16H35.1926ZM45.6352 16V9.532H46.6432V16H45.6352ZM45.5872 8.584V7.264H46.6912V8.584H45.5872ZM47.8023 16V9.532H48.7383L48.7743 10.696C49.1103 9.868 49.8783 9.388 50.8983 9.388C52.3383 9.388 53.2263 10.324 53.2263 11.836V16H52.1943V12.22C52.1943 10.972 51.6903 10.324 50.6703 10.324C49.5663 10.324 48.8343 11.08 48.8343 12.22V16H47.8023ZM55.1465 12.592C55.1465 14.032 55.8425 14.848 57.0905 14.848C58.3625 14.848 59.1305 14.008 59.1305 12.592C59.1305 11.188 58.3625 10.324 57.0905 10.324C55.8425 10.324 55.1465 11.14 55.1465 12.592ZM54.3305 15.976H55.3865C55.4705 16.924 56.3105 17.38 57.2465 17.38C58.2665 17.38 59.1065 16.828 59.1065 15.328V14.608C58.7105 15.364 57.8825 15.784 56.9225 15.784C55.2305 15.784 54.0905 14.488 54.0905 12.58C54.0905 10.672 55.2305 9.388 56.9105 9.388C57.8825 9.388 58.7825 9.808 59.1665 10.636L59.2025 9.532H60.1385V15.328C60.1385 17.452 58.8665 18.316 57.2345 18.316C55.7345 18.316 54.4745 17.584 54.3305 15.976ZM63.204 13.036H64.272C64.416 14.392 65.328 15.184 66.816 15.184C68.088 15.184 68.868 14.608 68.868 13.684C68.868 12.58 67.8 12.352 66.432 12.076C64.968 11.788 63.408 11.44 63.408 9.724C63.408 8.248 64.548 7.276 66.408 7.276C68.46 7.276 69.66 8.536 69.792 10.18H68.712C68.592 9.088 67.776 8.236 66.384 8.236C65.256 8.236 64.488 8.836 64.488 9.688C64.488 10.708 65.616 10.936 66.852 11.188C68.436 11.5 69.948 11.848 69.948 13.612C69.948 15.208 68.628 16.144 66.792 16.144C64.62 16.144 63.288 14.848 63.204 13.036ZM71.6699 12.76C71.6699 14.224 72.4499 15.208 73.7579 15.208C75.0659 15.208 75.8339 14.224 75.8339 12.76C75.8339 11.308 75.0659 10.324 73.7579 10.324C72.4499 10.324 71.6699 11.308 71.6699 12.76ZM70.6139 12.76C70.6139 10.756 71.8619 9.388 73.7579 9.388C75.6539 9.388 76.8899 10.756 76.8899 12.76C76.8899 14.764 75.6539 16.144 73.7579 16.144C71.8619 16.144 70.6139 14.764 70.6139 12.76ZM78.666 12.76C78.666 14.224 79.446 15.208 80.754 15.208C82.062 15.208 82.83 14.224 82.83 12.76C82.83 11.308 82.062 10.324 80.754 10.324C79.446 10.324 78.666 11.308 78.666 12.76ZM77.61 12.76C77.61 10.756 78.858 9.388 80.754 9.388C82.65 9.388 83.886 10.756 83.886 12.76C83.886 14.764 82.65 16.144 80.754 16.144C78.858 16.144 77.61 14.764 77.61 12.76ZM84.8101 16V9.532H85.7461L85.7821 10.696C86.1181 9.868 86.8861 9.388 87.9061 9.388C89.3461 9.388 90.2341 10.324 90.2341 11.836V16H89.2021V12.22C89.2021 10.972 88.6981 10.324 87.6781 10.324C86.5741 10.324 85.8421 11.08 85.8421 12.22V16H84.8101Z"
        fill="url(#paint1_linear_1147_15805)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1147_15805"
          x1="8.20354"
          y1="35.0769"
          x2="106.26"
          y2="-15.5989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F46919" />
          <stop offset="1" stop-color="#F419AB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1147_15805"
          x1="18.292"
          y1="25.9231"
          x2="86.252"
          y2="-17.178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F46919" />
          <stop offset="1" stop-color="#F419AB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function MentorPage({ session }: { session: Session }) {
  const [index, setIndex] = useState(0);

  const mentors = [
    {
      name: 'Андрей Симаранов',
      bigImage: '/mentors/andrey_simaranov/big.png',
      smallImage: '/mentors/andrey_simaranov/small.png',
      description: 'CEO BlockFirst, Solidity Auditor',
      about:
        'Aудитор Solidity в Mixbytes auditor DAO. Co-Founder и разработчик проекта Xraise.io в экосистеме ZkSync. Founder проекта ZkNoid',
      skills: ['BlockChain', 'Fullstack', 'auditor'],
      education: 'МФТИ',
      experience: '8 лет',
      languages: ['Typescript', 'Solidity', 'Rust'],
      soon: false,
      current: true,
    },
    {
      name: 'Елена Виноградова',
      bigImage: '/mentors/elena_vinogradova/big.png',
      smallImage: '/mentors/elena_vinogradova/small.png',
      description: 'Middle Solidity Developer',
      about: 'Middle Solidity Developer',
      soon: true,
      current: false,
    },
    {
      name: 'Алина Филатова',
      bigImage: '/mentors/alina_filatova/big.png',
      smallImage: '/mentors/alina_filatova/small.png',
      description: 'DeFi Researcher',
      soon: true,
      current: false,
    },
    {
      name: 'Роман Азаренок',
      bigImage: '/mentors/roman_azarenok/big.png',
      smallImage: '/mentors/roman_azarenok/small.png',
      description: 'Fullstack Developer',
      soon: true,
      current: false,
    },
    {
      name: 'Кирилл Мартышенко',
      bigImage: '/mentors/kirill_martyshenko/big.png',
      smallImage: '/mentors/kirill_martyshenko/small.png',
      description: 'Fullstack Developer',
      soon: true,
      current: false,
    },
  ];

  return (
    <main className="border-accent border-r border-l">
      <Topbar lastestUpdate={'18 марта 2025'} items={[]} />

      <div className="flex">
        {/* Mentors sidebar */}
        <section className="border-accent w-[300px] border-r">
          {mentors.map((mentor) => (
            <div className="border-accent relative border-b p-5">
              <div className="flex items-center justify-between">
                {mentor.soon && <ComingSoon />}
                {mentor.current && (
                  <span className="text-success border-success/50 rounded-full border-[0.5px] px-3 py-1 text-xs">
                    Ваш куратор
                  </span>
                )}
                {mentor.soon && (
                  <div className="text-secondary/50 h-4 w-4">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00161 11.1204C8.52675 11.1204 8.95245 10.6947 8.95245 10.1696C8.95245 9.64445 8.52675 9.21875 8.00161 9.21875C7.47648 9.21875 7.05078 9.64445 7.05078 10.1696C7.05078 10.6947 7.47648 11.1204 8.00161 11.1204Z"
                        fill="#9AA6B5"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M11.6607 6.55949V5.83033C11.6607 4.25533 11.2816 2.16699 7.9974 2.16699C4.71323 2.16699 4.33406 4.25533 4.33406 5.83033V6.55949C2.70073 6.76366 2.16406 7.59199 2.16406 9.62783V10.7128C2.16406 13.1045 2.89323 13.8337 5.2849 13.8337H10.7099C13.1016 13.8337 13.8307 13.1045 13.8307 10.7128V9.62783C13.8307 7.59199 13.2941 6.76366 11.6607 6.55949ZM7.9974 11.932C7.02323 11.932 6.23573 11.1387 6.23573 10.1703C6.23573 9.19616 7.02906 8.40866 7.9974 8.40866C8.96573 8.40866 9.75906 9.20199 9.75906 10.1703C9.75906 11.1445 8.97156 11.932 7.9974 11.932ZM5.2849 6.50699C5.23823 6.50699 5.1974 6.50699 5.15073 6.50699V5.83033C5.15073 4.12116 5.6349 2.98366 7.9974 2.98366C10.3599 2.98366 10.8441 4.12116 10.8441 5.83033V6.51283C10.7974 6.51283 10.7566 6.51283 10.7099 6.51283H5.2849V6.50699Z"
                        fill="#9AA6B5"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-center gap-4">
                <motion.div
                  className="bg-background h-[38px] w-[38px] overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={mentor.smallImage}
                      alt={mentor.name}
                      width={38}
                      height={38}
                    />
                  </div>
                </motion.div>
                <div className="flex flex-col gap-2">
                  <span className="text-foreground text-sm">{mentor.name}</span>
                  <span className="text-secondary text-xs">
                    {mentor.description}
                  </span>
                </div>
              </div>
              {mentor.soon && (
                <div className="bg-dark-bg absolute right-0 bottom-0 left-0 h-[77px] opacity-50"></div>
              )}
            </div>
          ))}
        </section>

        {/* Left sidebar - Mentor Profile */}
        <section className="border-accent w-[400px] border-r">
          {/* Profile container */}
          <div className="bg-background relative h-[365px] overflow-hidden">
            {/* Background grid effect */}
            <div className="absolute inset-0 -top-[25px] h-[283px] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,45,51,1)_20%,rgba(40,45,51,0)_68%)]"></div>
            </div>

            {/* Avatar container */}
            <div className="absolute inset-x-0 flex h-[258px] items-center justify-center">
              <div className="relative h-[267px] w-[208px]">
                <Image
                  src={mentors[index]!.bigImage ?? ''}
                  alt={mentors[index]!.name ?? ''}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Name and title */}
            <div className="absolute right-8 bottom-7 left-8 flex flex-col gap-3">
              <h1 className="text-foreground text-center text-3xl">
                Андрей Симаранов
              </h1>
              <p className="text-secondary text-center text-xs">
                CEO BlockFirst, Solidity Auditor
              </p>
            </div>
          </div>

          {/* Mentor info */}
          <div className="flex flex-col gap-[86px] py-8">
            {/* About and skills */}
            <div className="flex flex-col gap-8 px-8">
              {/* About section */}
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  <p className="text-secondary text-xs uppercase opacity-50">
                    о кураторе
                  </p>
                  <div className="text-secondary h-4 w-4">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.0026 1.83398C4.59685 1.83398 1.83594 4.5949 1.83594 8.00065C1.83594 11.4064 4.59685 14.1673 8.0026 14.1673C11.4084 14.1673 14.1693 11.4064 14.1693 8.00065C14.1693 4.5949 11.4084 1.83398 8.0026 1.83398ZM0.835938 8.00065C0.835938 4.04261 4.04456 0.833984 8.0026 0.833984C11.9606 0.833984 15.1693 4.04261 15.1693 8.00065C15.1693 11.9587 11.9606 15.1673 8.0026 15.1673C4.04456 15.1673 0.835938 11.9587 0.835938 8.00065ZM8.0026 6.83398C8.27875 6.83398 8.5026 7.05784 8.5026 7.33398V10.6673C8.5026 10.9435 8.27875 11.1673 8.0026 11.1673C7.72646 11.1673 7.5026 10.9435 7.5026 10.6673V7.33398C7.5026 7.05784 7.72646 6.83398 8.0026 6.83398ZM8.0026 6.00065C8.37079 6.00065 8.66927 5.70217 8.66927 5.33398C8.66927 4.96579 8.37079 4.66732 8.0026 4.66732C7.63441 4.66732 7.33594 4.96579 7.33594 5.33398C7.33594 5.70217 7.63441 6.00065 8.0026 6.00065Z"
                        fill="#9AA6B5"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm">
                  Аудитор Solidity в Mixbytes auditor DAO. Co-Founder и
                  разработчик проекта Xraise.io в экосистеме ZkSync. Founder
                  проекта ZkNoid
                </p>

                {/* Skills pills */}

                <div className="flex gap-2">
                  {mentors[index]!.skills?.map((skill) => (
                    <div className="rounded-lg bg-[#14171C] px-3 py-2">
                      <span className="text-secondary text-xs uppercase opacity-50">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education and Experience */}
              <div className="flex flex-col gap-5">
                {/* Education */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-secondary h-[14px] w-[14px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                      </svg>
                    </div>
                    <span className="text-secondary text-sm">Образование:</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {mentors[index]!.education}
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-secondary h-[14px] w-[14px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-secondary text-sm">Опыт работы:</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {mentors[index]!.experience}
                  </span>
                </div>

                {/* Languages */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-secondary h-[14px] w-[14px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                      </svg>
                    </div>
                    <span className="text-secondary text-sm">Языки:</span>
                  </div>
                  <span className="text-foreground text-sm">
                    Typescript, Solidity, Rust, Python
                  </span>
                </div>
              </div>
            </div>

            {/* Selected mentor indicator */}
            <div className="flex flex-col gap-6">
              <div className="mx-8">
                <div className="bg-success/10 flex items-center justify-center gap-1 rounded-full py-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#48cc9e"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span className="text-success text-lg">
                    Выбранный куратор
                  </span>
                </div>
              </div>

              <div className="bg-dark-bg flex h-8 items-center justify-center">
                <p className="text-secondary text-sm">
                  Не нравится куратор? Сменить
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right side - Interaction area */}
        <section className="flex flex-1 flex-col gap-[38px]">
          {/* Contact methods */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="border-accent h-12 border-b">
              <div className="flex h-full items-center justify-between px-8">
                <span className="text-secondary text-base uppercase">
                  сВЯЗЬ С КУРАТОРОМ
                </span>
                <div className="text-secondary h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact options */}
            <div className="border-accent flex border-b">
              {/* Calls */}
              <div className="border-accent w-1/2 border-r">
                <div className="bg-background relative h-16 overflow-hidden">
                  <div className="relative flex h-full items-center gap-4 px-8">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={CallIcon}
                        alt="Calls"
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="text-foreground text-lg">Звонки</span>
                  </div>
                </div>
                <div className="px-8 py-4">
                  <p className="text-foreground text-xs">
                    Звонок согласовывается в чате. Пожалуйста, заранее
                    подготовьте вопрос или опишите проблему.
                  </p>
                </div>
              </div>

              {/* Text */}
              <div className="w-1/2">
                <div className="bg-background relative h-16 overflow-hidden">
                  <div className="relative flex h-full items-center gap-4 px-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                      <Image src={TextIcon} alt="Text" width={32} height={32} />
                    </div>
                    <span className="text-foreground text-lg">
                      Текстовый формат
                    </span>
                  </div>
                </div>
                <div className="px-8 py-4">
                  <p className="text-foreground text-xs">
                    Обращайтесь с вопросами, возникшими в процессе курса.
                    Куратор быстро поможет вам!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form section */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Header with instructions */}
            <div>
              <div className="bg-dark-bg flex h-12 items-center">
                <div className="flex items-center gap-4 px-8">
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={mentors[index]!.smallImage ?? ''}
                      alt={mentors[index]!.name ?? ''}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="text-foreground text-base">
                    Как добавить куратора?
                  </span>
                </div>
                <div className="ml-auto flex items-center pr-8">
                  <div className="flex items-center gap-1">
                    <div className="bg-success h-1 w-1 rounded-full"></div>
                    <span className="text-success text-xs">Online</span>
                  </div>
                </div>
              </div>
              <div className="px-8 py-5">
                <p className="text-secondary text-sm">
                  Заполните все поля и наш куратор свяжется с вами в Telegram
                  для согласования времени и даты звонка
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="flex flex-col gap-[143px] px-8">
              <div className="flex flex-col gap-8">
                {/* Name input */}
                <div className="border-accent h-12 border-b">
                  <div className="flex h-full items-center gap-3 px-4">
                    <div className="text-secondary/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <span className="text-secondary/50 text-base">
                      Ваше имя
                    </span>
                  </div>
                </div>

                {/* Telegram input */}
                <div className="border-accent h-12 border-b">
                  <div className="flex h-full items-center gap-3 px-4">
                    <div className="text-secondary/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                      >
                        <path d="M2 8.994C2 5.13 5.134 2 9 2h6c3.866 0 7 3.13 7 6.994v6.012C22 18.87 18.866 22 15 22H9c-3.866 0-7-3.13-7-6.994V8.994zM9 16.5h3.5a5.5 5.5 0 005.5-5.5V9.5H9V16.5zm9.5-10h-13v2.5h13V6.5z" />
                      </svg>
                    </div>
                    <span className="text-secondary/50 text-base">
                      Ваш телеграм
                    </span>
                  </div>
                </div>

                <div className="border-accent h-12 border-b">
                  <div className="flex h-full items-center gap-3 px-4">
                    <div className="text-secondary/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                      </svg>
                    </div>
                    <span className="text-secondary/50 text-base">
                      Курс который вы проходите
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                className="bg-primary text-foreground ml-auto flex h-12 w-12 items-center justify-center rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Privacy notice */}
            <div className="bg-dark-bg mt-auto flex h-8 items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="text-secondary h-3.5 w-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <span className="text-secondary text-sm">
                  Ваши данные полностью Конфиденциальны
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
