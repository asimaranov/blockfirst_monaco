'use client';

import { cn } from '@udecode/cn';
import { AnimatePresence, motion } from 'motion/react';
import { DropDownSelector } from '../shared/DropDownSelector';
import { useCallback, useEffect, useState } from 'react';
import DropDownAction from '../shared/DropDownAction';
import CommentsEditor from './CommentsEditor';
import { PlateController } from '@udecode/plate/react';
import Image from 'next/image';
import { api } from '~/trpc/react';
import { authClient } from '~/server/auth/client';
import { redirect, useParams, useRouter } from 'next/navigation';
import { formatRelativeTime } from '~/app/lib/utils';
import PlateEditor from './PlateEditor';

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={'h-4 w-4'}
  >
    <path
      d="M8.41203 13.8731C8.18536 13.9531 7.81203 13.9531 7.58536 13.8731C5.65203 13.2131 1.33203 10.4597 1.33203 5.79307C1.33203 3.73307 2.99203 2.06641 5.0387 2.06641C6.25203 2.06641 7.32536 2.65307 7.9987 3.55974C8.67203 2.65307 9.75203 2.06641 10.9587 2.06641C13.0054 2.06641 14.6654 3.73307 14.6654 5.79307C14.6654 10.4597 10.3454 13.2131 8.41203 13.8731Z"
      stroke="#9AA6B5"
      className="group-hover:stroke-foreground"
      strokeLinecap="round"
      strokeLinejoin="round"
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

const CommentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={'h-4 w-4'}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 8.56376 2.61914 9.1415 2.79061 9.67774L2.79455 9.69007C2.99684 10.3227 3.15365 10.8131 3.25695 11.1903C3.35739 11.5571 3.42583 11.8782 3.41211 12.1483C3.40275 12.3324 3.39238 12.4064 3.35076 12.586C3.2928 12.836 3.17778 13.0734 3.02771 13.3294C2.99581 13.3838 2.96139 13.4406 2.92447 13.5H8C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.58778 13.7169C1.53241 13.7974 1.5 13.8949 1.5 14C1.5 14.2761 1.72386 14.5 2 14.5H8C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 8.69811 1.64625 9.38225 1.83811 9.9823C2.04516 10.6298 2.19542 11.1001 2.29246 11.4544C2.39301 11.8216 2.41815 12.0039 2.41339 12.0976C2.40957 12.1728 2.40687 12.204 2.40321 12.23C2.39956 12.2561 2.39359 12.2868 2.37659 12.3602C2.35231 12.4649 2.29597 12.6003 2.16501 12.8237C2.03415 13.0469 1.84953 13.3243 1.58778 13.7169ZM4.83333 6.66667C4.83333 6.39052 5.05719 6.16667 5.33333 6.16667H10.6667C10.9428 6.16667 11.1667 6.39052 11.1667 6.66667C11.1667 6.94281 10.9428 7.16667 10.6667 7.16667H5.33333C5.05719 7.16667 4.83333 6.94281 4.83333 6.66667ZM5.33333 8.83333C5.05719 8.83333 4.83333 9.05719 4.83333 9.33333C4.83333 9.60948 5.05719 9.83333 5.33333 9.83333H8C8.27614 9.83333 8.5 9.60948 8.5 9.33333C8.5 9.05719 8.27614 8.83333 8 8.83333H5.33333Z"
      fill="#9AA6B5"
      className="group-hover:fill-foreground"
    />
  </svg>
);

const ReplyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={'h-4 w-4'}
  >
    <path
      d="M9.90527 13.0029C9.61304 13.265 9.25372 13.1624 9.13086 12.8633L9.10938 12.8008C9.10261 12.7763 9.09785 12.7477 9.09473 12.7119L9.09082 12.5791V12.5781L9.09375 10.6338V10.6328C9.09409 10.5836 9.10041 10.3711 8.94141 10.2012C8.78376 10.0329 8.57313 10.0247 8.51953 10.0215V10.0205C6.22478 9.87672 4.30486 9.02592 2.7998 7.35547L2.50391 7.01074C1.71729 6.04444 1.23543 4.94177 1.04883 3.71094C1.21043 3.91578 1.40252 4.08423 1.59473 4.22754L1.78613 4.36328H1.78711C2.5181 4.86011 3.3215 5.15646 4.12012 5.37598L4.46191 5.46582H4.46289C5.63621 5.76085 6.8232 5.90016 8.01074 5.95215L8.52051 5.96973C8.58151 5.97115 8.68044 5.96576 8.78418 5.91895C8.90745 5.86317 9.00021 5.76471 9.0498 5.64453C9.09032 5.54631 9.09173 5.45777 9.0918 5.42871C9.09183 5.41103 9.09102 5.39421 9.09082 5.38867V3.39355C9.09201 3.09862 9.22672 2.93058 9.42383 2.87207L9.51172 2.85352C9.64714 2.83587 9.76563 2.87432 9.89453 2.99414H9.89551C11.1611 4.17168 12.4281 5.33339 13.6709 6.51855L14.9043 7.71289H14.9053C15.0513 7.85668 15.0755 8.06103 14.9512 8.23633L14.8887 8.30957C14.1841 9.00357 13.4675 9.68499 12.7451 10.3623L10.5645 12.3916L9.90527 13.0029Z"
      stroke="#195AF4"
      strokeWidth="0.9375"
      className="group-hover:stroke-primary/50"
    />
  </svg>
);

