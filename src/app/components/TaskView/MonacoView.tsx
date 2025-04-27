'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DynamicMonacoEditorReact = dynamic(async () => {
    const { configure } = await import('./monaco/config');
    const comp = await import('@typefox/monaco-editor-react');
    // const wrapperConfig = buildJsonClientUserConfig();
    const configResult = configure();

    return () => <comp.MonacoEditorReactComp
        // style={{ 'height': '100%' }}
        className='h-full w-full relative'
        wrapperConfig={configResult.wrapperConfig} />
}, {
    ssr: false
});


export default function MonacoView () {
  return (<div className="h-full w-272">
    <DynamicMonacoEditorReact />
  </div>)
}