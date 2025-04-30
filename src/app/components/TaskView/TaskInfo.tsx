import Image from 'next/image';
import { TaskNavigation, TaskStatusBadge } from '../LessonPage/plate/TaskCard';
import { InfoPopover } from '../shared/InfoPopover';
import PlateEditor from '../LessonPage/PlateEditor';

export default function TaskInfo({ task }: { task: any }) {
  const tests = [
    {
      title: 'Программа должна содержать только две переменные типа int.',
      progress: 0,
      isAdvanced: false,
    },
    {
      title: 'Нельзя изменять строки отвечающие за вывод в консоль.',
      progress: 10,
      isAdvanced: false,
    },
    {
      title: 'Нельзя изменять строки с объявленными переменными int a и int b',
      progress: 100,
      isAdvanced: false,
    },
    {
      title: 'Нужно написать подробные комментарии к коду',
      progress: 0,
      isAdvanced: true,
    },
    {
      title: 'Нужно сделать чистый код',
      progress: 50,
      isAdvanced: true,
    },
    {
      title: 'Нужно использовать только простые переменные',
      progress: 100,
      isAdvanced: true,
    },
  ];

  return (
    <>
      <div className="overflow-y-scroll ">
        <div className="flex flex-row gap-5 bg-[#01050D] bg-[url('/images/grids/task-info-grid.svg')] bg-w-150 h-24 bg-right-bottom bg-no-repeat px-8 py-6">
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
        <div className="flex flex-col gap-8 p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <TaskNavigation labels={task.labels} />
              <TaskStatusBadge status={'in-progress'} />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-medium">{task.title}</span>
              <span className="text-secondary text-sm">{task.description}</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <span className="text-secondary/50 text-xs uppercase">
                требования задачи
              </span>

              <InfoPopover
                title={'Требования задачи'}
                content={`
1. Синий кружок обозначает, что все ключевые задачи или тесты должны быть выполнены.
2.Синий кружок с оранжевой звездочкой указывает на то, что данная задача или тест имеют повышенный уровень сложности. Их выполнение не является обязательным.
            `}
              />
            </div>

            <div className="flex flex-col gap-5">
              {tests.map((x) => (
                <div className="flex flex-row gap-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5Z"
                      stroke="#195AF4"
                      stroke-opacity="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="text-secondary text-sm">{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <span className="text-secondary/50 text-xs uppercase">
                Условие задачи
              </span>

              <InfoPopover
                title={'Условие задачи'}
                content={`Тщательно ознакомьтесь с условиями задачи, это позволит вам быстрее найти необходимое решение. Если у вас возникают трудности с прохождением тестов, пожалуйста, обратитесь за помощью к AI-ментору.`}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-secondary text-sm">
                <PlateEditor richText={task.problemStatement} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-accent sticky bottom-0 mt-auto border-t px-8 py-4">
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M7.9974 8.0026C9.83835 8.0026 11.3307 6.51022 11.3307 4.66927C11.3307 2.82832 9.83835 1.33594 7.9974 1.33594C6.15645 1.33594 4.66406 2.82832 4.66406 4.66927C4.66406 6.51022 6.15645 8.0026 7.9974 8.0026Z"
                fill="#F2F2F2"
              />
              <path
                d="M8.0014 9.66406C4.6614 9.66406 1.94141 11.9041 1.94141 14.6641C1.94141 14.8507 2.08807 14.9974 2.27474 14.9974H13.7281C13.9147 14.9974 14.0614 14.8507 14.0614 14.6641C14.0614 11.9041 11.3414 9.66406 8.0014 9.66406Z"
                fill="#F2F2F2"
              />
            </svg>
            <span className="text-sm leading-4">1270+</span>
          </div>

          <div className="bg-secondary/20 h-4 w-0.25"></div>

          <div className="flex flex-row items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M7.32936 1.70625C7.75549 1.50414 8.24989 1.50419 8.67604 1.70625C8.97107 1.84618 9.18103 2.11099 9.36647 2.41035C9.55287 2.71132 9.75732 3.12075 10.012 3.63008L10.0217 3.64961L10.2268 4.06074C10.401 4.40915 10.4523 4.50088 10.5159 4.56758C10.5816 4.63642 10.661 4.69177 10.7483 4.72969C10.833 4.76645 10.9365 4.78228 11.3245 4.82539L11.511 4.84688L11.5335 4.84883C12.1453 4.9168 12.6341 4.97084 13.0042 5.04609C13.3692 5.12034 13.7094 5.23088 13.9475 5.47383C14.2882 5.82143 14.4489 6.30715 14.3821 6.78926C14.3354 7.12614 14.1272 7.41664 13.8782 7.69356C13.6256 7.9744 13.265 8.30973 12.8137 8.72871L12.7981 8.74336L12.6008 8.92695C12.2596 9.24386 12.1714 9.33343 12.1223 9.42891C12.0716 9.52761 12.0444 9.63729 12.0432 9.74824C12.0421 9.85551 12.0792 9.97819 12.2356 10.424L12.2424 10.4455C12.4734 11.1037 12.6562 11.6249 12.76 12.0305C12.8609 12.4245 12.9179 12.8116 12.7864 13.1467C12.6012 13.618 12.2001 13.9716 11.7092 14.0959C11.3614 14.1839 10.9882 14.0806 10.6135 13.9328C10.2288 13.7811 9.74132 13.5377 9.12721 13.2307L9.1067 13.2209L8.62916 12.9816C8.30752 12.8208 8.21935 12.7807 8.13502 12.7648C8.04804 12.7485 7.95834 12.7485 7.87135 12.7648C7.78695 12.7807 7.69902 12.8207 7.37721 12.9816L6.87916 13.2307C6.265 13.5378 5.77757 13.781 5.39284 13.9328C5.01803 14.0807 4.64411 14.184 4.29616 14.0959C3.80532 13.9716 3.40411 13.618 3.21901 13.1467C3.08748 12.8117 3.14449 12.4245 3.24537 12.0305C3.34922 11.625 3.53204 11.1036 3.76295 10.4455L3.77077 10.424C3.92719 9.97821 3.96326 9.85551 3.96217 9.74824C3.96101 9.63729 3.93376 9.52761 3.88307 9.42891C3.83393 9.33347 3.74582 9.24384 3.40455 8.92695L3.20827 8.74336L3.19166 8.72871C2.74044 8.30973 2.37976 7.9744 2.12721 7.69356C1.87831 7.41673 1.67098 7.12603 1.62428 6.78926C1.55751 6.30725 1.71735 5.82142 2.05787 5.47383C2.29597 5.23091 2.63627 5.12034 3.00123 5.04609C3.37135 4.97081 3.86093 4.91682 4.47291 4.84883L4.4944 4.84688L4.68092 4.82539C5.06865 4.78231 5.17247 4.76636 5.25709 4.72969C5.34444 4.69177 5.42374 4.63643 5.48952 4.56758C5.55316 4.50087 5.60426 4.40938 5.77858 4.06074L5.98366 3.64961L5.9944 3.63008C6.24912 3.12062 6.45346 2.71134 6.63991 2.41035C6.8253 2.11106 7.03444 1.8462 7.32936 1.70625Z"
                fill="#FEF360"
              />
            </svg>

            <span className="text-sm leading-4">4.9</span>
          </div>
          <div className="ml-auto flex flex-row items-center gap-1">
            <div className="bg-success h-1 w-1 rounded-full" />
            <span className="text-sm">32</span>
            <span className="text-secondary/50 text-sm">— Online</span>
          </div>
        </div>
      </div>
    </>
  );
}