const MoreIcon = () => (
  <svg
    className={'group-data-[active=true]/button:fill-foreground h-4 w-4'}
    viewBox="0 0 16 16"
    fill="#9AA6B5"
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
  isSelf?: boolean;
  avatarInitial: string;
  timestamp: string;
  text: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  answers?: Comment[];
  images?: {
    id: string;
    url: string;
  }[];
  _id?: string;
  __v?: number;
  [key: string]: any; // Allow additional properties from server
}

const DeleteIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25646 0.726687L6.19299 0.726624C5.89397 0.726177 5.63153 0.725785 5.39768 0.817758C5.1932 0.898179 5.01218 1.02865 4.87122 1.19721C4.71002 1.38997 4.6274 1.63907 4.53326 1.92289L4.53326 1.92289L4.51325 1.98312L4.34873 2.47669H2.33073H1.16406C0.922438 2.47669 0.726562 2.67256 0.726562 2.91419C0.726562 3.15581 0.922438 3.35169 1.16406 3.35169H1.91821L2.27061 9.34244L2.2717 9.36103C2.30715 9.96373 2.33528 10.442 2.38888 10.8272C2.44376 11.2216 2.5294 11.5541 2.69915 11.8559C2.97512 12.3465 3.39397 12.7415 3.89995 12.9881C4.21121 13.1399 4.54813 13.2059 4.94509 13.2375C5.33272 13.2684 5.81177 13.2684 6.41541 13.2684H6.41543H6.41545H6.41559H6.43424H7.56055H7.57921H7.57934H7.57936H7.57939C8.18302 13.2684 8.66207 13.2684 9.04971 13.2375C9.44667 13.2059 9.78358 13.1399 10.0948 12.9881C10.6008 12.7415 11.0197 12.3465 11.2956 11.8559C11.4654 11.5541 11.551 11.2216 11.6059 10.8272C11.6595 10.442 11.6876 9.96373 11.7231 9.36103V9.36102V9.361V9.36099L11.7242 9.34244L12.0766 3.35169H12.8307C13.0724 3.35169 13.2682 3.15581 13.2682 2.91419C13.2682 2.67256 13.0724 2.47669 12.8307 2.47669H11.6641H9.64606L9.48154 1.98312L9.46153 1.92289C9.3674 1.63908 9.28477 1.38997 9.12357 1.19721C8.98261 1.02865 8.8016 0.898179 8.59712 0.817758C8.36326 0.725785 8.10082 0.726177 7.8018 0.726624L7.73833 0.726687H6.25646ZM9.32052 3.35169C9.32727 3.35184 9.33403 3.35185 9.34081 3.35169H11.2001L10.8507 9.29106C10.8139 9.91649 10.7875 10.36 10.7393 10.7066C10.6918 11.048 10.6272 11.2594 10.533 11.4269C10.3442 11.7626 10.0576 12.0329 9.7114 12.2016C9.53863 12.2859 9.32378 12.3379 8.98022 12.3652C8.63136 12.393 8.18707 12.3934 7.56055 12.3934H6.43424C5.80773 12.3934 5.36344 12.393 5.01457 12.3652C4.67101 12.3379 4.45616 12.2859 4.28339 12.2016C3.93719 12.0329 3.65061 11.7626 3.46179 11.4269C3.36756 11.2594 3.30302 11.048 3.25553 10.7066C3.2073 10.36 3.18089 9.91649 3.1441 9.29106L2.79472 3.35169H4.65398C4.66076 3.35185 4.66752 3.35184 4.67427 3.35169H9.32052ZM8.72373 2.47669L8.65144 2.25982C8.52489 1.88017 8.49267 1.80674 8.45234 1.75853C8.40536 1.70234 8.34502 1.65885 8.27686 1.63204C8.21837 1.60904 8.13852 1.60169 7.73833 1.60169H6.25646C5.85628 1.60169 5.77642 1.60904 5.71793 1.63204C5.64977 1.65885 5.58943 1.70234 5.54245 1.75853C5.50213 1.80674 5.4699 1.88017 5.34335 2.25982L5.27106 2.47669H8.72373ZM6.26823 5.83085C6.26823 5.58923 6.07235 5.39335 5.83073 5.39335C5.58911 5.39335 5.39323 5.58923 5.39323 5.83085V9.91419C5.39323 10.1558 5.58911 10.3517 5.83073 10.3517C6.07235 10.3517 6.26823 10.1558 6.26823 9.91419V5.83085ZM8.16406 5.39335C8.40569 5.39335 8.60156 5.58923 8.60156 5.83085V8.16419C8.60156 8.40581 8.40569 8.60169 8.16406 8.60169C7.92244 8.60169 7.72656 8.40581 7.72656 8.16419V5.83085C7.72656 5.58923 7.92244 5.39335 8.16406 5.39335Z"
      fill="#CF3336"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0043 1.63196C10.6162 1.07581 11.5505 1.07581 12.1623 1.63196C12.1908 1.65785 12.2211 1.6881 12.2604 1.72739L12.2604 1.72741L12.2677 1.73474L12.275 1.74205L12.2751 1.74209C12.3143 1.78136 12.3446 1.81161 12.3705 1.84009C12.9266 2.45193 12.9266 3.38626 12.3705 3.9981C12.3446 4.02659 12.3143 4.05685 12.275 4.09614L12.2677 4.10345L9.97336 6.39779L9.93047 6.44069L9.93046 6.4407C9.51743 6.8539 9.25067 7.12076 8.92227 7.30669C8.59387 7.49263 8.22779 7.58407 7.66097 7.72566L7.60211 7.74037L6.52278 8.0102C6.37369 8.04747 6.21597 8.00379 6.10731 7.89512C5.99864 7.78646 5.95496 7.62874 5.99223 7.47965L6.26206 6.40032L6.27677 6.34147C6.41836 5.77464 6.5098 5.40856 6.69574 5.08016C6.88168 4.75176 7.14854 4.485 7.56174 4.07196L7.60464 4.02907L9.89897 1.73474L9.90631 1.7274L9.90633 1.72738L9.90642 1.72728C9.94565 1.68805 9.97587 1.65782 10.0043 1.63196ZM6.38376 1.31493L6.41667 1.31493H7C7.24163 1.31493 7.4375 1.5108 7.4375 1.75243C7.4375 1.99405 7.24163 2.18993 7 2.18993H6.41667C5.30436 2.18993 4.51413 2.19086 3.91466 2.27145C3.32778 2.35036 2.98965 2.49833 2.74278 2.7452C2.4959 2.99208 2.34793 3.3302 2.26903 3.91709C2.18843 4.51656 2.1875 5.30678 2.1875 6.41909V7.58576C2.1875 8.69807 2.18843 9.4883 2.26903 10.0878C2.34793 10.6747 2.4959 11.0128 2.74278 11.2597C2.98965 11.5065 3.32778 11.6545 3.91466 11.7334C4.51413 11.814 5.30436 11.8149 6.41667 11.8149H7.58333C8.69565 11.8149 9.48587 11.814 10.0853 11.7334C10.6722 11.6545 11.0104 11.5065 11.2572 11.2597C11.5041 11.0128 11.6521 10.6747 11.731 10.0878C11.8116 9.4883 11.8125 8.69807 11.8125 7.58576V7.00243C11.8125 6.7608 12.0084 6.56493 12.25 6.56493C12.4916 6.56493 12.6875 6.7608 12.6875 7.00243V7.58576V7.61866C12.6875 8.69069 12.6875 9.53981 12.5982 10.2044C12.5062 10.8883 12.3125 11.4418 11.8759 11.8784C11.4394 12.3149 10.8858 12.5087 10.2019 12.6006C9.53739 12.6899 8.68827 12.6899 7.61624 12.6899H7.58333H6.41667H6.38377C5.31174 12.6899 4.46261 12.6899 3.79807 12.6006C3.11416 12.5087 2.5606 12.3149 2.12406 11.8784C1.68751 11.4418 1.49378 10.8883 1.40183 10.2044C1.31248 9.53982 1.31249 8.6907 1.3125 7.61867V7.58576V6.41909V6.38618C1.31249 5.31416 1.31248 4.46504 1.40183 3.8005C1.49378 3.11659 1.68751 2.56303 2.12406 2.12649C2.5606 1.68994 3.11416 1.49621 3.79807 1.40426C4.46261 1.31491 5.31173 1.31492 6.38376 1.31493Z"
      fill="#F2F2F2"
    />
  </svg>
);

