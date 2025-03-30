import {
  Topbar as UnifiedTopbar,
  BackButton,
  AuthorInfo,
} from '~/app/components/shared/Topbar';

export function Topbar({
  courseAuthor,
  courseAuthorAvatar,
}: {
  courseAuthor: string;
  courseAuthorAvatar: string;
}) {
  return (
    <UnifiedTopbar
      leftContent={<BackButton href="/dashboard" label="Подробности курса" />}
      rightContent={
        <AuthorInfo author={courseAuthor} avatarUrl={courseAuthorAvatar} className='hidden sm:flex' />
      }
    />
  );
}
