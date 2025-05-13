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
import getLocalizationServiceOverride, {
  LocalizationOptions,
} from '@codingame/monaco-vscode-localization-service-override';
import getBannerServiceOverride from '@codingame/monaco-vscode-view-banner-service-override';
import getStatusBarServiceOverride from '@codingame/monaco-vscode-view-status-bar-service-override';
import getTitleBarServiceOverride from '@codingame/monaco-vscode-view-title-bar-service-override';
import getExplorerServiceOverride from '@codingame/monaco-vscode-explorer-service-override';
import getRemoteAgentServiceOverride from '@codingame/monaco-vscode-remote-agent-service-override';
import getEnvironmentServiceOverride from '@codingame/monaco-vscode-environment-service-override';
import getSecretStorageServiceOverride from '@codingame/monaco-vscode-secret-storage-service-override';
import getStorageServiceOverride from '@codingame/monaco-vscode-storage-service-override';
import getSearchServiceOverride from '@codingame/monaco-vscode-search-service-override';
// import './solidity-extension';
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
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from 'vscode-ws-jsonrpc';
import { createUrl } from 'monaco-languageclient/tools';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { solidityManifest } from './solidity-extension';

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

const {
  registerFileUrl: registerFileUrlSolidity,
  whenReady: whenReadySolidity,
} = registerExtension(solidityManifest as any, undefined, {
  system: true,
}) as RegisterLocalExtensionResult;

registerFileUrlSolidity(
  './syntaxes/solidity.json',
  new URL('./solidity/syntaxes/solidity.json', import.meta.url).toString()
);

registerFileUrlSolidity(
  './syntaxes/solidity-markdown-injection.json',
  new URL(
    './solidity/syntaxes/solidity-markdown-injection.json',
    import.meta.url
  ).toString()
);

registerFileUrlSolidity(
  './snippets/solidity.json',
  new URL('./solidity/snippets/solidity.json', import.meta.url).toString()
);

registerFileUrlSolidity(
  './solidity.configuration.json',
  new URL('./solidity/solidity.configuration.json', import.meta.url).toString()
);

const toolboxSvgIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6667 12.168H10C9.72667 12.168 9.5 11.9413 9.5 11.668C9.5 11.3946 9.72667 11.168 10 11.168H14.6667C14.94 11.168 15.1667 11.3946 15.1667 11.668C15.1667 11.9413 14.94 12.168 14.6667 12.168Z" fill="#33CF8E"/>
<path d="M3.33203 12.168H1.33203C1.0587 12.168 0.832031 11.9413 0.832031 11.668C0.832031 11.3946 1.0587 11.168 1.33203 11.168H3.33203C3.60536 11.168 3.83203 11.3946 3.83203 11.668C3.83203 11.9413 3.60536 12.168 3.33203 12.168Z" fill="#33CF8E"/>
<path d="M14.668 4.83203H12.668C12.3946 4.83203 12.168 4.60536 12.168 4.33203C12.168 4.0587 12.3946 3.83203 12.668 3.83203H14.668C14.9413 3.83203 15.168 4.0587 15.168 4.33203C15.168 4.60536 14.9413 4.83203 14.668 4.83203Z" fill="#33CF8E"/>
<path d="M5.9987 4.83203H1.33203C1.0587 4.83203 0.832031 4.60536 0.832031 4.33203C0.832031 4.0587 1.0587 3.83203 1.33203 3.83203H5.9987C6.27203 3.83203 6.4987 4.0587 6.4987 4.33203C6.4987 4.60536 6.27203 4.83203 5.9987 4.83203Z" fill="#33CF8E"/>
<path d="M8.66536 14.168H4.66536C3.5187 14.168 2.83203 13.4813 2.83203 12.3346V11.0013C2.83203 9.85464 3.5187 9.16797 4.66536 9.16797H8.66536C9.81203 9.16797 10.4987 9.85464 10.4987 11.0013V12.3346C10.4987 13.4813 9.81203 14.168 8.66536 14.168ZM4.66536 10.168C4.07203 10.168 3.83203 10.408 3.83203 11.0013V12.3346C3.83203 12.928 4.07203 13.168 4.66536 13.168H8.66536C9.2587 13.168 9.4987 12.928 9.4987 12.3346V11.0013C9.4987 10.408 9.2587 10.168 8.66536 10.168H4.66536Z" fill="#33CF8E"/>
<path d="M11.3333 6.83203H7.33333C6.18667 6.83203 5.5 6.14536 5.5 4.9987V3.66536C5.5 2.5187 6.18667 1.83203 7.33333 1.83203H11.3333C12.48 1.83203 13.1667 2.5187 13.1667 3.66536V4.9987C13.1667 6.14536 12.48 6.83203 11.3333 6.83203ZM7.33333 2.83203C6.74 2.83203 6.5 3.07203 6.5 3.66536V4.9987C6.5 5.59203 6.74 5.83203 7.33333 5.83203H11.3333C11.9267 5.83203 12.1667 5.59203 12.1667 4.9987V3.66536C12.1667 3.07203 11.9267 2.83203 11.3333 2.83203H7.33333Z" fill="#33CF8E"/>
</svg>
`;

// Define the SVG icon content
const resetSvgIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.32846 0.290992C8.53666 0.472392 8.55839 0.788229 8.37698 0.996431L7.33047 2.19757C7.54768 2.1782 7.77087 2.16798 8 2.16798C11.5899 2.16798 14.5 5.07812 14.5 8.66798C14.5 12.2578 11.5899 15.168 8 15.168C4.41015 15.168 1.5 12.2578 1.5 8.66798C1.5 7.33247 1.90331 6.08964 2.59486 5.05651C2.74847 4.82704 3.05902 4.76553 3.2885 4.91914C3.51797 5.07275 3.57948 5.3833 3.42587 5.61277C2.84105 6.48644 2.5 7.53662 2.5 8.66798C2.5 11.7055 4.96243 14.168 8 14.168C11.0376 14.168 13.5 11.7055 13.5 8.66798C13.5 5.63041 11.0376 3.16798 8 3.16798C7.72102 3.16798 7.45288 3.1854 7.19548 3.21757L8.62827 4.26423C8.85125 4.42712 8.89997 4.73993 8.73708 4.96291C8.57419 5.1859 8.26138 5.23461 8.0384 5.07172L5.70506 3.36722C5.59197 3.28461 5.51871 3.15834 5.50311 3.01915C5.48751 2.87997 5.53101 2.74062 5.62302 2.63502L7.62302 0.339521C7.80442 0.131318 8.12025 0.109591 8.32846 0.290992Z" fill="#F2F2F2"/>
</svg>`;

