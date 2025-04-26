import Image from 'next/image';

export default function TaskView({
  task,
  onClose,
}: {
  task: any;
  onClose: () => void;
}) {
  console.log('Task', task);
  return (
    <div className="fixed top-0 left-0 z-1000 h-full w-full bg-[#0F1217]">
      <div className="border-accent flex h-full w-150 flex-col border-r">
        <div className="flex flex-row items-center px-8 py-6">
          <div
            className="group/back-button cursor-pointer p-2.5"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.86366 3.63374C8.57077 3.34084 8.0959 3.34084 7.80301 3.63373L1.96967 9.46701C1.82902 9.60766 1.75 9.79842 1.75 9.99734C1.75 10.1962 1.82902 10.387 1.96967 10.5277L7.803 16.361C8.0959 16.6539 8.57077 16.6539 8.86366 16.361C9.15656 16.0681 9.15656 15.5932 8.86366 15.3003L4.31066 10.7473H17.5C17.9142 10.7473 18.25 10.4116 18.25 9.99734C18.25 9.58313 17.9142 9.24734 17.5 9.24734H4.31067L8.86366 4.6944C9.15655 4.4015 9.15656 3.92663 8.86366 3.63374Z"
                fill="#F2F2F2"
                className="group-hover/back-button:fill-foreground/50"
              />
            </svg>
          </div>
          <div className="mr-auto ml-auto flex h-10 w-71.5 flex-row rounded-[5.2083vw] bg-[#01050D]">
            <div className="bg-foreground flex h-10 w-35.75 cursor-pointer items-center justify-center rounded-[5.2083vw]">
              <span className="text-sm font-medium text-[#01050D]">
                Условие
              </span>
            </div>
            <div className="flex h-10 w-35.75 items-center justify-center rounded-r-[5.2083vw]">
              <span className="text-sm font-medium">AI ментор</span>
            </div>
          </div>

          <div className="group/hide-button cursor-pointer rounded-[0.4167vw] bg-[#14171C] p-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.106 4.55806C11.8619 4.31398 11.4662 4.31398 11.2221 4.55806L6.22212 9.55806C5.97804 9.80214 5.97804 10.1979 6.22212 10.4419L11.2221 15.4419C11.4662 15.686 11.8619 15.686 12.106 15.4419C12.3501 15.1979 12.3501 14.8021 12.106 14.5581L7.54795 10L12.106 5.44194C12.3501 5.19786 12.3501 4.80214 12.106 4.55806Z"
                fill="#F2F2F2"
                className="group-hover/hide-button:fill-foreground/50"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-row gap-5 bg-[#01050D] bg-[url('/images/grids/task-info-grid.svg')] bg-right-bottom px-8 py-6">
          <div className="relative shrink-0">
            <Image
              src={task.heroImageSrc}
              alt="task"
              width={100}
              height={100}
              className="h-12 w-12"
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-1/2 h-4.5 w-4.5 -translate-x-[calc(50%-var(--spacing)*2.75)] translate-y-0.5"
            >
              <path
                d="M17.6006 7.86628L16.3765 6.44464C16.1425 6.17471 15.9535 5.67083 15.9535 5.31092V3.7813C15.9535 2.82754 15.1704 2.04474 14.2164 2.04474H12.6863C12.3353 2.04474 11.8222 1.85579 11.5522 1.62184L10.1301 0.39815C9.50909 -0.132717 8.49203 -0.132717 7.86199 0.39815L6.4489 1.63084C6.17888 1.85579 5.66585 2.04474 5.31483 2.04474H3.75773C2.80367 2.04474 2.02063 2.82754 2.02063 3.7813V5.31992C2.02063 5.67083 1.83161 6.17471 1.6066 6.44464L0.391524 7.87528C-0.130508 8.49613 -0.130508 9.50387 0.391524 10.1247L1.6066 11.5554C1.83161 11.8253 2.02063 12.3292 2.02063 12.6801V14.2187C2.02063 15.1725 2.80367 15.9553 3.75773 15.9553H5.31483C5.66585 15.9553 6.17888 16.1442 6.4489 16.3782L7.87099 17.6019C8.49203 18.1327 9.50909 18.1327 10.1391 17.6019L11.5612 16.3782C11.8312 16.1442 12.3353 15.9553 12.6953 15.9553H14.2254C15.1794 15.9553 15.9625 15.1725 15.9625 14.2187V12.6891C15.9625 12.3382 16.1515 11.8253 16.3855 11.5554L17.6096 10.1337C18.1316 9.51287 18.1316 8.48713 17.6006 7.86628Z"
                fill="#010101"
              />
              <ellipse
                cx="9.49609"
                cy="9.4986"
                rx="4.5"
                ry="4.4986"
                fill="#F2F2F2"
              />
              <path
                d="M15.6854 8.11822L14.7334 7.0125C14.5514 6.80255 14.4044 6.41065 14.4044 6.13072V4.94101C14.4044 4.1992 13.7953 3.59035 13.0533 3.59035H11.8632C11.5902 3.59035 11.1912 3.44339 10.9812 3.26143L9.87508 2.30967C9.39205 1.89678 8.601 1.89678 8.11097 2.30967L7.0119 3.26843C6.80189 3.44339 6.40287 3.59035 6.12985 3.59035H4.91877C4.17673 3.59035 3.56769 4.1992 3.56769 4.94101V6.13771C3.56769 6.41065 3.42068 6.80255 3.24567 7.0125L2.30061 8.12522C1.89459 8.6081 1.89459 9.3919 2.30061 9.87478L3.24567 10.9875C3.42068 11.1974 3.56769 11.5894 3.56769 11.8623V13.059C3.56769 13.8008 4.17673 14.4096 4.91877 14.4096H6.12985C6.40287 14.4096 6.80189 14.5566 7.0119 14.7386L8.11797 15.6903C8.601 16.1032 9.39205 16.1032 9.88208 15.6903L10.9882 14.7386C11.1982 14.5566 11.5902 14.4096 11.8702 14.4096H13.0603C13.8023 14.4096 14.4114 13.8008 14.4114 13.059V11.8693C14.4114 11.5964 14.5584 11.1974 14.7404 10.9875L15.6924 9.88178C16.0985 9.3989 16.0985 8.6011 15.6854 8.11822ZM11.9052 7.67733L8.524 11.0575C8.42599 11.1555 8.29298 11.2114 8.15298 11.2114C8.01297 11.2114 7.87996 11.1555 7.78195 11.0575L6.08785 9.36391C5.88484 9.16096 5.88484 8.82504 6.08785 8.62209C6.29086 8.41914 6.62688 8.41914 6.82989 8.62209L8.15298 9.94476L11.1632 6.93552C11.3662 6.73257 11.7022 6.73257 11.9052 6.93552C12.1082 7.13847 12.1082 7.47438 11.9052 7.67733Z"
                fill="#195AF4"
              />
            </svg>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex flex-row gap-2">
              <span className="text-xl leading-6">{task.heroName}</span>
              <span className="font-delight border-accent rounded-[100px] border-[0.5px] px-3 pt-1 pb-1.25 text-xs leading-3.75">
                BF heroes
              </span>
              <div className="ml-auto flex flex-row items-center gap-1">
                <div className="bg-success h-1 w-1 rounded-full" />
                <span className="text-xs">12.04.2025</span>
              </div>
            </div>
            <span className="text-secondary text-xs">{task.heroTagline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
