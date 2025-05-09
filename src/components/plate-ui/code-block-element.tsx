'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { NodeApi } from '@udecode/plate';
import { formatCodeBlock, isLangSupported } from '@udecode/plate-code-block';
import { PlateElement } from '@udecode/plate/react';
import { BracesIcon, CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from './button';
import { CodeBlockCombobox } from './code-block-combobox';

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        className={cn(
          className,
          'bg-[#14171C]',
          'py-1',
          '**:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d]',
          '**:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_]:text-[#d73a49]',
          '**:[.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_]:text-[#6f42c1]',
          '**:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#005cc5]',
          '**:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#032f62]',
          '**:[.hljs-built_in,.hljs-symbol]:text-[#e36209]',
          '**:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#22863a]',
          '**:[.hljs-emphasis]:italic',
          '**:[.hljs-strong]:font-bold',
          '**:[.hljs-section]:font-bold **:[.hljs-section]:text-[#005cc5]',
          '**:[.hljs-bullet]:text-[#735c0f]',
          '**:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a]',
          '**:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28]',
          'my-16'

        )}
        {...props}
      >
        <div className="bg-muted/50 relative rounded-md">
          <div className="border-accent top-1 right-1 z-10 flex w-full justify-between gap-0.5 border-b px-8 py-3 select-none">
            {/* <CodeBlockCombobox /> */}
            <span className="text-secondary/50 text-sm leading-5">
              {/* first letter uppercase */}
              {element.lang
                ? (element.lang as string).charAt(0).toUpperCase() +
                  (element.lang as string).slice(1)
                : 'Code'}
            </span>
            <CopyButton
              size="icon"
              variant="ghost"
              className=""
              value={() => NodeApi.string(element)}
            />
          </div>
          <pre className="overflow-x-auto p-8 pr-4 font-mono text-sm leading-[normal] [tab-size:2] print:break-inside-avoid">
            <code>{children}</code>
          </pre>
        </div>
      </PlateElement>
    );
  }
);


export const CodeBlockElementTask = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        className={cn(
          className,
          'bg-[#14171C]',
          'py-1',
          '**:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d]',
          '**:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_]:text-[#d73a49]',
          '**:[.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_]:text-[#6f42c1]',
          '**:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#005cc5]',
          '**:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#032f62]',
          '**:[.hljs-built_in,.hljs-symbol]:text-[#e36209]',
          '**:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#22863a]',
          '**:[.hljs-emphasis]:italic',
          '**:[.hljs-strong]:font-bold',
          '**:[.hljs-section]:font-bold **:[.hljs-section]:text-[#005cc5]',
          '**:[.hljs-bullet]:text-[#735c0f]',
          '**:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a]',
          '**:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28]',
          'my-8'

        )}
        {...props}
      >
        <div className="bg-muted/50 relative rounded-md">
          <div className="border-accent top-1 right-1 z-10 flex w-full justify-between gap-0.5 border-b px-8 py-3 select-none">
            {/* <CodeBlockCombobox /> */}
            <span className="text-secondary/50 text-sm leading-5">
              {/* first letter uppercase */}
              {element.lang
                ? (element.lang as string).charAt(0).toUpperCase() +
                  (element.lang as string).slice(1)
                : 'Code'}
            </span>
            <CopyButton
              size="icon"
              variant="ghost"
              className=""
              value={() => NodeApi.string(element)}
            />
          </div>
          <pre className="overflow-x-auto p-8 pr-4 font-mono text-sm leading-[normal] [tab-size:2] print:break-inside-avoid">
            <code>{children}</code>
          </pre>
        </div>
      </PlateElement>
    );
  }
);

function CopyButton({
  showLabel = false,
  value,
  ...props
}: { value: (() => string) | string; showLabel?: boolean } & Omit<
  React.ComponentProps<typeof Button>,
  'value'
>) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <button
      onClick={() => {
        void navigator.clipboard.writeText(
          typeof value === 'function' ? value() : value
        );
        setHasCopied(true);
      }}
      {...props}
      className={cn(
        'group/button flex cursor-pointer flex-row items-center gap-2',
        props.className
      )}
    >
      {hasCopied ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M14.2508 1.66797H10.7508C8.18155 1.66797 6.9766 2.57971 6.72557 4.78381C6.67305 5.24492 7.05494 5.6263 7.51903 5.6263H9.25078C12.7508 5.6263 14.3758 7.2513 14.3758 10.7513V12.483C14.3758 12.9471 14.7572 13.329 15.2183 13.2765C17.4224 13.0255 18.3341 11.8205 18.3341 9.2513V5.7513C18.3341 2.83464 17.1674 1.66797 14.2508 1.66797Z"
            fill="#195AF4"
          />
          <path
            d="M9.2513 6.66797H5.7513C2.83464 6.66797 1.66797 7.83464 1.66797 10.7513V14.2513C1.66797 17.168 2.83464 18.3346 5.7513 18.3346H9.2513C12.168 18.3346 13.3346 17.168 13.3346 14.2513V10.7513C13.3346 7.83464 12.168 6.66797 9.2513 6.66797ZM10.243 11.3763L7.1513 14.468C7.03464 14.5846 6.88464 14.643 6.7263 14.643C6.56797 14.643 6.41797 14.5846 6.3013 14.468L4.7513 12.918C4.51797 12.6846 4.51797 12.3096 4.7513 12.0763C4.98464 11.843 5.35964 11.843 5.59297 12.0763L6.71797 13.2013L9.39297 10.5263C9.6263 10.293 10.0013 10.293 10.2346 10.5263C10.468 10.7596 10.4763 11.143 10.243 11.3763Z"
            fill="#195AF4"
          />
          <path
            d="M7.15703 14.4721L10.2487 11.3805C10.482 11.1471 10.4737 10.7638 10.2404 10.5305C10.007 10.2971 9.63203 10.2971 9.3987 10.5305L6.7237 13.2055L5.5987 12.0805C5.36536 11.8471 4.99036 11.8471 4.75703 12.0805C4.5237 12.3138 4.5237 12.6888 4.75703 12.9221L6.30703 14.4721C6.4237 14.5888 6.5737 14.6471 6.73203 14.6471C6.89036 14.6471 7.04036 14.5888 7.15703 14.4721Z"
            fill="#F2F2F2"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M13.0039 10.675V13.825C13.0039 16.45 11.9539 17.5 9.32891 17.5H6.17891C3.55391 17.5 2.50391 16.45 2.50391 13.825V10.675C2.50391 8.05 3.55391 7 6.17891 7H9.32891C11.9539 7 13.0039 8.05 13.0039 10.675Z"
            stroke="#9AA6B5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="group-hover/button:stroke-foreground"
          />
          <path
            d="M17.5039 6.175V9.325C17.5039 11.95 16.4539 13 13.8289 13H13.0039V10.675C13.0039 8.05 11.9539 7 9.32891 7H7.00391V6.175C7.00391 3.55 8.05391 2.5 10.6789 2.5H13.8289C16.4539 2.5 17.5039 3.55 17.5039 6.175Z"
            stroke="#9AA6B5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="group-hover/button:stroke-foreground"
          />
        </svg>
      )}
      <span className="text-secondary group-hover/button:text-foreground text-sm leading-5">
        Копировать код
      </span>
    </button>
  );
}
