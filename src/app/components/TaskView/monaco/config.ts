'use client';
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import { LogLevel } from '@codingame/monaco-vscode-api';
import {
  RegisteredFileSystemProvider,
  registerFileSystemOverlay,
  RegisteredMemoryFile,
} from '@codingame/monaco-vscode-files-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import getLifecycleServiceOverride from '@codingame/monaco-vscode-lifecycle-service-override';
import getLocalizationServiceOverride, { LocalizationOptions } from '@codingame/monaco-vscode-localization-service-override';
import getBannerServiceOverride from '@codingame/monaco-vscode-view-banner-service-override';
import getStatusBarServiceOverride from '@codingame/monaco-vscode-view-status-bar-service-override';
import getTitleBarServiceOverride from '@codingame/monaco-vscode-view-title-bar-service-override';
import getExplorerServiceOverride from '@codingame/monaco-vscode-explorer-service-override';
import getRemoteAgentServiceOverride from '@codingame/monaco-vscode-remote-agent-service-override';
import getEnvironmentServiceOverride from '@codingame/monaco-vscode-environment-service-override';
import getSecretStorageServiceOverride from '@codingame/monaco-vscode-secret-storage-service-override';
import getStorageServiceOverride from '@codingame/monaco-vscode-storage-service-override';
import getSearchServiceOverride from '@codingame/monaco-vscode-search-service-override';

// this is required syntax highlighting
import '@codingame/monaco-vscode-typescript-basics-default-extension';
import '@codingame/monaco-vscode-typescript-language-features-default-extension';
import '@codingame/monaco-vscode-search-result-default-extension';
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  registerExtension,
  RegisterLocalExtensionResult,
} from '@codingame/monaco-vscode-api/extensions';

import 'vscode/localExtensionHost';

import { defaultHtmlAugmentationInstructions } from 'monaco-editor-wrapper/vscode/services';
import { configureDefaultWorkerFactory } from 'monaco-editor-wrapper/workers/workerLoaders';
import { createDefaultWorkspaceFile } from './client-utils';

import type { WrapperConfig } from 'monaco-editor-wrapper';
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import type { RegisterLocalProcessExtensionResult } from '@codingame/monaco-vscode-api/extensions';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { defaultViewsInit } from './viewsService';


export const createDefaultLocaleConfiguration = (): LocalizationOptions => {
    return {
      async clearLocale() {
        const url = new URL(window.location.href);
        url.searchParams.delete('locale');
        window.history.pushState(null, '', url.toString());
      },
      async setLocale(id: string) {
        const url = new URL(window.location.href);
        url.searchParams.set('locale', id);
        window.history.pushState(null, '', url.toString());
      },
      availableLanguages: [
        {
          locale: 'en',
          languageName: 'English',
        },
        {
          locale: 'cs',
          languageName: 'Czech',
        },
        {
          locale: 'de',
          languageName: 'German',
        },
        {
          locale: 'es',
          languageName: 'Spanish',
        },
        {
          locale: 'fr',
          languageName: 'French',
        },
        {
          locale: 'it',
          languageName: 'Italian',
        },
        {
          locale: 'ja',
          languageName: 'Japanese',
        },
        {
          locale: 'ko',
          languageName: 'Korean',
        },
        {
          locale: 'pl',
          languageName: 'Polish',
        },
        {
          locale: 'pt-br',
          languageName: 'Portuguese (Brazil)',
        },
        {
          locale: 'qps-ploc',
          languageName: 'Pseudo Language',
        },
        {
          locale: 'ru',
          languageName: 'Russian',
        },
        {
          locale: 'tr',
          languageName: 'Turkish',
        },
        {
          locale: 'zh-hans',
          languageName: 'Chinese (Simplified)',
        },
        {
          locale: 'zh-hant',
          languageName: 'Chinese (Traditional)',
        },
        {
          locale: 'en',
          languageName: 'English',
        },
      ],
    };
  };
  
var manifest = {
  name: 'theme-defaults',
  displayName: '%displayName%',
  description: '%description%',
  categories: ['Themes'],
  version: '1.0.0',
  publisher: 'vscode',
  license: 'MIT',
  engines: { vscode: '*' },
  contributes: {
    themes: [
      {
        id: 'Default Dark Blockfirst',
        label: 'Default Dark Blockfirst',
        uiTheme: 'vs-dark',
        path: './themes/dark_blockfirst.json',
      },
    ],
    // iconThemes: [
    //   {
    //     id: 'vs-minimal',
    //     label: '%minimalIconThemeLabel%',
    //     path: './fileicons/vs_minimal-icon-theme.json',
    //   },
    // ],
  },
  repository: { type: 'git', url: 'https://github.com/microsoft/vscode.git' },
  main: undefined,
};

const { registerFileUrl, whenReady } = registerExtension(
  manifest as any,
  undefined,
  { system: true }
) as RegisterLocalExtensionResult;

// registerFileUrl(
//   './fileicons/vs_minimal-icon-theme.json',
//   new URL('./resources/vs_minimal-icon-theme.json', import.meta.url).toString()
// );

