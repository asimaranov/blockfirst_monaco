import Image from 'next/image';
import React from 'react';

interface AuthorInfoProps {
  author: string;
  avatarUrl: string;
  label?: string;
}

export function AuthorInfo({
  author,
  avatarUrl,
  label = 'Автор курса',
}: AuthorInfoProps) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-row items-center justify-end gap-2 text-sm leading-4 pb-[1px]">
        <Image src={avatarUrl} alt={author} width={16} height={16} />
        {author}
      </div>
      <span className="font-roboto text-secondary text-xs opacity-50 leading-3.5">
        {label}
      </span>
    </div>
  );
}
