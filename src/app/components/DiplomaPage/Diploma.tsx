import Image from 'next/image';
import LockIcon from './assets/lock.svg';
import LogoBig from './assets/logo_big.svg';

interface DiplomaProps {
  name: string;
  jobTitle: string;
  uniqueCode: string;
  startDate: string;
  endDate: string;
  curatorName: string;
  curatorTitle: string;
}

export function Diploma({
  name,
  jobTitle,
  uniqueCode,
  startDate,
  endDate,
  curatorName,
  curatorTitle,
}: DiplomaProps) {
  return (
    <div className="bg-background flex h-full w-full flex-col p-5">
      <div className="bg-dark-bg flex h-full w-full flex-col p-5">
        {/* Header with logo and unique code */}
        <div className="flex flex-row items-start gap-5">
          <Image src={LogoBig} alt="Logo" className="h-44" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="bg-primary h-1 w-1 rounded-full" />
              <span className="text-foreground text-[7pt]">Уникальный код</span>
            </div>
            <span className="text-secondary text-[5pt] opacity-50">
              {uniqueCode}
            </span>
          </div>
        </div>

        {/* Student info */}
        <div className="mt-5 flex flex-col gap-2">
          <span className="text-foreground text-xl">{name}</span>
          <div className="bg-accent h-px w-full" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-xxs">{jobTitle}</span>
              <span className="border-success text-success rounded-full border px-1.5 py-0.5 text-[6pt]">
                Completed
              </span>
            </div>
            <span className="text-foreground text-[6pt]">
              {startDate} — {endDate}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="divide-accent border-accent mt-5 flex flex-row divide-x border ">
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-8 py-3">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-foreground text-xl">100+</span>
              <span className="text-secondary text-[5px]">
                Разной сложности задач
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-8">
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-foreground text-xl">45+</span>
              <span className="text-secondary text-[5px]">
                Практических тестов
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-8">
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-foreground text-xl">30+</span>
              <span className="text-secondary text-[5px]">Лекций в курсе</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-col gap-1">
          <div className="flex flex-wrap gap-1">
            <div className="">
              <span className="text-foreground text-xxs border-foreground rounded-full border-[0.25px] px-2 py-1">
                Освоил язык Solidity
              </span>
            </div>
            <div className="">
              <span className="text-foreground text-xxs border-foreground rounded-full border-[0.25px] px-2 py-1">
                Разработка смарт-контрактов
              </span>
            </div>
            <div className="">
              <span className="text-foreground text-xxs border-foreground rounded-full border-[0.25px] px-2 py-1">
                Получен опыт DeFI
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="">
              <span className="text-foreground text-xxs border-foreground rounded-full border-[0.25px] px-2 py-1">
                Может скамить на 200%
              </span>
            </div>
            <div className="">
              <span className="text-foreground text-xxs border-foreground rounded-full border-[0.25px] px-2 py-1">
                Холодные продажи
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-row items-center justify-between">
          <span className="text-secondary text-xxs">www.blockfirst.io</span>
          <span className="text-secondary text-xxs">Куратор курса</span>
          <div className="flex flex-col items-end gap-1">
            <span className="text-secondary text-xxs">{curatorName}</span>
            <span className="text-secondary text-xxs">{curatorTitle}</span>
          </div>
        </div>
      </div>
      <div className="bg-background text-secondary flex flex-row items-center justify-center gap-2 py-3 opacity-50">
        <Image src={LockIcon} alt="Lock" className="h-4 w-4" />
        Недоступен
      </div>
    </div>
  );
}
