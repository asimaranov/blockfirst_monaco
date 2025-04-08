import { COURSES } from '~/app/lib/constants/courses';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import { CoursesTab } from '~/app/components/Dashboard/CoursesTab';
import { HistoryTab } from '~/app/components/Dashboard/HistoryTab';
import { DashboardTabs } from '~/app/components/Dashboard/DashboardTabs';

export default async function Dashboard({ session }: { session: Session }) {
  const lastUpdate = new Date(
    Math.min(
      ...COURSES.filter((x) => !x.soon).map((course) =>
        new Date(course.info!.updatedAt).getTime()
      )
    )
  ).toLocaleDateString('ru-RU');

  const tabs = [
    {
      id: 'courses',
      label: 'Курсы',
      content: <CoursesTab />,
    },
    {
      id: 'history',
      label: 'История',
      content: <HistoryTab />,
    },
  ];

  return (
    <main className="border-accent border-0 sm:border-r sm:border-l">
      <DashboardTabs tabs={tabs} defaultTab="courses" lastUpdate={lastUpdate} />
      <Footer />
    </main>
  );
}
