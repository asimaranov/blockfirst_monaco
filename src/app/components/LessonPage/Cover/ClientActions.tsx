'use client';

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M14.3551 10.6183C14.2484 10.4383 13.9484 10.1583 13.2018 10.2916C12.7884 10.365 12.3684 10.3983 11.9484 10.3783C10.3951 10.3116 8.98842 9.59829 8.00843 8.49829C7.14176 7.53162 6.60842 6.27162 6.60176 4.91162C6.60176 4.15162 6.74842 3.41829 7.04842 2.72495C7.34176 2.05162 7.13509 1.69829 6.98842 1.55162C6.83509 1.39829 6.47509 1.18495 5.76842 1.47829C3.04176 2.62495 1.35509 5.35829 1.55509 8.28495C1.75509 11.0383 3.68843 13.3916 6.24843 14.2783C6.86176 14.4916 7.50843 14.6183 8.17509 14.645C8.28176 14.6516 8.38842 14.6583 8.49509 14.6583C10.7284 14.6583 12.8218 13.605 14.1418 11.8116C14.5884 11.1916 14.4684 10.7983 14.3551 10.6183Z"
      fill="#01050D"
      className="group-hover:fill-foreground transition-colors duration-100"
    />
  </svg>
);
const ShareIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M9.85603 1.50049V5.21477C2.42746 5.21477 0.570312 9.02192 0.570312 14.5005C1.53603 10.8233 4.2846 8.92906 7.99888 8.92906H9.85603V12.6433L15.4275 6.77477L9.85603 1.50049Z"
      fill="#01050D"
      className="group-hover:fill-foreground transition-colors duration-100"
    />
  </svg>
);

interface Action {
  id: string;
  type: 'button' | 'icon';
  content: React.ReactNode | string; // For icon or text
  icon?: () => JSX.Element; // For icon buttons
  onClick?: () => void; // For button actions
}

// Define actions - adjust content/icons as needed
const actions: Action[] = [
  // { id: 'theme', type: 'icon', content: <MoonIcon />, onClick: () => {} },
  {
    id: 'share',
    type: 'icon',
    content: <ShareIcon />,
    onClick: () => {
      navigator.share({
        title: document.title,
        url: window.location.href,
        text: 'Посмотри урок по web3 рабоботке ',
      });
    },
  },
];

export const ClientActions = ({ className }: { className: string }) => {
  return (
    <>
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className={className}
        >
          {action.content}
        </button>
      ))}
    </>
  );
};
