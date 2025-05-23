'use client';

import LessonNavigation from './LessonNavigation';
import { Plate } from '@udecode/plate/react';
import { useEditorStore } from '~/store/editorStore';
const RightSidebar = () => {
  const editor = useEditorStore()
  return (
    <div className="border-accent min-h-screen w-75 border-l bg-[#14171C] hidden sm:block">
      <Plate editor={editor.editor}>
        <LessonNavigation />
      </Plate>
    </div>
  );
};

export default RightSidebar;
