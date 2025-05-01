import { UserAvatar } from './UserAvatar';
import CommentsEditor from './CommentsEditor';
import CommentsList from './CommentsList';
import { getServerSession } from '~/server/auth';

export default async function CommentsSection() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col">
      {session ? (
        <div className="flex w-full px-5 pt-16 pb-16 sm:px-16">
          <div className="flex w-full flex-row gap-3">
            <UserAvatar className="hidden sm:flex shrink-0" />
            <CommentsEditor />
          </div>
        </div>
      ) : (
        <div className="h-16"></div>
      )}
      <CommentsList />
    </div>
  );
}
