import { cn } from "~/helpers";
import { NotificationSetting, NotificationSettings } from "./types";

// Settings data
export const notificationSettings: NotificationSetting[] = [
  {
    id: NotificationSettings.NEWS,
    title: 'Новости и обновления',
    description: 'Новости BlockFirst, скидки, релизы',
    defaultEnabled: true,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M14.4388 6.96033L13.7855 9.747C13.2255 12.1537 12.1188 13.127 10.0388 12.927C9.70548 12.9003 9.34548 12.8403 8.95882 12.747L7.83882 12.4803C5.05882 11.8203 4.19882 10.447 4.85215 7.66033L5.50548 4.867C5.63882 4.30033 5.79882 3.807 5.99882 3.40033C6.77882 1.787 8.10548 1.35366 10.3322 1.88033L11.4455 2.14033C14.2388 2.79366 15.0922 4.17366 14.4388 6.96033Z"
          stroke="#F2F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0402 12.9271C9.62689 13.2071 9.10689 13.4404 8.47356 13.6471L7.42023 13.9937C4.77356 14.8471 3.38023 14.1337 2.52023 11.4871L1.66689 8.85372C0.813561 6.20706 1.52023 4.80706 4.16689 3.95372L5.22023 3.60706C5.49356 3.52039 5.75356 3.44706 6.00023 3.40039C5.80023 3.80706 5.64023 4.30039 5.50689 4.86706L4.85356 7.66039C4.20023 10.4471 5.06023 11.8204 7.84023 12.4804L8.96023 12.7471C9.34689 12.8404 9.70689 12.9004 10.0402 12.9271Z"
          stroke="#F2F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.42578 5.68555L11.6591 6.50555"
          stroke="#F2F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.77344 8.26758L9.70677 8.76091"
          stroke="#F2F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: NotificationSettings.COMMENTS,
    title: 'Комментарии и лайки',
    description: 'Ответы на ваши сообщения и реакции',
    defaultEnabled: true,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M14.6654 5.33398V8.66732C14.6654 11.334 13.332 12.6673 10.6654 12.6673H10.332C10.1254 12.6673 9.92536 12.7673 9.7987 12.934L8.7987 14.2673C8.3587 14.854 7.6387 14.854 7.1987 14.2673L6.1987 12.934C6.09203 12.7873 5.84536 12.6673 5.66536 12.6673H5.33203C2.66536 12.6673 1.33203 12.0007 1.33203 8.66732V5.33398C1.33203 2.66732 2.66536 1.33398 5.33203 1.33398H7.9987"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.1345 3.07973C9.91446 2.41973 10.1745 1.60639 10.8945 1.37973C11.2678 1.26639 11.7345 1.35973 12.0011 1.71306C12.2545 1.34639 12.7345 1.26639 13.1078 1.37973C13.8278 1.59973 14.0878 2.41973 13.8678 3.07973C13.5278 4.12639 12.3345 4.66639 12.0011 4.66639C11.6678 4.66639 10.4878 4.13306 10.1345 3.07973Z"
          stroke="#F2F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6617 7.33333H10.6677"
          stroke="#F2F2F2"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.99764 7.33333H8.00363"
          stroke="#F2F2F2"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.32967 7.33333H5.33566"
          stroke="#F2F2F2"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: NotificationSettings.JOBS,
    title: 'Вакансии',
    description: 'Уведомлять о новых вакансиях',
    defaultEnabled: false,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M5.33387 14.6667H10.6672C13.3472 14.6667 13.8272 13.5933 13.9672 12.2867L14.4672 6.95333C14.6472 5.32667 14.1805 4 11.3339 4H4.6672C1.82054 4 1.35387 5.32667 1.53387 6.95333L2.03387 12.2867C2.17387 13.5933 2.65387 14.6667 5.33387 14.6667Z"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33203 4.00065V3.46732C5.33203 2.28732 5.33203 1.33398 7.46536 1.33398H8.53203C10.6654 1.33398 10.6654 2.28732 10.6654 3.46732V4.00065"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.33464 8.66667V9.33333C9.33464 9.34 9.33464 9.34 9.33464 9.34667C9.33464 10.0733 9.32797 10.6667 8.0013 10.6667C6.6813 10.6667 6.66797 10.08 6.66797 9.35333V8.66667C6.66797 8 6.66797 8 7.33464 8H8.66797C9.33464 8 9.33464 8 9.33464 8.66667Z"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.432 7.33398C12.892 8.45398 11.132 9.12065 9.33203 9.34732"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.74609 7.51367C3.24609 8.54034 4.93943 9.16034 6.66609 9.35367"
          stroke="#F2F2F2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function NotificationsSettings({
  settings,
  toggleSetting,
}: {
  settings: Record<string, boolean>;
  toggleSetting: (id: string) => void;
}) {
  return <div className="flex flex-col p-8">
  <p className="text-foreground mb-3 text-base font-medium">
    Уведомления от BlockFirst
  </p>
  <p className="text-secondary mb-8 text-sm">
    Получайте актуальные обновления, информацию о скидках на курсы и
    релизах продуктов
  </p>

  <p className="text-secondary/50 mb-1 text-xs uppercase">
    Настройки
  </p>
  <div className="flex flex-col">
    {notificationSettings.map((setting, index) => (
      <div
        key={setting.id}
        className={cn(
          'flex flex-col',
          index < notificationSettings.length - 1 &&
            'border-accent border-b'
        )}
      >
        <div className="flex items-center justify-between py-5">
          <div className="flex gap-3">
            <div className="text-foreground">{setting.icon}</div>
            <div className="flex flex-col gap-2">
              <span className="text-foreground text-sm leading-4">
                {setting.title}
              </span>
              <span className="text-secondary text-xs leading-3.5">
                {setting.description}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={settings[setting.id] || false}
                onChange={() => toggleSetting(setting.id)}
              />
              <div className="peer bg-background after:bg-foreground peer-checked:bg-primary h-5 w-9 rounded-full after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>;
}
