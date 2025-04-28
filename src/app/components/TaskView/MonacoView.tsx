'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { configurePostStart } from './monaco/common';
import Image from 'next/image';
import BfLogo from './assets/bf-logo.svg';

const DynamicMonacoEditorReact = dynamic(
  async () => {
    const { configure } = await import('./monaco/config');
    const comp = await import('@typefox/monaco-editor-react');
    // const wrapperConfig = buildJsonClientUserConfig();
    const configResult = configure();

    return () => (
      <comp.MonacoEditorReactComp
        style={{ backgroundColor: '#0F1217' }}
        className="relative h-full w-full"
        wrapperConfig={configResult.wrapperConfig}
        onLoad={async (wrapper: MonacoEditorLanguageClientWrapper) => {
          await configurePostStart(wrapper, configResult);
        }}
        onError={(e) => {
          console.error(e);
        }}
      />
    );
  },
  {
    ssr: false,
  }
);

const FloatingActionBar = () => {
  const [position, setPosition] = useState({ bottom: 0, left: 0, width: 0 });
  const actionBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const editorsDiv = document.getElementById('editorsDiv');
      if (editorsDiv) {
        const rect = editorsDiv.getBoundingClientRect();
        setPosition({
          bottom: window.innerHeight - rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    // Set initial position
    updatePosition();

    // Create a mutation observer to detect when editorsDiv is added to the DOM
    const observer = new MutationObserver((mutations) => {
      if (document.getElementById('editorsDiv')) {
        updatePosition();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Update position on resize
    window.addEventListener('resize', updatePosition);

    // Use ResizeObserver to detect changes in the editorsDiv
    let resizeObserver: ResizeObserver | null = null;
    const editorsDiv = document.getElementById('editorsDiv');

    if (editorsDiv && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(editorsDiv);
    }

    // Call updatePosition periodically during initialization
    const initInterval = setInterval(updatePosition, 500);
    setTimeout(() => clearInterval(initInterval), 2000);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updatePosition);
      if (resizeObserver && editorsDiv) {
        resizeObserver.unobserve(editorsDiv);
        resizeObserver.disconnect();
      }
      observer.disconnect();
      clearInterval(initInterval);
    };
  }, []);

  return (
    <div
      ref={actionBarRef}
      className="border-accent z-50 flex flex-row items-center justify-center border-t text-white shadow-lg"
      style={{
        position: 'fixed',
        bottom: position.bottom,
        left: position.left,
        width: position.width || '0px',
        visibility: position.width ? 'visible' : 'hidden',
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row px-8 py-6">
          {/* Action buttons go here */}
          <div className="flex flex-row items-center gap-4">
            <Image
              src={BfLogo}
              alt="logo"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-foreground text-xl leading-5">
              0<span className="text-foreground text-xs leading-5">— Проверок кода</span>
            </span>
          </div>
          <button className="ml-auto text-sm">Проверить код</button>
        </div>
      </div>
    </div>
  );
};

export default function MonacoView() {
  return (
    <div className="h-full w-272">
      <DynamicMonacoEditorReact />
      <FloatingActionBar />
    </div>
  );
}
