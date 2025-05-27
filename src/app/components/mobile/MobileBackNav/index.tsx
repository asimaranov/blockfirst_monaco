import Link from 'next/link';

const BackButton = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M9.1001 4.97106C8.82562 4.69672 8.39169 4.67939 8.09717 4.9193L8.03955 4.97106L3.03955 9.97106C2.89918 10.1117 2.81983 10.3026 2.81982 10.5013C2.81993 10.7 2.89906 10.8911 3.03955 11.0316L8.03955 16.0316C8.3323 16.3243 8.80719 16.324 9.1001 16.0316C9.39297 15.7387 9.39292 15.264 9.1001 14.9711L5.38037 11.2513H16.4272C16.8413 11.2513 17.177 10.9154 17.1772 10.5013C17.1772 10.0871 16.8415 9.75133 16.4272 9.75133H5.38037L9.1001 6.0316L9.15186 5.97496C9.39226 5.68041 9.37467 5.24571 9.1001 4.97106Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

export const MobileBackNav = ({
  href,
  onClick,
  label,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => {
  return onClick ? (
    <button onClick={onClick}>
      <div className="flex items-center gap-2">
        <BackButton />
        <span className="line-clamp-1 max-w-48 overflow-hidden text-base text-left wrap-break-word text-ellipsis">
          {label}
        </span>
      </div>
    </button>
  ) : (
    <Link href={href}>
      <div className="flex items-center gap-2">
        <BackButton />
        <span className="line-clamp-1 max-w-48 overflow-hidden text-base text-left wrap-break-word text-ellipsis">
          {label}
        </span>
      </div>
    </Link>
  );
};
