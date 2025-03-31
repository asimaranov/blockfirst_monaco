export default function FormMobileControls(
  {
    showBackButton = false,
    onBackClick,
    onClose,
  }: {
    showBackButton?: boolean;
    onBackClick?: () => void;
    onClose: () => void;
  }
) {
  return (
    <div className="flex flex-row items-center sm:hidden">
      {showBackButton && (
        <button onClick={onBackClick} className="p-5">
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
              d="M9.10288 4.46967C8.80999 4.17678 8.33511 4.17678 8.04222 4.46967L3.04222 9.46962C2.90156 9.61027 2.82255 9.80104 2.82254 9.99995C2.82254 10.1989 2.90156 10.3896 3.04221 10.5303L8.04221 15.5303C8.33511 15.8232 8.80998 15.8232 9.10287 15.5303C9.39577 15.2374 9.39577 14.7625 9.10287 14.4696L5.3832 10.75H16.4297C16.8439 10.75 17.1797 10.4142 17.1797 9.99995C17.1797 9.58574 16.8439 9.24995 16.4297 9.24995H5.38322L9.10287 5.53033C9.39577 5.23744 9.39577 4.76257 9.10288 4.46967Z"
              fill="#F2F2F2"
            />
          </svg>
        </button>
      )}

      <button onClick={onClose} className="ml-auto p-5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2130_22553)">
            <path
              d="M5.91406 15.2513C5.5919 15.5735 5.06956 15.5735 4.7474 15.2513C4.42523 14.9291 4.42523 14.4068 4.7474 14.0846L8.83073 10.0013L4.7474 5.91797C4.42523 5.5958 4.42523 5.07347 4.7474 4.7513C5.06956 4.42914 5.5919 4.42914 5.91406 4.7513L9.9974 8.83464L14.0807 4.7513C14.4029 4.42914 14.9252 4.42914 15.2474 4.7513C15.5696 5.07347 15.5696 5.5958 15.2474 5.91797L11.1641 10.0013L15.2474 14.0846C15.5696 14.4068 15.5696 14.9291 15.2474 15.2513C14.9252 15.5735 14.4029 15.5735 14.0807 15.2513L9.9974 11.168L5.91406 15.2513Z"
              fill="#F2F2F2"
            />
          </g>
          <defs>
            <clipPath id="clip0_2130_22553">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
