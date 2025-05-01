'use client';
import React, { useEffect, RefObject, useMemo, useState } from 'react';
import {
  useEditorRef,
  useEditorSelector,
  useScrollRef,
} from '@udecode/plate/react';

import { type SlateEditor, type TElement, NodeApi } from '@udecode/plate';
import {
  type Heading,
  BaseTocPlugin,
  HEADING_KEYS,
  isHeading,
} from '@udecode/plate-heading';

import LessonNavigation from './LessonNavigation';
import { UserInfoClient } from '../Sidebar/UserInfoClient';
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
