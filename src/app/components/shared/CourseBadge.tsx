import Image from 'next/image';
import { ICourseBageInfo } from '~/app/lib/constants/courses';
import { cn } from '~/helpers';

interface CourseBadgeProps {
  badge: ICourseBageInfo;
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export function CourseBadge({
  badge,
  className,
  imgClassName,
  textClassName,
}: CourseBadgeProps) {
  if (!badge.title) return null;

  return (
    <span
      className={cn(
        'bg-background/30 border-foreground/20 z-30 flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm backdrop-blur-sm',
        className
      )}
    >
      {badge.img && (
        <Image
          src={badge.img}
          alt={badge.title}
          width={16}
          height={16}
          className={cn('h-4 w-4', imgClassName)}
        />
      )}
      <span className={cn('font-delight mt-0.5', textClassName)}>
        {badge.title}
      </span>
    </span>
  );
}
