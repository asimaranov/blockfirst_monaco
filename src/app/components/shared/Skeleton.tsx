import { cn } from '~/helpers';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-[#9AA6B5]', className)} {...props} />
  );
}
