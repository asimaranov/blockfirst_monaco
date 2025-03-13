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
        'flex h-[5.093vw] w-full flex-row items-center border-b border-[#282D33] px-8 py-5',
        className
      )}
    >
      {children}
    </nav>
  );
}
