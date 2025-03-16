import { cn } from '~/helpers';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionProps {
  title: string;
  status?: 'coming_soon';
  tags: string[];
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function Section({
  title,
  status,
  tags,
  isExpanded,
  onToggle,
  children,
}: SectionProps) {
  return (
    <div className="border-accent flex w-full flex-col border-b">
      <div className="flex items-center justify-between px-8 py-5 border-b border-accent">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-foreground text-xl">{title}</h1>
            {status === 'coming_soon' && (
              <div className="border-accent/50 rounded-full border bg-gradient-to-r from-[#F54F19] to-[#F4195A] bg-clip-text px-3 py-1 text-xs text-transparent">
                Coming Soon
              </div>
            )}
          </div>
          <div className="text-secondary flex items-center gap-2 text-xs opacity-50">
            {tags.map((tag, index) => (
              <>
                {index > 0 && (
                  <div className="bg-secondary h-1 w-1 rounded-full opacity-50" />
                )}
                <span key={tag}>{tag}</span>
              </>
            ))}
          </div>
        </div>
        <button
          className={cn(
            'group flex h-10 w-10 items-center justify-center rounded-full transition-colors',
            isExpanded ? 'bg-accent' : 'hover:bg-accent'
          )}
          onClick={onToggle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'transition-transform duration-300',
              isExpanded
                ? 'text-foreground rotate-180'
                : 'group-hover:text-foreground'
            )}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7803 7.21967C15.0732 7.51256 15.0732 7.98744 14.7803 8.28033L10.5303 12.5303C10.2374 12.8232 9.76256 12.8232 9.46967 12.5303L5.21967 8.28033C4.92678 7.98744 4.92678 7.51256 5.21967 7.21967C5.51256 6.92678 5.98744 6.92678 6.28033 7.21967L10 10.9393L13.7197 7.21967C14.0126 6.92678 14.4874 6.92678 14.7803 7.21967Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: 'auto',
              transition: {
                height: {
                  duration: 0.3,
                },
              },
            }}
            exit={{
              height: 0,
              transition: {
                height: {
                  duration: 0.3,
                },
                opacity: {
                  duration: 0.2,
                },
              },
            }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
