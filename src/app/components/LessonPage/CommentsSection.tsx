import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { UserAvatar } from './UserAvatar';
import { useCreateEditor } from './PlateComment';
import CommentsEditor from './CommentsEditor';
import CommentsList from './CommentsList';
import { useState } from 'react';
import type { Value } from '@udecode/plate';
import { cn } from '~/lib/utils';
import { PlateController } from '@udecode/plate/react';

export default function CommentsSection() {

  return (
    <div className="flex flex-col">
      <div className="flex px-16 pt-16 pb-16">
        <div className="flex flex-row">
          <div>
            <UserAvatar />
          </div>
          <CommentsEditor />
        </div>
      </div>
        <CommentsList />
    </div>
  );
}
