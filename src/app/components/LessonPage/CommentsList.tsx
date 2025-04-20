import { cn } from '@udecode/cn';
import { motion } from 'motion/react';
import { DropDownSelector } from '../shared/DropDownSelector';
import { useState } from 'react';
// Placeholder Icons (Simple SVGs)
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={`h-3.5 w-3.5 ${className}`}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.9165 5.25L6.99984 9.33333L11.0832 5.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.41203 13.8731C8.18536 13.9531 7.81203 13.9531 7.58536 13.8731C5.65203 13.2131 1.33203 10.4597 1.33203 5.79307C1.33203 3.73307 2.99203 2.06641 5.0387 2.06641C6.25203 2.06641 7.32536 2.65307 7.9987 3.55974C8.67203 2.65307 9.75203 2.06641 10.9587 2.06641C13.0054 2.06641 14.6654 3.73307 14.6654 5.79307C14.6654 10.4597 10.3454 13.2131 8.41203 13.8731Z"
      stroke="#9AA6B5"
      className="group-hover:stroke-foreground"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const HeartFilledIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={'h-4 w-4'}
  >
    <path
      d="M10.9587 2.06641C9.75203 2.06641 8.67203 2.65307 7.9987 3.55307C7.32536 2.65307 6.24536 2.06641 5.0387 2.06641C2.99203 2.06641 1.33203 3.73307 1.33203 5.79307C1.33203 6.58641 1.4587 7.31974 1.6787 7.99974C2.73203 11.3331 5.9787 13.3264 7.58536 13.8731C7.81203 13.9531 8.18536 13.9531 8.41203 13.8731C10.0187 13.3264 13.2654 11.3331 14.3187 7.99974C14.5387 7.31974 14.6654 6.58641 14.6654 5.79307C14.6654 3.73307 13.0054 2.06641 10.9587 2.06641Z"
      fill="#CF3336"
      className="group-hover:fill-error/50"
    />
  </svg>
);

const CommentIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${className}`}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 8.56376 2.61914 9.1415 2.79061 9.67774L2.79455 9.69007C2.99684 10.3227 3.15365 10.8131 3.25695 11.1903C3.35739 11.5571 3.42583 11.8782 3.41211 12.1483C3.40275 12.3324 3.39238 12.4064 3.35076 12.586C3.2928 12.836 3.17778 13.0734 3.02771 13.3294C2.99581 13.3838 2.96139 13.4406 2.92447 13.5H8C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.58778 13.7169C1.53241 13.7974 1.5 13.8949 1.5 14C1.5 14.2761 1.72386 14.5 2 14.5H8C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 8.69811 1.64625 9.38225 1.83811 9.9823C2.04516 10.6298 2.19542 11.1001 2.29246 11.4544C2.39301 11.8216 2.41815 12.0039 2.41339 12.0976C2.40957 12.1728 2.40687 12.204 2.40321 12.23C2.39956 12.2561 2.39359 12.2868 2.37659 12.3602C2.35231 12.4649 2.29597 12.6003 2.16501 12.8237C2.03415 13.0469 1.84953 13.3243 1.58778 13.7169ZM4.83333 6.66667C4.83333 6.39052 5.05719 6.16667 5.33333 6.16667H10.6667C10.9428 6.16667 11.1667 6.39052 11.1667 6.66667C11.1667 6.94281 10.9428 7.16667 10.6667 7.16667H5.33333C5.05719 7.16667 4.83333 6.94281 4.83333 6.66667ZM5.33333 8.83333C5.05719 8.83333 4.83333 9.05719 4.83333 9.33333C4.83333 9.60948 5.05719 9.83333 5.33333 9.83333H8C8.27614 9.83333 8.5 9.60948 8.5 9.33333C8.5 9.05719 8.27614 8.83333 8 8.83333H5.33333Z"
      fill="#9AA6B5"
      className="group-hover:fill-foreground"
    />
  </svg>
);

const ReplyIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${className}`}
  >
    <path
      d="M9.90527 13.0029C9.61304 13.265 9.25372 13.1624 9.13086 12.8633L9.10938 12.8008C9.10261 12.7763 9.09785 12.7477 9.09473 12.7119L9.09082 12.5791V12.5781L9.09375 10.6338V10.6328C9.09409 10.5836 9.10041 10.3711 8.94141 10.2012C8.78376 10.0329 8.57313 10.0247 8.51953 10.0215V10.0205C6.22478 9.87672 4.30486 9.02592 2.7998 7.35547L2.50391 7.01074C1.71729 6.04444 1.23543 4.94177 1.04883 3.71094C1.21043 3.91578 1.40252 4.08423 1.59473 4.22754L1.78613 4.36328H1.78711C2.5181 4.86011 3.3215 5.15646 4.12012 5.37598L4.46191 5.46582H4.46289C5.63621 5.76085 6.8232 5.90016 8.01074 5.95215L8.52051 5.96973C8.58151 5.97115 8.68044 5.96576 8.78418 5.91895C8.90745 5.86317 9.00021 5.76471 9.0498 5.64453C9.09032 5.54631 9.09173 5.45777 9.0918 5.42871C9.09183 5.41103 9.09102 5.39421 9.09082 5.38867V3.39355C9.09201 3.09862 9.22672 2.93058 9.42383 2.87207L9.51172 2.85352C9.64714 2.83587 9.76563 2.87432 9.89453 2.99414H9.89551C11.1611 4.17168 12.4281 5.33339 13.6709 6.51855L14.9043 7.71289H14.9053C15.0513 7.85668 15.0755 8.06103 14.9512 8.23633L14.8887 8.30957C14.1841 9.00357 13.4675 9.68499 12.7451 10.3623L10.5645 12.3916L9.90527 13.0029Z"
      stroke="#195AF4"
      stroke-width="0.9375"
      className="group-hover:stroke-primary/50"
    />
  </svg>
);

