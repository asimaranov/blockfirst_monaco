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
import { createPortal } from 'react-dom';

export default function MonacoViewDynamic() {
  const [showActionBar, setShowActionBar] = useState(true);


  // console.log('ggg 2')

  const wrapperConfig = buildJsonClientUserConfig();

  // console.log('ggg 3')

  // const wrapperConfig = buildJsonClientUserConfig();
  // console.log('ggg 4')

  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [app, setApp] = useState<React.ReactNode | null>(null);

  useEffect(() => {
  const configResult = configure();

    const target = document.getElementById('monaco-target');
    console.log('targetttt', target);

    const App = () => {
      return (
        <div style={{ backgroundColor: '#1f1f1f' }}>
          <MonacoEditorReactComp
            wrapperConfig={configResult.wrapperConfig}
            onLoad={async (wrapper: any) => {
              // await configResult.configurePostStart(wrapper, configResult);
            }}
            onError={(e) => {
              console.error(e);
            }}
          />
        </div>
      );
    };

    setTarget(target);
    setApp(<App />);

    // const checkElem = document.getElementById(
    //   'checkbox-strictmode'
    // ) as HTMLInputElement | null;
    // const strictMode = checkElem?.checked;
    // if (strictMode === true) {
    //   root.render(
    //     <StrictMode>
    //       <App />
    //     </StrictMode>
    //   );
    // } else {
    //   root.render(<App />);
    // }
  }, [showActionBar]);

  return (
    <>
      <button
        onClick={() => setShowActionBar(!showActionBar)}
        className="absolute top-0 right-0 z-1000 h-10 w-10 bg-red-500"
      >
        {showActionBar ? 'hide' : 'show'}
      </button>


      {target && app && createPortal(app, target!)}
      <div id="monaco-target"></div>
    </>
    // <MonacoEditorReactComp
    //   style={{ backgroundColor: '#0F1217' }}
    //   className="relative h-full w-full"
    //   wrapperConfig={configResult.wrapperConfig}
    //   onLoad={async (wrapper: any) => {
    //     await configResult.configurePostStart(wrapper, configResult);

    //     // setTimeout(() => {
    //     //   wrapper.dispose();
    //     // }, 10000);
    //   }}

    //   onError={(e) => {
    //     console.error(e);
    //   }}
    // />
  );
}
