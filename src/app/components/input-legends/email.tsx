import { cn } from '~/helpers';

export default function EmailSVG({ active }: { active?: boolean }) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <path
        d="M11.8335 14.1666H5.16683C2.7335 14.1666 1.3335 12.7666 1.3335 10.3333V5.66665C1.3335 3.23331 2.7335 1.83331 5.16683 1.83331H11.8335C14.2668 1.83331 15.6668 3.23331 15.6668 5.66665V10.3333C15.6668 12.7666 14.2668 14.1666 11.8335 14.1666ZM5.16683 2.83331C3.26016 2.83331 2.3335 3.75998 2.3335 5.66665V10.3333C2.3335 12.24 3.26016 13.1666 5.16683 13.1666H11.8335C13.7402 13.1666 14.6668 12.24 14.6668 10.3333V5.66665C14.6668 3.75998 13.7402 2.83331 11.8335 2.83331H5.16683Z"
        fill="#9AA6B5"
        className={cn(
          '[fill-opacity:50%] group-focus-within:fill-foreground group-focus-within:[fill-opacity:100%]',
          active && 'fill-foreground [fill-opacity:100%]'
        )}
      />
      <path
        d="M8.49969 8.57998C7.93969 8.57998 7.37302 8.40665 6.93969 8.05331L4.85302 6.38665C4.63969 6.21331 4.59969 5.89998 4.77302 5.68665C4.94636 5.47331 5.25969 5.43332 5.47303 5.60665L7.55969 7.27332C8.06635 7.67998 8.92635 7.67998 9.43302 7.27332L11.5197 5.60665C11.733 5.43332 12.053 5.46665 12.2197 5.68665C12.393 5.89998 12.3597 6.21998 12.1397 6.38665L10.053 8.05331C9.62636 8.40665 9.05969 8.57998 8.49969 8.57998Z"
        fill="#9AA6B5"
        className={cn(
          '[fill-opacity:50%] group-focus-within:fill-foreground group-focus-within:[fill-opacity:100%]',
          active && 'fill-foreground [fill-opacity:100%]'
        )}
      />
    </svg>
  );
}
