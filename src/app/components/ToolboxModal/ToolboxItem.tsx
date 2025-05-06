import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '~/helpers';
import ToolboxField from './ToolboxField';

interface ToolboxItemProps {
  id: string;
  title: string;
  description: string;
  inputValue?: string;
  inputValue2?: string;
  actionButton?: React.ReactNode;
  outputValue?: string;
  walletRequired?: boolean;
  applyFunction?: (input: string, input2?: string) => string;
  isConstant?: boolean;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={cn('h-5 w-5', className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const ToolboxItem: React.FC<ToolboxItemProps> = ({
  id,
  title,
  description,
  inputValue,
  inputValue2,
  actionButton,
  outputValue,
  walletRequired,
  applyFunction,
  isConstant
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleExpand}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground text-[16px]">{title}</h3>
          <p className="text-secondary text-[14px]">{description}</p>
        </div>
        <ChevronDownIcon
          className={cn(
            'text-primary transform transition-transform duration-200',
            isExpanded ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              marginTop: '20px',
            }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-7">
              {inputValue && (
                <ToolboxField
                  type="text"
                  value={input}
                  placeholder={inputValue}
                  name={`${id}-input`}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (applyFunction) {
                      if (inputValue2) {
                        setOutput(applyFunction(e.target.value, input2));
                      } else {
                        setOutput(applyFunction(e.target.value));
                      }
                    }
                  }}
                  walletRequired={walletRequired}
                />
              )}

              {inputValue2 && (
                <ToolboxField
                  type="text"
                  value={input2}
                  placeholder={inputValue2}
                  name={`${id}-input2`}
                  onChange={(e) => {
                    setInput2(e.target.value);
                    if (applyFunction) {
                      if (inputValue) {
                        setOutput(applyFunction(input, e.target.value));
                      } else {
                        setOutput(applyFunction(e.target.value));
                      }
                    }
                  }}
                />
              )}

              {actionButton}

              <ToolboxField
                type="text"
                value={isConstant ? outputValue! : output}
                placeholder={outputValue || 'Вывод...'}
                name={`${id}-output`}
                copyable={true}
                readOnly={true}
                onChange={() => {}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolboxItem;
