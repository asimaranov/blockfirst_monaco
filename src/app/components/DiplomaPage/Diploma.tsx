import Image from 'next/image';
import LockIcon from './assets/lock.svg';
import LogoBig from './assets/logo_big.svg';
import SignatureSvg from './assets/signature.svg';
import QrSvg from './assets/qr.svg';

interface DiplomaProps {
  name: string;
  jobTitle: string;
  uniqueCode: string;
  startDate: string;
  endDate: string;
  curatorName: string;
  curatorTitle: string;
  skills: string[];
}

export function Diploma({
  name,
  jobTitle,
  uniqueCode,
  startDate,
  endDate,
  curatorName,
  curatorTitle,
  skills,
}: DiplomaProps) {
  return (
    <div className="h-full">
      <div className="bg-dark-bg flex h-full w-full flex-col p-[calc(100*100cqw/1626)] pb-0">
        {/* Header with logo and unique code */}
        <div className="border-accent flex flex-row items-start gap-[calc(20*100cqw/1626)] border">
          <Image
            src={LogoBig}
            alt="Logo"
            className="w-[calc(713*100cqw/1626)] shrink-0"
          />
          <div className="flex w-full flex-col items-end gap-[calc(4*100cqw/1626)] p-[calc(64*100cqw/1626)]">
            <div className="flex items-center gap-[calc(12*100cqw/1626)]">
              <div className="bg-primary h-[calc(10*100cqw/1626)] w-[calc(10*100cqw/1626)] rounded-full" />
              <span className="text-foreground text-[calc(28*100cqw/1626)]">
                Уникальный код
              </span>
            </div>
            <span className="text-secondary text-[calc(20*100cqw/1626)] opacity-50">
              {uniqueCode}
            </span>
          </div>
        </div>

        {/* Student info */}
        <div className="mt-[calc(100*100cqw/1626)] flex flex-col gap-[calc(8*100cqw/1626)]">
          <span className="text-foreground border-b-accent border-b pb-[calc(32*100cqw/1626)] text-[calc(80*100cqw/1626)]">
            {name}
          </span>
          <div className="flex items-center justify-between pt-[calc(32*100cqw/1626)]">
            <div className="flex items-center gap-[calc(32*100cqw/1626)]">
              <span className="text-foreground text-[calc(32*100cqw/1626)]">
                {jobTitle}
              </span>
              <span className="border-success text-success rounded-full border px-[calc(24*100cqw/1626)] py-[calc(10*100cqw/1626)] text-[calc(24*100cqw/1626)]">
                Completed
              </span>
            </div>
            <span className="text-foreground text-[calc(24*100cqw/1626)]">
              {startDate} — {endDate}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="divide-accent border-accent mt-[calc(80*100cqw/1626)] flex flex-row divide-x border">
          <div className="flex flex-1 flex-col items-center justify-center gap-[calc(4*100cqw/1626)] px-[calc(32*100cqw/1626)] py-[calc(12*100cqw/1626)]">
            <div className="flex flex-col items-center justify-center gap-[calc(4*100cqw/1626)]">
              <span className="text-foreground text-[calc(80*100cqw/1626)]">
                100+
              </span>
              <span className="text-secondary text-[calc(20*100cqw/1626)]">
                Разной сложности задач
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-8">
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-foreground text-[calc(80*100cqw/1626)]">
                45+
              </span>
              <span className="text-secondary text-[calc(20*100cqw/1626)]">
                Практических тестов
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-8">
            <div className="flex flex-col items-center justify-center gap-1 py-3">
              <span className="text-foreground text-[calc(80*100cqw/1626)]">
                30+
              </span>
              <span className="text-secondary text-[calc(20*100cqw/1626)]">
                Лекций в курсе
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-[calc(100*100cqw/1626)] flex flex-col gap-[calc(20*100cqw/1626)]">
          <div className="flex flex-wrap gap-[calc(20*100cqw/1626)]">
            {skills.map((skill) => (
              <span
                className="text-foreground border-foreground rounded-full border-[0.25px] px-2 py-1 text-[calc(28*100cqw/1626)]"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid h-full grid-cols-3 grid-rows-[2rem,8fr]">
          <div className="flex flex-col justify-end">
            <span className="text-secondary text-[calc(28*100cqw/1626)] opacity-50">
              www.blockfirst.io
            </span>
          </div>
          <div className="mr-[calc(71*100cqw/1626)] flex flex-row items-end justify-end pt-[calc(156*100cqw/1626)]">
            <span className="text-secondary text-[calc(28*100cqw/1626)] opacity-50">
              Куратор курса
            </span>
          </div>
          <div className="ml-[calc(152*100cqw/1626)] flex flex-row items-end">
            <span className="text-secondary text-[calc(28*100cqw/1626)] opacity-50">
              {curatorName}
            </span>
          </div>

          <div className="mb-[calc(100*100cqw/1626)] flex flex-col justify-end">
            <Image src={QrSvg} alt="Logo" className="" />
          </div>
          <div>
            <Image
              src={SignatureSvg}
              alt="Logo"
              className="mb-[calc(49*100cqw/1626)]"
            />
          </div>
          <div className="ml-[calc(152*100cqw/1626)] flex flex-col">
            <span className="text-secondary pt-[calc(16*100cqw/1626)] text-[calc(20*100cqw/1626)] opacity-50">
              Основатель BlockFirst
            </span>
            <span className="text-secondary mt-[calc(100*100cqw/1626)] text-[calc(20*100cqw/1626)] opacity-50">
              Кураторы курса
            </span>
            <span className="text-secondary mt-[calc(24*100cqw/1626)] text-[calc(16*100cqw/1626)] opacity-50">
              Виталий Дорожко
            </span>
            <span className="text-secondary mt-[calc(24*100cqw/1626)] text-[calc(16*100cqw/1626)] opacity-50">
              Геннадий Тимченко
            </span>
            <span className="text-secondary mt-[calc(24*100cqw/1626)] text-[calc(16*100cqw/1626)] opacity-50">
              Василий Кондратьев
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
