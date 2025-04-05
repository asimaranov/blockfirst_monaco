import { InfoPopover } from '../../shared/InfoPopover';

const courseStatusTypes = [
  {
    type: 'available',
    text: 'Доступно для прохождения',
  },
  {
    type: 'starter',
    text: 'Требуется оплата тарифа',
  },
  {
    type: 'upcoming',
    text: 'По мере прохождения разблокируется',
  },
  {
    type: 'completed',
    text: 'Завершенный курс',
  },
];

export function CourseStructurePopover() {
  return (
    <InfoPopover
      position="right"
      title="Структура курса заблокирована?"
      content="Первая глава доступна бесплатно, остальные — по подписке. После оплаты главы будут разблокированы по мере прохождения."
    >
      <div className="flex flex-col gap-4 pt-5">
        {courseStatusTypes.map((item, index) => (
          <div key={index} className="font-delight flex items-center gap-3">
            {item.type === 'available' && (
              <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#33CF89]/10 px-2">
                <div className="h-1 w-1 rounded-full bg-[#33CF89]" />
                <span className="text-xs text-[#33CF89]">Available</span>
              </div>
            )}

            {item.type === 'starter' && (
              <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-gradient-to-r from-[#FF20A2]/10 to-[#FF2020]/10 px-2">
                <div className="h-1 w-1 rounded-full bg-[#FF20A2]" />
                <span className="bg-gradient-to-r from-[#FF20A2] to-[#FF2020] bg-clip-text text-xs text-transparent">
                  STARTER
                </span>
              </div>
            )}

            {item.type === 'upcoming' && (
              <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#9AA6B5]/10 px-2">
                <div className="h-1 w-1 rounded-full bg-[#9AA6B5]" />
                <span className="text-xs text-[#9AA6B5]">Upcoming</span>
              </div>
            )}

            {item.type === 'completed' && (
              <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#9AA6B5]/10 px-2 opacity-50">
                <div className="h-1 w-1 rounded-full bg-[#9AA6B5]" />
                <span className="text-xs text-[#9AA6B5]">Completed</span>
              </div>
            )}

            <span className="text-xs text-white">{item.text}</span>
          </div>
        ))}
      </div>
    </InfoPopover>
  );
}
