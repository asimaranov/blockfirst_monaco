'use client';

import { CourseSection } from './CourseSection';

type Module = {
  title: string;
  icon: React.ReactNode;
  lessons: {
    title: string;
    status?: 'available' | 'skipped' | 'completed' | 'completedNoExtra';
  }[];
  progress: number;
  total: number;
  status: 'available' | 'upcoming' | 'locked';
  finalTestStatus: 'available' | 'upcoming' | 'locked';
  finalTestId: string;
};

const CodeIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M8.0026 16.6673H12.0026C15.3359 16.6673 16.6693 15.334 16.6693 12.0007V8.00065C16.6693 4.66732 15.3359 3.33398 12.0026 3.33398H8.0026C4.66927 3.33398 3.33594 4.66732 3.33594 8.00065V12.0007C3.33594 15.334 4.66927 16.6673 8.0026 16.6673Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.39875 7.97852L6.73875 9.63852C6.54542 9.83185 6.54542 10.1585 6.73875 10.3518L8.39875 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5977 7.97852L13.2577 9.63852C13.451 9.83185 13.451 10.1585 13.2577 10.3518L11.5977 12.0118"
          stroke="#9AA6B5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

const MultiSigIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M5.33203 11.9987V7.33203"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.4987 16.6654C6.69531 16.6654 7.66536 15.6953 7.66536 14.4987C7.66536 13.3021 6.69531 12.332 5.4987 12.332C4.30208 12.332 3.33203 13.3021 3.33203 14.4987C3.33203 15.6953 4.30208 16.6654 5.4987 16.6654Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33203 7.33203C6.4366 7.33203 7.33203 6.4366 7.33203 5.33203C7.33203 4.22746 6.4366 3.33203 5.33203 3.33203C4.22746 3.33203 3.33203 4.22746 3.33203 5.33203C3.33203 6.4366 4.22746 7.33203 5.33203 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.668 7.33203C15.7725 7.33203 16.668 6.4366 16.668 5.33203C16.668 4.22746 15.7725 3.33203 14.668 3.33203C13.5634 3.33203 12.668 4.22746 12.668 5.33203C12.668 6.4366 13.5634 7.33203 14.668 7.33203Z"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.41797 12.0019C5.71797 10.8353 6.78463 9.96859 8.04463 9.97526L10.3313 9.98193C12.078 9.9886 13.5646 8.86859 14.1113 7.30859"
          stroke="#9AA6B5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

// Mock data for testing, this would be fetched from the API in a real scenario
const mockCourseSections = [
  {
    title: 'Мир токенов',
    icon: <CodeIcon />,
    status: 'completed',
    finalTestStatus: 'completed',
    finalTestId: 'h8vr5l9h2rgzhw2',
    modules: [
      {
        title: 'Основы блокчейна',
        icon: <CodeIcon />,
        progress: 2,
        total: 4,
        status: 'available',
        lessons: [
          { title: 'События', status: 'completed' },
          { title: 'Десятичные числа', status: 'completedNoExtra' },
          { title: 'Изучите openzeppelin, Erc20', status: 'locked' },
          { title: 'Утверждения и видимость', status: 'available' },
        ],
      },
      {
        title: 'мультисиг и НФТ',
        icon: <MultiSigIcon />,
        progress: 2,
        total: 4,
        status: 'available',
        lessons: [
          { title: 'Лекция как работает блокчейн', status: 'skipped' },
          { title: 'Изучаем openzeppelin', status: 'skipped' },
        ],
      },
    ],
  },
  
  {
    title: 'Основы блокчейна',
    icon: <CodeIcon />,
    status: 'available',
    expanded: true,
    finalTestStatus: 'locked',
    finalTestId: 'azmzpv56z3pftvc',
    modules: [
      {
        title: 'txs, ноды, консенсус, mempool',
        icon: <CodeIcon />,
        progress: 2,
        total: 4,
        status: 'available',
        lessons: [
          {title: 'Изучаем транзакции', status: 'completed'},
          {title: 'Изучаем ноды', status: 'completed'},
          {title: 'Изучаем консенсус', status: 'completed'},
          {title: 'Изучаем mempool', status: 'available'},
        ],
      },
      {
        title: 'Учимся работать со временем',
        icon: <CodeIcon />,
        progress: 2,
        total: 4,
        status: 'available',
        lessons: [
          {title: 'Изучаем хеши', status: 'completed'},
          {title: 'Изучаем хеши', status: 'completed'},
          {title: 'Изучаем хеши', status: 'completed'},
          {title: 'Изучаем хеши', status: 'available'},
        ],
      },
    ],
  },
  {
    title: 'Блокчейн и мультисиг',
    icon: <CodeIcon />,
    status: 'upcoming',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
  {
    title: 'Основы блокчейна и НФТ',
    icon: <CodeIcon />,
    status: 'locked',
    finalTestStatus: 'locked',
    modules: [
      
    ],
  },
];

export function CourseSections() {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        {mockCourseSections.map((section, index) => (
          <CourseSection
            key={index}
            title={section.title}
            status={section.status as 'available' | 'locked' | 'upcoming'}
            modules={section.modules as Module[]}
            finalTestStatus={section.finalTestStatus as 'available' | 'locked' | 'completed'}
            expanded={section.expanded}
            finalTestId={section.finalTestId}
          />
        ))}
      </div>
    </div>
  );
}
