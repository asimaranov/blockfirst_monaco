'use server';
import { UserAvatar } from './UserAvatar';
import CommentsEditor from './CommentsEditor';
import CommentsList from './CommentsList';
import { getServerSession } from '~/server/auth';

export default async function CommentsSection({
  lessonId,
}: {
  lessonId: string;
}) {
  const session = await getServerSession();

  return (
    <div className="flex flex-col">
      {session ? (
        <div className="flex w-full px-5 pt-16 pb-16 sm:px-16">
          <div className="flex w-full max-w-full grow-0 flex-row gap-5">
            <UserAvatar className="hidden shrink-0 sm:flex" />
            <CommentsEditor lessonId={lessonId} />
          </div>
        </div>
      ) : (
        <div className="h-16"></div>
      )}
      <CommentsList lessonId={lessonId} />
    </div>
  );
}
