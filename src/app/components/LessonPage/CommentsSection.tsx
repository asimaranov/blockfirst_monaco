import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { UserAvatar } from './UserAvatar';



export default function CommentsSection() {
  
  return <div className="pt-16 px-16">
    <div className="flex flex-row">
      <div>
        <UserAvatar />
      </div>

    </div>
  </div>;
}
