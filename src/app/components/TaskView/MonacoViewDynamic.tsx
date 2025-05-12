'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { configure } from './monaco/config';
import { MonacoEditorReactComp } from './monaco/MonacoEditorReact';

export default function MonacoViewDynamic({ taskData }: { taskData: any }) {
  const editorRef = useRef<any>(null);

  const configResult = useMemo(() => configure(taskData), [taskData]);

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

  // Listen for messages from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Make sure message is from parent window
      if (event.source === window.parent) {
        // Handle commands from parent
        if (event.data.type === 'get-content') {
          const content = editorRef.current?.getEditor()?.getValue();
          window.parent.postMessage({ type: 'content', content }, '*');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <MonacoEditorReactComp
      style={{ backgroundColor: '#0F1217' }}
      className="relative h-full w-full"
      wrapperConfig={configResult.wrapperConfig}
      onLoad={async (wrapper: any) => {
        editorRef.current = wrapper;
        try {
          await configResult.configurePostStart(wrapper, configResult);
          console.log('Monaco editor loaded successfully');
          if (window.parent !== window) {
            // Small delay to ensure everything is rendered properly
            setTimeout(() => {
              window.parent.postMessage({ type: 'monaco-editor-ready' }, '*');
              console.log(
                'Monaco editor fully loaded and ready - notifying parent'
              );
            }, 500);
          }
        } catch (error) {
          console.error('Error loading Monaco editor:', error);
          // Still notify parent, but with error
          window.parent.postMessage(
            { type: 'monaco-editor-error', error: String(error) },
            '*'
          );
        }
      }}
      onError={(e) => {
        console.error('Monaco editor error:', e);
        window.parent.postMessage(
          { type: 'monaco-editor-error', error: String(e) },
          '*'
        );
      }}
    />
  );
}
