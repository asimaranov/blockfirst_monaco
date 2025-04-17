'use client';
import React from 'react';
import Cover from './Cover'; // Import the extracted Cover component

import PlateEditor from './PlateEditor';
import RightSidebar from './RightSidebar';
import { PlateController } from '@udecode/plate/react';

// import { motion } from 'framer-motion'; // Uncomment if using animations

const LessonPage = () => {
  return (
    <div>
      <Cover />
      <div className="flex min-h-screen flex-row">
        <PlateController>
          <div className="flex-1 px-16">
            <PlateEditor />
          </div>
          <RightSidebar />
        </PlateController>
      </div>
    </div>
  );
};

export default LessonPage;
