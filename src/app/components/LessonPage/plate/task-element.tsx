'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@udecode/cn';
import { PlateElement } from '@udecode/plate/react';
import { TaskCard, TaskCardProps } from './TaskCard';
import { api } from '~/trpc/react';
import { TaskData } from '~/server/api/routers/tasks';

export function TaskElement({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PlateElement>) {
  const taskIds = (children[0].props?.text?.text as string)
    .replaceAll(' ', '')
    .split(',');

  const [taskData, setTaskData] = useState<Record<string, TaskData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Use the trPC query to fetch task data
  const { data: tasksData } = api.tasks.getMultiple.useQuery(
    { taskIds },
    {
      enabled: taskIds.length > 0,
    }
  );

  // Update the local state when data is loaded
  useEffect(() => {
    if (tasksData) {
      const newTaskData: Record<string, TaskData> = {};
      tasksData.forEach((task: TaskData) => {
        newTaskData[task.id] = task;
      });
      setTaskData(newTaskData);
      setIsLoading(false);
    }
  }, [tasksData]);

  // Fallback data in case the API call fails
  // const fallbackTaskData: TaskCardProps = {
  //   id: 'fallback',
  //   updateDate: '15.03.2025',
  //   heroImageSrc: '/heroes/Alex.png',
  //   heroName: 'Алекс',
  //   heroTagline: 'Реши задачу за нашего героя!',
  //   labels: ['Глава 1', 'Тема 2', 'Урок 2'],
  //   title: 'Комментарии излишни',
  //   description:
  //     'Не все комментарии одинаково полезны! Иногда они появляются в коде, если программист не уверен в какой-то строчке и хочет вернуться к ней позднее. Так и с этой задачей получилось: в ней один лишний ...',
  //   completionCount: '1 207+',
  //   rating: '1 207+',
  // };

  return (
    <PlateElement
      className={cn('pt-16', className)}
      style={{
        backgroundColor: props.element.backgroundColor as any,
      }}
      data-plate-open-context-menu
      {...props}
    >
      <div className="border-accent -mx-16 flex w-[calc(100%*var(--spacing)*32)] flex-row items-center justify-center gap-10 border-t">
        <span className="text-secondary/50 py-2.5 text-xs uppercase">
          Практические задания
        </span>
      </div>
      <div className="flex flex-col gap-10">
        {taskIds.map((taskId) => (
          <TaskCard
            key={taskId}
            {...(taskData[taskId])}
            id={taskId}
            loading={isLoading}
            task={taskData[taskId]}
          />
        ))}
      </div>
    </PlateElement>
  );
}