registerFileUrl(
  './themes/dark_blockfirst.json',
  new URL('./themes/dark_blockfirst.json', import.meta.url).toString()
);
// import '../../resources/vsix/open-collaboration-tools.vsix';

export const configurePostStart = async (
  wrapper: MonacoEditorLanguageClientWrapper,
  configResult: ConfigResult
) => {
  const result = wrapper.getExtensionRegisterResult(
    'mlc-app-playground'
  ) as RegisterLocalProcessExtensionResult;
  result.setAsDefaultApi();

  // WA: Force show explorer and not search
  await vscode.commands.executeCommand('workbench.view.explorer');

  await Promise.all([
    await vscode.workspace.openTextDocument(configResult.helloTsUri),
    await vscode.workspace.openTextDocument(configResult.testerTsUri),
  ]);

  await Promise.all([
    await vscode.window.showTextDocument(configResult.helloTsUri),
  ]);

  console.log('Application Playground started');

  const target = document.getElementsByClassName('actions-container highlight-toggled')[1];
  console.log('target---', target);

  target.innerHTML = '';

  const div = document.createElement('li');
  div.className = 'action-item menu-entry';
  target.appendChild(div);

};
export type ConfigResult = {
  wrapperConfig: WrapperConfig;
  workspaceFile: vscode.Uri;
  helloTsUri: vscode.Uri;
  testerTsUri: vscode.Uri;
  configurePostStart: typeof configurePostStart;
};

export const configure = (htmlContainer?: HTMLElement): ConfigResult => {
  const workspaceFile = vscode.Uri.file(
    '/workspace/.vscode/workspace.code-workspace'
  );

  const wrapperConfig: WrapperConfig = {
    $type: 'extended',
    id: 'AAP',
    logLevel: LogLevel.Debug,
    htmlContainer,
    automaticallyDispose: true,
    vscodeApiConfig: {
      serviceOverrides: {
        ...getKeybindingsServiceOverride(),
        ...getLifecycleServiceOverride(),
        ...getLocalizationServiceOverride(createDefaultLocaleConfiguration()),
        ...getBannerServiceOverride(),
        ...getStatusBarServiceOverride(),
        ...getTitleBarServiceOverride(),
        ...getExplorerServiceOverride(),
        ...getRemoteAgentServiceOverride(),
        ...getEnvironmentServiceOverride(),
        ...getSecretStorageServiceOverride(),
        ...getStorageServiceOverride(),
        ...getSearchServiceOverride(),
      },
      enableExtHostWorker: true,
      viewsConfig: {
        viewServiceType: 'ViewsService',
        htmlAugmentationInstructions: defaultHtmlAugmentationInstructions,
        viewsInitFunc: defaultViewsInit,
      },
      workspaceConfig: {
        enableWorkspaceTrust: true,
        windowIndicator: {
          label: 'mlc-app-playground',
          tooltip: '',
          command: '',
        },
        workspaceProvider: {
          trusted: true,
          async open() {
            window.open(window.location.href);
            return true;
          },
          workspace: {
            workspaceUri: workspaceFile,
          },
        },
        configurationDefaults: {
          'window.title':
            'BlockFirst Task${separator}${dirty}${activeEditorShort}',
        },
        productConfiguration: {
          nameShort: 'mlc-app-playground',
          nameLong: 'mlc-app-playground',
        },
      },
      userConfiguration: {
        json: JSON.stringify({
          'workbench.colorTheme': 'Default Dark Blockfirst',
          'editor.wordBasedSuggestions': 'off',
          'typescript.tsserver.web.projectWideIntellisense.enabled': true,
          'typescript.tsserver.web.projectWideIntellisense.suppressSemanticErrors':
            false,
          'editor.guides.bracketPairsHorizontal': true,
          'oct.serverUrl': 'https://api.open-collab.tools/',
          'editor.experimental.asyncTokenization': false,
        }),
      },
    },
    extensions: [
      {
        config: {
          name: 'mlc-app-playground',
          publisher: 'TypeFox',
          version: '1.0.0',
          engines: {
            vscode: '*',
          },
        },
      },
    ],
    editorAppConfig: {
      monacoWorkerFactory: configureDefaultWorkerFactory,
    },
  };

  const helloTsUri = vscode.Uri.file('/workspace/hello.ts');
  const testerTsUri = vscode.Uri.file('/workspace/tester.ts');
  const fileSystemProvider = new RegisteredFileSystemProvider(false);
  fileSystemProvider.registerFile(
    new RegisteredMemoryFile(helloTsUri, `console.log('Hello, world!');`)
  );
  fileSystemProvider.registerFile(
    new RegisteredMemoryFile(testerTsUri, `console.log('Hello, world!');`)
  );
  fileSystemProvider.registerFile(
    createDefaultWorkspaceFile(workspaceFile, '/workspace')
  );
  registerFileSystemOverlay(1, fileSystemProvider);

  return {
    wrapperConfig,
    workspaceFile,
    helloTsUri,
    testerTsUri,
    configurePostStart,
  };
};
