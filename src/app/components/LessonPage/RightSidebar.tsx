'use client';
import React, { useEffect, RefObject, useMemo, useState } from 'react';
import {
  useEditorRef,
  useEditorSelector,
  useScrollRef,
} from '@udecode/plate/react';

import {
  type SlateEditor,
  type TElement,
  NodeApi,
} from '@udecode/plate';
import {
  type Heading,
  BaseTocPlugin,
  HEADING_KEYS,
  isHeading,
} from '@udecode/plate-heading';

import LessonNavigation from './LessonNavigation';
import { UserInfoClient } from '../Sidebar/UserInfoClient';

const RightSidebar = () => {
  
  return (
    <div className="w-75 bg-[#14171C] border-accent border-l min-h-screen">
      <LessonNavigation />
    </div>
  );
};

export default RightSidebar;
