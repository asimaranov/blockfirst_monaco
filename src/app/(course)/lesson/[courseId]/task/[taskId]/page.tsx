import { api } from '~/trpc/server';
import TaskView from '~/app/components/TaskView/TaskView';

export default async function TaskPage({
  params,
}: {
  params: { taskId: string; lessonId: string; courseId: string };
}) {
  const taskData = await api.tasks.getById({ taskId: params.taskId });

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

  return <TaskView task={taskData} courseId={params.courseId} />;
}
