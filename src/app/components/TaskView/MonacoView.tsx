'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { configurePostStart } from './monaco/common';

const DynamicMonacoEditorReact = dynamic(async () => {
    const { configure } = await import('./monaco/config');
    const comp = await import('@typefox/monaco-editor-react');
    // const wrapperConfig = buildJsonClientUserConfig();
    const configResult = configure();

    return () => <comp.MonacoEditorReactComp
        style={{ 'backgroundColor': '#0F1217' }}
        className=' w-full relative h-200'
        wrapperConfig={configResult.wrapperConfig}
        onLoad={async (wrapper: MonacoEditorLanguageClientWrapper) => {
            await configurePostStart(wrapper, configResult);
        }}
        onError={(e) => {
            console.error(e);
        }}
        />
}, {
    ssr: false
});


export default function MonacoView () {
  return (<div className="h-full w-272">
    <DynamicMonacoEditorReact />
  </div>)
}