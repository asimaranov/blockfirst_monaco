import { cn } from '~/helpers';

export function Topbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        'flex h-[88px] w-full flex-row items-center border-b border-[#282D33] px-[32px] py-[25px]',
        className
      )}
    >
      {children}
    </nav>
  );
}