export const configurePostStart = async (
  wrapper: MonacoEditorLanguageClientWrapper,
  configResult: ConfigResult
) => {
  console.log('configurePostStart');
  const result = wrapper.getExtensionRegisterResult(
    'mlc-app-playground'
  ) as RegisterLocalProcessExtensionResult;
  result.setAsDefaultApi();

  // Activate the blockfirst extension
  const blockfirstExtension = wrapper.getExtensionRegisterResult(
    'BlockFirst.blockfirst'
  );
  if (blockfirstExtension) {
    (
      blockfirstExtension as RegisterLocalProcessExtensionResult
    ).setAsDefaultApi();
  }

  vscode.commands.registerCommand('myExtension.reset', (event) => {
    // Find the reset button element
    const resetButtonElement = document.querySelector(
      '[aria-label="Reset code"]'
    );
    let position = null;

    if (resetButtonElement instanceof HTMLElement) {
      const rect = resetButtonElement.getBoundingClientRect();
      position = {
        top: rect.bottom,
        left: rect.right, // Position at right edge of button
      };
    }

    // Send a message to the browser window
    const message = {
      command: 'resetButtonClicked',
      position,
    };

    // Use postMessage to communicate with the parent window
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*');
    } else {
      window.postMessage(message, '*');
    }
  });

  vscode.commands.registerCommand('myExtension.toolbox', () => {
    // Send a message to the browser window
    const message = {
      command: 'toolboxButtonClicked',
    };

    // Use postMessage to communicate with the parent window
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*');
    } else {
      window.postMessage(message, '*');
    }
  });

  // WA: Force show explorer and not search
  await vscode.commands.executeCommand('workbench.view.explorer');

  // taskdata is an object
  for (const [fileName, fileContent] of Object.entries(
    configResult.taskData.filesCode
  )) {
    const uri = vscode.Uri.file(`/workspace/contracts/${fileName}`);
    await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(uri, {
      preview: false,
    });
  }

  // await Promise.all([
  //   await vscode.workspace.openTextDocument(configResult.helloTsUri),
  //   // await vscode.workspace.openTextDocument(configResult.testerTsUri),
  // ]);

  // await Promise.all([
  //   await vscode.window.showTextDocument(configResult.helloTsUri),
  // ]);

  console.log('Application Playground started');
};
export type ConfigResult = {
  taskData: any;
  wrapperConfig: WrapperConfig;
  workspaceFile: vscode.Uri;
  // helloTsUri: vscode.Uri;
  // testerTsUri: vscode.Uri;
  configurePostStart: typeof configurePostStart;
};

