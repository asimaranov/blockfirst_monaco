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
    <div className={cn('flex flex-col gap-[0.926vw]', className)}>
      <div className="flex flex-row gap-[0.926vw]">
        <Image
          src={medalImg}
          alt="progress"
          className="h-[1.389vw] w-[1.389vw]"
        />
        <span className="font-roboto text-[1.157vw] font-semibold leading-[1.389vw] text-[#F2F2F2]">
          {progress}%
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
