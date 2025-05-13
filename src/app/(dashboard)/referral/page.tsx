import ReferralPage from '~/app/components/ReferralPage';

type Params = Promise<{ courseId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardPage(props: { params: Params }) {
  // const session = await getServerSession();
  const params = await props.params;
  // if (!session) {
  //   redirect('/signin');
  // }

  return <ReferralPage session={undefined as any} />;
}
