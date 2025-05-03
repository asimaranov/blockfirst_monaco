import React from 'react';
import { format } from 'date-fns';
import { authClient } from '~/server/auth/client';

interface UserMessageItemProps {
  message: {
    content: string;
    timestamp: Date;
  };
}

const UserMessageItem: React.FC<UserMessageItemProps> = ({ message }) => {
  const { data: session } = authClient.useSession();

  // Format date for display
  const formatMessageDate = (date: Date) => {
    return format(new Date(date), 'dd MMMM, HH:mm');
  };

  return (
    <div className="flex flex-row gap-4 self-end">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4">
          <span className="ml-20 w-fit self-end rounded-[0.4167vw] bg-[#14171C] px-4 py-2 text-sm">
            {message.content}
          </span>
          <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full text-base">
            {session?.user?.name?.slice(0, 1)}
          </div>
        </div>
        <span className="text-secondary/50 mr-13 self-end text-xs">
          {formatMessageDate(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default UserMessageItem;