const UserAvatar = ({
  avatarInitial,
  isSelf,
  className,
}: {
  avatarInitial: string;
  isSelf: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-accent text-foreground flex size-8 sm:size-10 flex-shrink-0 items-center justify-center rounded-full text-sm leading-5',
      isSelf && 'bg-primary',
      className
    )}
  >
    {avatarInitial}
  </div>
);

// Image Modal Component
const ImageModal = ({
  imageUrl,
  isOpen,
  onClose,
}: {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <button
          className="text-foreground absolute top-4 right-4 cursor-pointer hover:opacity-50 focus:outline-none"
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Image
          src={imageUrl}
          alt="Expanded image"
          className="max-h-[90vh] max-w-[90vw] object-contain"
          width={1000}
          height={1000}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

// Comment Item Component
function CommentItem({
  comment,
  replyFormAfterId,
  setReplyFormAfterId,
  setIsThreadOpened: setIsThreadOpenedExternal,
  className,
  onToggleLike,
  onDeleteComment,
  onEditComment,
}: {
  comment: Comment;
  replyFormAfterId: string | null;
  setReplyFormAfterId: (id: string | null) => void;
  setIsThreadOpened: (isOpened: boolean) => void;
  className?: string;
  onToggleLike: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string) => void;
}) {
  const [isThreadOpened, setIsThreadOpened] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  const handleLikeToggle = useCallback(() => {
    if (!session) {
      redirect('/signin');
      return;
    }
    onToggleLike(comment.id);
  }, [comment.id, session, onToggleLike]);

  const handleDeleteComment = useCallback(() => {
    onDeleteComment(comment.id);
  }, [comment.id, onDeleteComment]);

  const handleEditComment = useCallback(() => {
    onEditComment(comment.id);
  }, [comment.id, onEditComment]);

  return (
    <div className={cn(className)}>
      {/* Image Modal */}
      <ImageModal
        imageUrl={modalImage || ''}
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
      />

      <div className="flex flex-row gap-4 sm:gap-5">
        <UserAvatar
          avatarInitial={comment.avatarInitial}
          isSelf={!!comment.isSelf}
        />
        <div className="flex items-center gap-3">
          <span className="text-foreground text-base font-medium">
            {comment.author}
          </span>
          <span className="text-secondary/50 text-sm">
            {comment.timestamp}
          </span>{' '}
        </div>
      </div>
      <div className="flex flex-grow flex-col pr-0 pl-12 sm:pr-15 sm:pl-15">
        {!(
          comment.content.length == 0 ||
          (comment.content.length == 1 &&
            comment.content[0].type == 'p' &&
            comment.content[0].children[0].text == '')
        ) && (
          <div className="text-foreground mb-3 py-1 text-sm break-all">
            <PlateEditor
              richText={comment.content}
              id={`comment-${comment.id}`}
              isComments={true}
            />
          </div>
        )}
        {comment.images && comment.images.length > 0 && (
          <div className="flex flex-row gap-3 pb-4">
            {comment.images.map((image, i) => (
              <div
                className="group relative h-20 w-20 cursor-pointer"
                key={i}
                onClick={() => setModalImage(image.url)}
              >
                <Image
                  src={image.url}
                  alt={image.id}
                  className="rounded-[0.4167vw] group-hover:brightness-40"
                  fill
                />
                <div className="absolute inset-0 hidden items-center justify-center group-hover:flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M7.66406 9.75H11.8307"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.75 11.8307V7.66406"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.58464 17.5013C13.9569 17.5013 17.5013 13.9569 17.5013 9.58464C17.5013 5.21238 13.9569 1.66797 9.58464 1.66797C5.21238 1.66797 1.66797 5.21238 1.66797 9.58464C1.66797 13.9569 5.21238 17.5013 9.58464 17.5013Z"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3346 18.3346L16.668 16.668"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Actions */}
        <div className="flex items-center gap-6 text-sm">
          <button
            className={cn('group flex cursor-pointer items-center gap-1')}
            onClick={handleLikeToggle}
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
          {isThreadOpened ? (
            <button
              className="hover:text-foreground group flex cursor-pointer flex-row gap-1"
              onClick={() => {
                setIsThreadOpened(false);
                setIsThreadOpenedExternal(false);
                setReplyFormAfterId(null);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-80 group-hover:opacity-100"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.05602 10.7977C3.33876 11.0728 3.79098 11.0666 4.06608 10.7838L8.00201 6.73856L11.9379 10.7838C12.213 11.0666 12.6653 11.0728 12.948 10.7977C13.2307 10.5226 13.2369 10.0703 12.9618 9.7876L8.51395 5.21617C8.37948 5.07797 8.19484 5 8.00201 5C7.80917 5 7.62453 5.07797 7.49006 5.21617L3.04218 9.7876C2.76708 10.0703 2.77328 10.5226 3.05602 10.7977Z"
                  fill="#195AF4"
                />
              </svg>
              <span className="text-secondary group-hover:text-foreground">
                Скрыть
              </span>
            </button>
          ) : (
            <button
              className="text-secondary group flex cursor-pointer items-center gap-1"
              onClick={() => {
                setIsThreadOpened(true);
                setIsThreadOpenedExternal(true);
              }}
            >
              <CommentIcon />
              <span className="text-secondary group-hover:text-foreground">
                {comment.replies}
              </span>
            </button>
          )}

          <button
            className="group flex cursor-pointer items-center gap-1"
            onClick={() => {
              if (!session) {
                redirect('/signin');
              }
              if (replyFormAfterId === comment.id) {
                setReplyFormAfterId(null);
              } else {
                setReplyFormAfterId(comment.id);
              }
            }}
          >
            <ReplyIcon />
            <span className="text-primary group-hover:text-primary/50">
              Ответить
            </span>
          </button>
          {session && (
            <DropDownAction
              header={comment.isSelf ? undefined : 'Пожаловаться'}
              button={
                <div className="text-secondary flex w-6.5 cursor-pointer items-center justify-center rounded-[0.2083vw] group-data-[active=true]/button:bg-[#1D2026] hover:bg-[#1D2026]">
                  <MoreIcon />
                </div>
              }
              options={
                comment.isSelf
                  ? [
                      {
                        label: 'Редактировать',
                        value: 'edit',
                        icon: <EditIcon />,
                        onClick: handleEditComment,
                      },
                      {
                        label: 'Удалить',
                        value: 'delete',
                        icon: <DeleteIcon />,
                        className: 'text-error',
                        onClick: handleDeleteComment,
                      },
                    ]
                  : [
                      { label: 'Спам & Фишинг', value: 'spam' },
                      { label: 'Порнография', value: 'nsfw' },
                      {
                        label: 'Политические высказывания',
                        value: 'political',
                      },
                      { label: 'Оскорбление религии', value: 'religious' },
                      { label: 'Оскорбительное высказывание', value: 'other' },
                    ]
              }
              successBlock={
                comment.isSelf ? undefined : (
                  <div className="flex flex-col items-center justify-center gap-2 pt-9 pb-14">
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8.25"
                    >
                      <rect
                        x="1"
                        y="0.5"
                        width="31"
                        height="31"
                        rx="15.5"
                        stroke="#195AF4"
                      />
                      <path
                        d="M11.043 16.7855L14.163 19.9055L21.963 12.1055"
                        stroke="#F2F2F2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col gap-3 px-5 text-center">
                      <p className="text-base font-medium">Жалоба принята</p>
                      <p className="text-secondary text-xs">
                        Мы проверим этот комментарий на наличие нарушений
                      </p>
                    </div>
                  </div>
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Format comments to ensure they match the expected format
const formatComments = (session: any, comments: any[]): Comment[] => {
  return comments.map((comment: any) => {
    // Convert author object to string if needed
    const authorName =
      typeof comment.author === 'object' ? comment.author.name : comment.author;
    const avatarInitial =
      typeof comment.author === 'object'
        ? comment.author.avatarInitial
        : authorName?.[0]?.toUpperCase() || '';

    // Format answers if they exist
    let answers: Comment[] = [];

    if (
      comment.answers &&
      Array.isArray(comment.answers) &&
      comment.answers.length > 0
    ) {
      answers = formatComments(session, comment.answers);
    }

    return {
      ...comment,
      id: comment.id || comment._id?.toString(),
      author: authorName,
      avatarInitial: avatarInitial,
      timestamp: formatRelativeTime(
        comment.timestamp ||
          new Date(comment.createdAt || Date.now()).toLocaleDateString()
      ),
      likes: comment.likes?.length || 0,
      replies: answers.length,
      isLiked:
        Array.isArray(comment.likes) &&
        comment.likes.includes(session?.user?.id || ''),
      answers,
      isSelf: comment.author.id === session?.user?.id,
    } as Comment;
  });
};

export default function CommentsList({ lessonId }: { lessonId?: string }) {
  // Use params to get lessonId from the URL if not provided as prop
  const params = useParams();
  // Ensure lessonId is always a string
  const commentLessonId =
    lessonId || (params.lessonId ? String(params.lessonId) : 'default-lesson');

  const [sort, setSort] = useState('new');
  const [cursor, setCursor] = useState<string | null>(null);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyToUser, setReplyToUser] = useState<string | null>(null);
  const [replyFormAfterId, setReplyFormAfterId] = useState<string | null>(null);
  const [openedComments, setOpenedComments] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const router = useRouter();

  const { data: session } = authClient.useSession();

  // TRPC queries and mutations
  const commentsQuery = api.comments.getByLessonId.useQuery(
    {
      lessonId: commentLessonId,
      sort: sort as 'new' | 'popular' | 'old',
      cursor,
      limit: 10,
    },
    { enabled: !!commentLessonId }
  );

  // Get total comment count
  const totalCountQuery = api.comments.getTotalCount.useQuery(
    { lessonId: commentLessonId },
    { enabled: !!commentLessonId }
  );

  const createCommentMutation = api.comments.create.useMutation({
    onSuccess: () => {
      // Refresh comments
      void commentsQuery.refetch();
      // Refresh total count
      void totalCountQuery.refetch();
      // Reset form
      setReplyFormAfterId(null);
      setReplyToUser(null);
    },
  });

  const updateCommentMutation = api.comments.update.useMutation({
    onSuccess: () => {
      // Refresh comments
      void commentsQuery.refetch();
      // Reset editing state
      setEditingCommentId(null);
    },
  });

  const toggleLikeMutation = api.comments.toggleLike.useMutation({
    onSuccess: (result, variables) => {
      // Update the comments state directly for an instant UI update
      setAllComments((prevComments) =>
        prevComments.map((c) => {
          // If this is the comment that was liked/unliked
          if (c.id === variables.commentId) {
            return {
              ...c,
              isLiked: result.isLiked,
              likes: result.isLiked ? c.likes + 1 : c.likes - 1,
            };
          }
          // Check if the comment is in the answers of another comment
          if (c.answers && c.answers.length > 0) {
            return {
              ...c,
              answers: c.answers.map((answer) =>
                answer.id === variables.commentId
                  ? {
                      ...answer,
                      isLiked: result.isLiked,
                      likes: result.isLiked
                        ? answer.likes + 1
                        : answer.likes - 1,
                    }
                  : answer
              ),
            };
          }
          return c;
        })
      );
    },
  });

  const deleteCommentMutation = api.comments.delete.useMutation({
    onSuccess: () => {
      // Refresh comments after deletion
      void commentsQuery.refetch();
      // Refresh total count
      void totalCountQuery.refetch();
    },
  });

  // Handle like toggle
  const handleToggleLike = useCallback(
    (commentId: string) => {
      if (!session) {
        redirect('/signin');
        return;
      }
      toggleLikeMutation.mutate({ commentId });
    },
    [session, toggleLikeMutation]
  );

  // Handle delete comment
  const handleDeleteComment = useCallback(
    (commentId: string) => {
      if (confirm('Are you sure you want to delete this comment?')) {
        deleteCommentMutation.mutate({ commentId });
      }
    },
    [deleteCommentMutation]
  );

  // Handle edit comment
  const handleEditComment = useCallback((commentId: string) => {
    setEditingCommentId(commentId);
  }, []);

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    setEditingCommentId(null);
  }, []);

  // Update comments when data changes
  useEffect(() => {
    if (commentsQuery.data) {
      if (cursor === null) {
        // First load or sort change - replace all comments
        setAllComments(
          formatComments(session || '', commentsQuery.data.comments || [])
        );
      } else {
        // Pagination - append new comments
        setAllComments((prev) => [
          ...prev,
          ...formatComments(session, commentsQuery.data.comments || []),
        ]);
      }
      // Update loading state
      setLoading(false);
    }
  }, [commentsQuery.data, cursor, session]);

  // Reset cursor when sort changes, but don't clear comments immediately
  useEffect(() => {
    setCursor(null);
    setLoading(true);
    // Don't reset allComments here, wait for new data to arrive
  }, [sort]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (commentsQuery.data?.nextCursor) {
      setLoading(true);
      setCursor(commentsQuery.data.nextCursor);
    }
  }, [commentsQuery.data?.nextCursor]);

  // Handle submit comment
  const handleSubmitComment = useCallback(
    (content: any[], images?: { id: string; url: string }[]) => {
      if (!session) {
        redirect('/signin');
        return;
      }

      if (replyFormAfterId) {
        // Reply to a comment
        createCommentMutation.mutate({
          lessonId: commentLessonId,
          parentId: replyFormAfterId,
          content,
          images,
        });
      } else {
        // New comment
        createCommentMutation.mutate({
          lessonId: commentLessonId,
          content,
          images,
        });
      }
    },
    [commentLessonId, replyFormAfterId, session, createCommentMutation]
  );

  // Find comment by ID (either in main comments or in answers)
  const findCommentById = useCallback(
    (commentId: string): Comment | undefined => {
      // Check in main comments
      const mainComment = allComments.find((c) => c.id === commentId);
      if (mainComment) return mainComment;

      // Check in answers
      for (const comment of allComments) {
        if (comment.answers && comment.answers.length > 0) {
          const answer = comment.answers.find((a) => a.id === commentId);
          if (answer) return answer;
        }
      }
      return undefined;
    },
    [allComments]
  );

  const commentCount = totalCountQuery.data?.totalCount ?? '...';
  const hasMoreComments = !!commentsQuery.data?.nextCursor;

  return (
    <div className="w-full px-5 pb-16 sm:px-16">
      {/* Image Modal */}
      <ImageModal
        imageUrl={modalImage || ''}
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
      />

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
        {/* Loading state */}
        {commentsQuery.isLoading && !allComments.length && (
          <div className="flex justify-center py-8">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 animate-spin"
            >
              <path
                d="M12 2V6"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V22"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              />
              <path
                d="M4.93 4.93L7.76 7.76"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              />
              <path
                d="M16.24 16.24L19.07 19.07"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-20"
              />
              <path
                d="M2 12H6"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />
              <path
                d="M18 12H22"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0"
              />
              <path
                d="M4.93 19.07L7.76 16.24"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-10"
              />
              <path
                d="M16.24 7.76L19.07 4.93"
                stroke="#9AA6B5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              />
            </svg>
          </div>
        )}

        {/* Empty state */}
        {!commentsQuery.isLoading && !allComments.length && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-secondary mb-2">Нет комментариев</div>
            <div className="text-secondary text-sm">
              Будьте первым, кто оставит комментарий!
            </div>
          </div>
        )}

        {/* Comments List */}
        {allComments.map((comment) => (
          <div key={comment.id} className="">
            {editingCommentId === comment.id ? (
              <div className="flex flex-row gap-5">
                <UserAvatar
                  avatarInitial={comment.avatarInitial}
                  isSelf={!!comment.isSelf}
                />
                <CommentsEditor
                  className="w-175"
                  value={comment.content}
                  id={`edit-comment-${comment.id}`}
                  lessonId={commentLessonId}
                  onCancel={handleCancelEdit}
                  onSubmit={() => {
                    void commentsQuery.refetch();
                    setEditingCommentId(null);
                  }}
                  isEditing={true}
                  commentId={comment.id}
                />
              </div>
            ) : (
              <CommentItem
                comment={comment}
                setReplyFormAfterId={(id) => {
                  setReplyToUser(null);
                  setReplyFormAfterId(id);
                }}
                replyFormAfterId={replyFormAfterId}
                setIsThreadOpened={(isOpened: boolean) => {
                  if (isOpened) {
                    setOpenedComments((prev) => [...prev, comment.id]);
                  } else {
                    setOpenedComments((prev) =>
                      prev.filter((id) => id !== comment.id)
                    );
                  }
                }}
                onToggleLike={handleToggleLike}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
              />
            )}
            <AnimatePresence>
              {replyFormAfterId === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-row gap-5 overflow-hidden pt-8 pl-12 sm:pl-15">
                    <UserAvatar
                      avatarInitial={
                        session?.user?.name?.[0]?.toUpperCase() || 'U'
                      }
                      isSelf={true}
                      className="hidden sm:flex"
                    />
                    <CommentsEditor
                      className="sm:w-175"
                      value={replyToUser ? `@${replyToUser}, ` : ''}
                      id="sub-editor"
                      lessonId={commentLessonId}
                      replyFormAfterId={replyFormAfterId}
                      onCancel={() => {
                        setReplyToUser(null);
                        setReplyFormAfterId(null);
                      }}
                      onSubmit={() => {
                        // Refresh the data after submission
                        commentsQuery.refetch();
                        // Close the reply form
                        setReplyFormAfterId(null);
                        setReplyToUser(null);
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {comment.answers && openedComments.includes(comment.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex flex-col overflow-hidden pl-15"
                >
                  {comment.answers.map((answer: any) => {
                    // Ensure answer has proper structure
                    const formattedAnswer: Comment = {
                      ...answer,
                      author:
                        typeof answer.author === 'object'
                          ? answer.author.name
                          : answer.author,
                      avatarInitial:
                        typeof answer.author === 'object'
                          ? answer.author.avatarInitial
                          : typeof answer.author === 'string'
                            ? answer.author[0].toUpperCase()
                            : 'U',
                    };

                    return (
                      <div key={formattedAnswer.id} className="pt-8">
                        {editingCommentId === formattedAnswer.id ? (
                          <div className="flex flex-row gap-5">
                            <UserAvatar
                              avatarInitial={formattedAnswer.avatarInitial}
                              isSelf={!!formattedAnswer.isSelf}
                            />
                            <CommentsEditor
                              className="w-175"
                              value={formattedAnswer.content}
                              id={`edit-reply-${formattedAnswer.id}`}
                              lessonId={commentLessonId}
                              onCancel={handleCancelEdit}
                              onSubmit={() => {
                                void commentsQuery.refetch();
                                setEditingCommentId(null);
                              }}
                              isEditing={true}
                              commentId={formattedAnswer.id}
                            />
                          </div>
                        ) : (
                          <CommentItem
                            comment={formattedAnswer}
                            setReplyFormAfterId={() => {
                              setReplyToUser(formattedAnswer.author);
                              setReplyFormAfterId(comment.id);
                            }}
                            replyFormAfterId={replyFormAfterId}
                            setIsThreadOpened={(isOpened: boolean) => {}}
                            className=""
                            onToggleLike={handleToggleLike}
                            onDeleteComment={handleDeleteComment}
                            onEditComment={handleEditComment}
                          />
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasMoreComments && (totalCountQuery.data?.totalCount ?? 0) > 10 && (
        <div className="flex items-center justify-center">
          <button
            className={cn(
              'border-primary hover:bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm leading-5 sm:w-55',
              loading &&
                'cursor-default border-[#1242B2] bg-[#1242B2] hover:bg-[#1242B2]'
            )}
            disabled={loading || commentsQuery.isLoading}
            onClick={handleLoadMore}
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10C3 6.13516 6.11172 3 10 3C12.3136 3 14.0468 3.96629 15.1909 4.91968C15.4687 5.15117 15.7127 5.38261 15.9231 5.60053V3.89744C15.9231 3.60005 16.1642 3.35897 16.4615 3.35897C16.7589 3.35897 17 3.60005 17 3.89744V7.1282C17 7.42559 16.7589 7.66667 16.4615 7.66667H13.5897C13.2924 7.66667 13.0513 7.42559 13.0513 7.1282C13.0513 6.83082 13.2924 6.58974 13.5897 6.58974H15.372C15.1431 6.33271 14.8528 6.0398 14.5014 5.74699C13.4917 4.90551 11.9941 4.07692 10 4.07692C6.70879 4.07692 4.07692 6.72763 4.07692 10C4.07692 10.2974 3.83585 10.5385 3.53846 10.5385C3.24108 10.5385 3 10.2974 3 10ZM16.4615 9.46154C16.7589 9.46154 17 9.70262 17 10C17 13.866 13.866 17 10 17C8.02888 17 6.46913 16.0093 5.4283 15.0656C5.1927 14.852 4.98122 14.6386 4.79487 14.4362V16.1026C4.79487 16.3999 4.55379 16.641 4.25641 16.641C3.95903 16.641 3.71795 16.3999 3.71795 16.1026V12.8718C3.71795 12.5744 3.95903 12.3333 4.25641 12.3333H7.1745C7.47188 12.3333 7.71296 12.5744 7.71296 12.8718C7.71296 13.1692 7.47188 13.4103 7.1745 13.4103H5.32582C5.54647 13.6717 5.82328 13.97 6.15166 14.2678C7.09047 15.1189 8.40251 15.9231 10 15.9231C13.2712 15.9231 15.9231 13.2712 15.9231 10C15.9231 9.70262 16.1642 9.46154 16.4615 9.46154Z"
                fill="#F2F2F2"
              />
            </svg>

            <span className="text-sm leading-5 whitespace-nowrap">
              {loading ? 'Загружаем' : 'Больше комментариев'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
