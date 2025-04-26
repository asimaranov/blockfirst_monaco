export default function TaskView({
  task,
  onClose,
}: {
  task: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 z-100 h-full w-full bg-[#0F1217]">
      <div className="border-accent flex h-full w-150 flex-col border-r">
        <div className="flex flex-row items-center px-8 py-6">
          <div className="p-2.5 cursor-pointer group/back-button" onClick={onClose}>
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
            <div className="bg-foreground flex h-10 w-35.75 items-center justify-center rounded-[5.2083vw]">
              <span className="text-sm font-medium text-[#01050D]">
                Условие
              </span>
            </div>
            <div className="flex h-10 w-35.75 items-center justify-center rounded-r-[5.2083vw]">
              <span className="text-sm font-medium">AI ментор</span>
            </div>
          </div>

          <div className="p-2.5 bg-[#14171C] rounded-[0.4167vw] cursor-pointer group/hide-button">
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
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
