import medalImg from 'public/misc/medal.svg';
import { Progress } from '../shared/Progress';
import Image from 'next/image';
import { cn } from '~/helpers';

export function CourseProgress({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-row gap-4">
        <Image
          src={medalImg}
          alt="progress"
          className="h-6 w-6"
        />
        <span className="font-roboto text-xl font-semibold leading-6 text-[#F2F2F2]">
          {progress}%
        </span>
      </div>
      <Progress value={progress} useFlag />
    </div>
  );
}
