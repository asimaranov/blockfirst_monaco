import Image from 'next/image';
import React from 'react';
import { cn } from '~/helpers';

interface AuthorInfoProps {
  author: string;
  avatarUrl: string;
  label?: string;
  className?: string;
}

export function AuthorInfo({
  author,
  avatarUrl,
  label = 'Автор курса',
  className,
}: AuthorInfoProps) {
  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <div className="flex flex-row items-center justify-end gap-2 text-sm leading-4 pb-0.5">
        <Image src={avatarUrl} alt={author} width={16} height={16} className='h-4 w-4' />
        {author}
      </div>
      <span className="font-roboto text-secondary text-xs opacity-50 leading-3.5">
        {label}
      </span>
    </div>
  );
}
