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
        'flex h-[5.093vw] w-full flex-row items-center border-b border-[#282D33] px-[1.85vw] py-[1.16vw]',
        className
      )}
    >
      {children}
    </nav>
  );
}
