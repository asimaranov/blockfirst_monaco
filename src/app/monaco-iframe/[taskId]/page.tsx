import { api } from '~/trpc/server';
import MonacoViewDynamicWrapper from './MonacoViewDynamicWrapper';

export default async function MonacoIframePage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  console.log('taskId', taskId);

  const taskData = await api.tasks.getById({ taskId });
  console.log('taskData', taskData);

  return (
    <MonacoViewDynamicWrapper taskData={taskData} />
  );
}
