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
  // console.log('ggg 2')

  const wrapperConfig = buildJsonClientUserConfig();

  // console.log('ggg 3')

  // const wrapperConfig = buildJsonClientUserConfig();
  const configResult = configure();
  // console.log('ggg 4')

  return (
    <MonacoEditorReactComp
      style={{ backgroundColor: '#0F1217' }}
      className="relative h-full w-full"
      wrapperConfig={configResult.wrapperConfig}
      onLoad={async (wrapper: any) => {
        await configResult.configurePostStart(wrapper, configResult);

        // setTimeout(() => {
        //   wrapper.dispose();
        // }, 10000);
      }}
      onError={(e) => {
        console.error(e);
      }}
    />
  );
}
