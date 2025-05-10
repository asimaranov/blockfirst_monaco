'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import Image from 'next/image';
import BfLogo from './assets/bf-logo.svg';
import ReactDOM from 'react-dom/client';
import { configure } from './monaco/config';
import { buildJsonClientUserConfig } from 'monaco-languageclient-examples/json-client';
import { MonacoEditorReactComp } from './monaco/MonacoEditorReact';

export default function MonacoViewDynamic() {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Configure Monaco editor
  const wrapperConfig = buildJsonClientUserConfig();
  const configResult = configure();

  // Notify parent window when editor is fully loaded and ready
  useEffect(() => {
    if (isEditorReady && window.parent !== window) {
      // Small delay to ensure everything is rendered properly
      setTimeout(() => {
        window.parent.postMessage({ type: 'monaco-editor-ready' }, '*');
        console.log('Monaco editor fully loaded and ready - notifying parent');
      }, 500);
    }
  }, [isEditorReady]);

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
          setIsEditorReady(true);
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
