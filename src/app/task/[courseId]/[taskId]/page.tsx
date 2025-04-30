import { api } from '~/trpc/server';
import TaskView from '~/app/components/TaskView/TaskView';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string; courseId: string }>;
}) {
  const { taskId, courseId } = await params;

  const session = await getServerSession();
  if (!session) {
    redirect('/signin');
  }

  const taskData = await api.tasks.getById({ taskId });

  if (!taskData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl font-medium text-red-500">Task not found</p>
        </div>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl font-medium text-red-500">Task not found</p>
        </div>
      </div>
    );
  }

  return <TaskView task={taskData} courseId={courseId} />;
}
