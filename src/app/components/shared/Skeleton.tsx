import { cn } from '~/helpers';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-full bg-[#9AA6B5]', className)}
      {...props}
    />
  );
}
