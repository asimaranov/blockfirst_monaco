import { UserAvatar } from './UserAvatar';
import CommentsEditor from './CommentsEditor';
import CommentsList from './CommentsList';

export default function CommentsSection() {
  return (
    <div className="flex flex-col">
      <div className="flex px-16 pt-16 pb-16 w-full">
        <div className="flex flex-row gap-3 flex-grow">
          <UserAvatar />
          <CommentsEditor />
        </div>
      </div>
      <CommentsList />
    </div>
  );
}
