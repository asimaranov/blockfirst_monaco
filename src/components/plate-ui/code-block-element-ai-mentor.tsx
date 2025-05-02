'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { NodeApi } from '@udecode/plate';
import { formatCodeBlock, isLangSupported } from '@udecode/plate-code-block';
import { PlateElement } from '@udecode/plate/react';
import { BracesIcon, CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from './button';
import { CodeBlockCombobox } from './code-block-combobox';

export const CodeBlockElementAiMentor = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        className={cn(
          className,
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
          '**:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28]'
        )}
        {...props}
      >
        <div className="bg-muted/50 relative rounded-md">
          <div className="border-accent top-1 right-1 z-10 flex w-full justify-between gap-0.5 rounded-t-[0.4167vw] border-t border-r border-l bg-[#14171C] px-4 py-2 select-none">
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
          <pre className="overflow-x-auto p-8 pr-4 font-mono text-sm leading-[normal] [tab-size:2] print:break-inside-avoid border-accent border-b border-r border-l rounded-b-[0.4167vw]">
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
        'group/button flex cursor-pointer flex-row items-center gap-2 opacity-50 hover:opacity-100',
        props.className
      )}
    >
      {hasCopied ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M11.3998 1.32812H8.59984C6.54446 1.32812 5.5805 2.05752 5.37967 3.8208C5.33766 4.18969 5.64317 4.49479 6.01445 4.49479H7.39984C10.1998 4.49479 11.4998 5.79479 11.4998 8.59479V9.98019C11.4998 10.3515 11.8049 10.657 12.1738 10.615C13.9371 10.4141 14.6665 9.45018 14.6665 7.39479V4.59479C14.6665 2.26146 13.7332 1.32812 11.3998 1.32812Z"
            fill="#195AF4"
          />
          <path
            d="M7.4026 5.32812H4.6026C2.26927 5.32812 1.33594 6.26146 1.33594 8.59479V11.3948C1.33594 13.7281 2.26927 14.6615 4.6026 14.6615H7.4026C9.73594 14.6615 10.6693 13.7281 10.6693 11.3948V8.59479C10.6693 6.26146 9.73594 5.32812 7.4026 5.32812ZM8.19594 9.09479L5.7226 11.5681C5.62927 11.6615 5.50927 11.7081 5.3826 11.7081C5.25594 11.7081 5.13594 11.6615 5.0426 11.5681L3.8026 10.3281C3.61594 10.1415 3.61594 9.84146 3.8026 9.65479C3.98927 9.46812 4.28927 9.46812 4.47594 9.65479L5.37594 10.5548L7.51594 8.41479C7.7026 8.22813 8.0026 8.22813 8.18927 8.41479C8.37594 8.60146 8.3826 8.90812 8.19594 9.09479Z"
            fill="#195AF4"
          />
          <path
            d="M5.72406 11.5746L8.1974 9.10125C8.38406 8.91458 8.3774 8.60792 8.19073 8.42125C8.00406 8.23458 7.70406 8.23458 7.5174 8.42125L5.3774 10.5612L4.4774 9.66125C4.29073 9.47458 3.99073 9.47458 3.80406 9.66125C3.6174 9.84792 3.6174 10.1479 3.80406 10.3346L5.04406 11.5746C5.1374 11.6679 5.2574 11.7146 5.38406 11.7146C5.51073 11.7146 5.63073 11.6679 5.72406 11.5746Z"
            fill="#F2F2F2"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4034_29435)">
            <path
              d="M10.4 8.54156V11.0616C10.4 13.1616 9.56 14.0016 7.46 14.0016H4.94C2.84 14.0016 2 13.1616 2 11.0616V8.54156C2 6.44156 2.84 5.60156 4.94 5.60156H7.46C9.56 5.60156 10.4 6.44156 10.4 8.54156Z"
              stroke="#9AA6B5"
              stroke-width="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0016 4.94781V7.46781C14.0016 9.56781 13.1616 10.4078 11.0616 10.4078H10.4016V8.54781C10.4016 6.44781 9.56156 5.60781 7.46156 5.60781H5.60156V4.94781C5.60156 2.84781 6.44156 2.00781 8.54156 2.00781H11.0616C13.1616 2.00781 14.0016 2.84781 14.0016 4.94781Z"
              stroke="#9AA6B5"
              stroke-width="0.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4034_29435">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <span className="text-secondary text-xs leading-5">Копировать код</span>
    </button>
  );
}
