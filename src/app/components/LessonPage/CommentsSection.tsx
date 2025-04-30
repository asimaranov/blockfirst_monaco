import { UserAvatar } from './UserAvatar';
import CommentsEditor from './CommentsEditor';
import CommentsList from './CommentsList';
import { getServerSession } from '~/server/auth';

export default async function CommentsSection() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col">
      {session ? (
        <div className="flex w-full px-16 pt-16 pb-16">
          <div className="flex flex-grow flex-row gap-3">
            <UserAvatar />
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