const MoreIcon = ({ className }: { className?: string }) => (
  <svg
    className={`h-4 w-4 ${className}`}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="13" cy="8" r="1.5" />
  </svg>
);

interface Comment {
  id: string;
  author: string;
  avatarInitial: string;
  timestamp: string;
  text: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

// Dummy Data for Comments
const commentsData: Comment[] = [
  {
    id: '1',
    author: 'Андрей',
    avatarInitial: 'А',
    timestamp: '17 Апреля, 13:59',
    text: 'Поздравляю с успешным завершением курсов по Solidity на платформе BlockFirst! Это отличный шаг в мир разработки смарт-контрактов и блокчейн-технологий.',
    likes: 481,
    replies: 21,
    isLiked: false,
  },
  {
    id: '2',
    author: 'Елена',
    avatarInitial: 'Е',
    timestamp: '18 Апреля, 09:15',
    text: 'Отличный курс! Много полезной информации и практических заданий.',
    likes: 123,
    replies: 5,
    isLiked: true,
  },
  {
    id: '3',
    author: 'Максим',
    avatarInitial: 'М',
    timestamp: '18 Апреля, 11:02',
    text: 'Присоединяюсь к поздравлениям! Курс действительно стоящий.',
    likes: 98,
    replies: 2,
    isLiked: false,
  },
];

// Comment Item Component
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div>
      <div className="flex flex-row gap-5">
        <div className="bg-accent text-foreground flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-medium">
          {comment.avatarInitial}
        </div>
        <div className="mb-1 flex items-center gap-3">
          <span className="text-foreground text-base font-medium">
            {comment.author}
          </span>
          <span className="text-secondary/50 text-sm">
            {comment.timestamp}
          </span>{' '}
        </div>
      </div>
      <div className="flex flex-grow flex-col px-15">
        <p className="text-foreground mb-3 py-1 text-sm">{comment.text}</p>

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm">
          <button
            className={cn('group flex cursor-pointer items-center gap-1')}
          >
            {comment.isLiked ? <HeartFilledIcon /> : <HeartIcon />}
            <span
              className={cn(
                'text-secondary group-hover:text-foreground',
                comment.isLiked && 'text-error group-hover:text-error/50'
              )}
            >
              {comment.likes}
            </span>
          </button>
          <button className="text-secondary group flex cursor-pointer items-center gap-1">
            <CommentIcon />
            <span className="text-secondary group-hover:text-foreground">
              {comment.replies}
            </span>
          </button>
          <button className="group flex cursor-pointer items-center gap-1">
            <ReplyIcon />
            <span className="text-primary group-hover:text-primary/50">
              Ответить
            </span>
          </button>
          <button className="text-secondary group cursor-pointer w-6.5 hover:bg-[#1D2026] flex items-center justify-center rounded-[0.2083vw]">
            <MoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommentsList() {
  // Use the dummy data count for the header
  const commentCount = commentsData.length;
  const [sort, setSort] = useState('new');
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full px-16 pb-16">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-foreground text-2xl font-medium">
            Комментарии
          </div>
          <div className="border-secondary/50 text-secondary font-delight rounded-[100px] border px-3 py-1 text-xs leading-3.75">
            {commentCount}
          </div>
        </div>
        <DropDownSelector
          value={sort}
          onChange={(value) => setSort(value)}
          options={[
            { label: 'Новые', value: 'new' },
            { label: 'Популярные', value: 'popular' },
            { label: 'Старые', value: 'old' },
          ]}
        />
      </div>
      {/* Comments Container */}
      <div className="flex flex-col gap-8 pb-16">
        {/* Spacing between comment items, estimating 32px -> gap-8 */}
        {commentsData.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          className={cn(
            'border-primary hover:bg-primary flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm leading-5',
            loading &&
              'cursor-default border-[#1242B2] bg-[#1242B2] hover:bg-[#1242B2]'
          )}
          disabled={loading}
          onClick={() => setLoading(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('h-5 w-5', loading && 'animate-spin')}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 10C3 6.13516 6.11172 3 10 3C12.3136 3 14.0468 3.96629 15.1909 4.91968C15.4687 5.15117 15.7127 5.38261 15.9231 5.60053V3.89744C15.9231 3.60005 16.1642 3.35897 16.4615 3.35897C16.7589 3.35897 17 3.60005 17 3.89744V7.1282C17 7.42559 16.7589 7.66667 16.4615 7.66667H13.5897C13.2924 7.66667 13.0513 7.42559 13.0513 7.1282C13.0513 6.83082 13.2924 6.58974 13.5897 6.58974H15.372C15.1431 6.33271 14.8528 6.0398 14.5014 5.74699C13.4917 4.90551 11.9941 4.07692 10 4.07692C6.70879 4.07692 4.07692 6.72763 4.07692 10C4.07692 10.2974 3.83585 10.5385 3.53846 10.5385C3.24108 10.5385 3 10.2974 3 10ZM16.4615 9.46154C16.7589 9.46154 17 9.70262 17 10C17 13.866 13.866 17 10 17C8.02888 17 6.46913 16.0093 5.4283 15.0656C5.1927 14.852 4.98122 14.6386 4.79487 14.4362V16.1026C4.79487 16.3999 4.55379 16.641 4.25641 16.641C3.95903 16.641 3.71795 16.3999 3.71795 16.1026V12.8718C3.71795 12.5744 3.95903 12.3333 4.25641 12.3333H7.1745C7.47188 12.3333 7.71296 12.5744 7.71296 12.8718C7.71296 13.1692 7.47188 13.4103 7.1745 13.4103H5.32582C5.54647 13.6717 5.82328 13.97 6.15166 14.2678C7.09047 15.1189 8.40251 15.9231 10 15.9231C13.2712 15.9231 15.9231 13.2712 15.9231 10C15.9231 9.70262 16.1642 9.46154 16.4615 9.46154Z"
              fill="#F2F2F2"
            />
          </svg>
          {loading ? 'Загружаем' : 'Больше комментариев'}
        </button>
      </div>
    </div>
  );
}