export const configure = (
  taskData: any,
  htmlContainer?: HTMLElement
): ConfigResult => {
  console.log('Calling configure');
  const webSocket = new WebSocket(
    'wss://story.blindzone.org/lserver?authorization=UserAuth' //'ws://localhost:30001/lserver?authorization=UserAuth'
  );

  const iWebSocket = toSocket(webSocket);
  const reader = new WebSocketMessageReader(iWebSocket);
  const writer = new WebSocketMessageWriter(iWebSocket);

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
          command: 'workbench.action.webview.openDeveloperTools',
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
      {
        config: {
          name: 'blockfirst',
          publisher: 'BlockFirst',
          version: '1.0.0',
          engines: {
            vscode: '*',
          },
          contributes: {
            menus: {
              'editor/title': [
                {
                  command: 'myExtension.toolbox',
                  when: 'editorIsOpen',
                  group: 'navigation',
                },
                {
                  command: 'myExtension.reset',
                  when: 'editorIsOpen',
                  group: 'navigation',
                },
              ],
            },
            commands: [
              {
                command: 'myExtension.toolbox',
                title: 'Open toolbox',
                icon: './assets/toolbox.svg',
              },
              {
                command: 'myExtension.reset',
                title: 'Reset code',
                icon: './assets/reset.svg',
              },
            ],
          },
        },
        filesOrContents: new Map([
          [
            './assets/reset.svg',
            new URL(`data:image/svg+xml;base64,${btoa(resetSvgIcon)}`),
          ],
          [
            './assets/toolbox.svg',
            new URL(`data:image/svg+xml;base64,${btoa(toolboxSvgIcon)}`),
          ],
        ]),
      },
    ],
    editorAppConfig: {
      monacoWorkerFactory: configureDefaultWorkerFactory,
      codeResources: {
        modified: {
          text: 'code',
          uri: '/workspace/test.groovy',
        },
      },
    },
    languageClientConfigs: {
      configs: {
        python: {
          name: 'Python Language Server Example',
          connection: {
            options: {
              $type: 'WebSocketDirect',
              webSocket: webSocket,
              startOptions: {
                onCall: (languageClient?: MonacoLanguageClient) => {
                  console.log('Oncall', languageClient);

                  // setTimeout(() => {
                  //   [
                  //     'pyright.restartserver',
                  //     'pyright.organizeimports',
                  //   ].forEach((cmdName) => {
                  //     vscode.commands.registerCommand(
                  //       cmdName,
                  //       (...args: unknown[]) => {
                  //         languageClient?.sendRequest(
                  //           'workspace/executeCommand',
                  //           { command: cmdName, arguments: args }
                  //         );
                  //       }
                  //     );
                  //   });
                  // }, 250);
                },
                reportStatus: true,
              },
            },
            messageTransports: { reader, writer },
          },
          clientOptions: {
            documentSelector: ['solidity'],
            workspaceFolder: {
              index: 0,
              name: 'workspace',
              uri: '/workspace' as unknown as vscode.Uri,
            },
          },
        },
      },
    },
  };

  const fileSystemProvider = new RegisteredFileSystemProvider(false);

  for (const [fileName, fileContent] of Object.entries(taskData.filesCode)) {
    const uri = vscode.Uri.file(`/workspace/contracts/${fileName}`);
    fileSystemProvider.registerFile(
      new RegisteredMemoryFile(uri, fileContent as string)
    );
  }

  // const helloTsUri = vscode.Uri.file('playground/workspace/contracts/Lock.sol');
  // const testerTsUri = vscode.Uri.file('/workspace/tester.ts');
  // const fileSystemProvider = new RegisteredFileSystemProvider(false);
  // fileSystemProvider.registerFile(
  //   new RegisteredMemoryFile(helloTsUri, `console.log('Hello, world!');`)
  // );
  // fileSystemProvider.registerFile(
  //   new RegisteredMemoryFile(testerTsUri, `console.log('Hello, world!');`)
  // );
  fileSystemProvider.registerFile(
    createDefaultWorkspaceFile(workspaceFile, '/workspace')
  );
  registerFileSystemOverlay(1, fileSystemProvider);

  return {
    wrapperConfig,
    workspaceFile,
    taskData,
    // helloTsUri,
    // testerTsUri,
    configurePostStart,
  };
};
