import Image from 'next/image';
import AuthorIcon from '../assets/author-icon.png';

// Component for the mobile author info section
export default function MobileAuthorInfo () {
  return (
    <div className="border-accent flex flex-row items-center gap-2 border-t px-5 pt-10 pb-4 sm:hidden">
      <Image src={AuthorIcon} alt="Author" className="h-5 w-5" />
      <div className="flex flex-1 flex-col text-sm font-medium">
        Андрей Симаранов
      </div>
      <span className="text-secondary/50 text-sm">Автор курса</span>
    </div>
  );
};
