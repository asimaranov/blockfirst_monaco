import Link from "next/link";

export default function MobilePremiumTopbar({
  text
}: {
  text: string;
}) {
  return (
    <div className="flex w-full flex-row items-center gap-2 px-5 py-6 text-base sm:hidden sm:text-xl border-accent border-b">
      <Link href="/premium">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-5 w-5 sm:hidden"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.09897 4.46772C8.80608 4.17482 8.33121 4.17482 8.03831 4.46771L3.03831 9.46766C2.89766 9.60832 2.81864 9.79908 2.81864 9.998C2.81864 10.1969 2.89766 10.3877 3.03831 10.5283L8.03831 15.5283C8.3312 15.8212 8.80608 15.8212 9.09897 15.5283C9.39186 15.2354 9.39186 14.7606 9.09897 14.4677L5.3793 10.748H16.4258C16.84 10.748 17.1758 10.4122 17.1758 9.998C17.1758 9.58378 16.84 9.248 16.4258 9.248H5.37931L9.09897 5.52838C9.39186 5.23549 9.39186 4.76061 9.09897 4.46772Z"
            fill="#F2F2F2"
          />
        </svg>
      </Link>
      {text}
    </div>
  );
}
