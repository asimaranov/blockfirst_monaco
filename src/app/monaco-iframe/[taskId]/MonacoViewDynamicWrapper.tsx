'use client';
import dynamic from 'next/dynamic';

const DynamicMonacoEditorReact = dynamic(
  () => import('../../components/TaskView/MonacoViewDynamic'),
  {
    ssr: false,
  }
);

export default function MonacoViewDynamicWrapper({
  taskData,
}: {
  taskData: any;
}) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0F1217',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DynamicMonacoEditorReact taskData={taskData} />
    </div>
  );
}
