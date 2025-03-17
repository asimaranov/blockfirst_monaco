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
    <div className="border-accent flex w-full flex-col border-b" key={title}>
      <div
        className="border-accent flex cursor-pointer items-center justify-between border-b px-8 py-5"
        onClick={onToggle}
      >
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
              <div key={`div-${index}`}>
                {index > 0 && (
                  <div
                    className="bg-secondary h-1 w-1 rounded-full opacity-50"
                  />
                )}
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className={cn(
            'group flex h-10 w-10 cursor-pointer items-center justify-center'
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
              isExpanded ? 'text-foreground' : 'group-hover:text-foreground'
            )}
          >
            <line
              x1="5"
              y1="10"
              x2="15"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-300"
            />
            <line
              x1="10"
              y1="5"
              x2="10"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={cn(
                'origin-center transition-transform duration-300',
                isExpanded ? 'scale-0' : 'scale-100'
              )}
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
                  ease: 'easeInOut',
                },
              },
            }}
            exit={{
              height: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: 'easeInOut',
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
