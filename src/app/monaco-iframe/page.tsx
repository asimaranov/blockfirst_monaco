'use client';

import React, { useEffect, useState } from 'react';
import MonacoViewDynamic from '../components/TaskView/MonacoViewDynamic';

export default function MonacoIframePage() {
  const [editorMounted, setEditorMounted] = useState(false);

  // Notify parent when iframe is initially loaded
  useEffect(() => {
    // Check if running in an iframe
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'iframe-loaded' }, '*');
      console.log('Iframe loaded, notifying parent window');
    }
  }, []);

  // Listen for messages from the Monaco editor component
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Forward important messages to the parent window
      if (
        window.parent !== window &&
        (event.data.type === 'monaco-editor-ready' ||
          event.data.type === 'monaco-editor-error')
      ) {
        window.parent.postMessage(event.data, '*');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
      <MonacoViewDynamic />
    </div>
  );
}
