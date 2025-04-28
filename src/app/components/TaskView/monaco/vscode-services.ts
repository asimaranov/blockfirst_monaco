'use client';
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  registerExtension,
  RegisterLocalExtensionResult,
} from '@codingame/monaco-vscode-api/extensions';

import * as monaco from '@codingame/monaco-vscode-editor-api';
import 'vscode/localExtensionHost';
import {
  initialize,
  type IWorkbenchConstructionOptions,
} from '@codingame/monaco-vscode-api';
import type { OpenEditor } from '@codingame/monaco-vscode-editor-service-override';
import type { WorkerConfig } from '@codingame/monaco-vscode-extensions-service-override';
import getConfigurationServiceOverride, {
  initUserConfiguration,
} from '@codingame/monaco-vscode-configuration-service-override';
import getExtensionServiceOverride from '@codingame/monaco-vscode-extensions-service-override';
import getLanguagesServiceOverride from '@codingame/monaco-vscode-languages-service-override';
import getModelServiceOverride from '@codingame/monaco-vscode-model-service-override';
import getLogServiceOverride from '@codingame/monaco-vscode-log-service-override';
import type { LocalizationOptions } from '@codingame/monaco-vscode-localization-service-override';
import type { EnvironmentOverride } from '@codingame/monaco-vscode-api/workbench';
import { setUnexpectedErrorHandler } from '@codingame/monaco-vscode-api/monaco';
import {
  ConsoleLogger as VSCodeConsoleLogger,
  type ILogger,
} from '@codingame/monaco-vscode-log-service-override';
import { LogLevel } from '@codingame/monaco-vscode-api';

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

export interface Logger extends ILogger {
  createErrorAndLog(message: string, ...params: unknown[]): Error;
}
/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

export class FakeWorker {
  url: string | URL;
  options?: WorkerOptions;

  constructor(url: string | URL, options?: WorkerOptions) {
    this.url = url;
    this.options = options;
  }
}

export interface MonacoEnvironmentEnhanced extends monaco.Environment {
  vscodeInitialising?: boolean;
  vscodeApiInitialised?: boolean;
}

export interface UserConfiguration {
  json?: string;
}
export interface ViewsConfig {
  viewServiceType: 'EditorService' | 'ViewsService' | 'WorkspaceService';
  openEditorFunc?: OpenEditor;
  htmlAugmentationInstructions?: (
    htmlContainer: HTMLElement | null | undefined
  ) => void;
  viewsInitFunc?: () => Promise<void>;
}

export interface VscodeApiConfig {
  vscodeApiInitPerformExternally?: boolean;
  loadThemes?: boolean;
  serviceOverrides?: monaco.editor.IEditorOverrideServices;
  enableExtHostWorker?: boolean;
  workspaceConfig?: IWorkbenchConstructionOptions;
  userConfiguration?: UserConfiguration;
  viewsConfig?: ViewsConfig;
  envOptions?: EnvironmentOverride;
}

export interface InitServicesInstructions {
  htmlContainer?: HTMLElement;
  caller?: string;
  performServiceConsistencyChecks?: () => boolean;
  logger?: Logger;
}

export const initEnhancedMonacoEnvironment = () => {
  const monWin = self as Window;
  if (!monWin.MonacoEnvironment) {
    monWin.MonacoEnvironment = {};
  }
  const envEnhanced = monWin.MonacoEnvironment as MonacoEnvironmentEnhanced;
  if (envEnhanced.vscodeApiInitialised === undefined) {
    envEnhanced.vscodeApiInitialised = false;
  }
  if (envEnhanced.vscodeInitialising === undefined) {
    envEnhanced.vscodeInitialising = false;
  }

  return envEnhanced;
};

export const getMonacoEnvironmentEnhanced = () => {
  const monWin = self as Window;
  return monWin.MonacoEnvironment as MonacoEnvironmentEnhanced;
};

export const supplyRequiredServices = async () => {
  return {
    ...getConfigurationServiceOverride(),
    ...getLanguagesServiceOverride(),
    ...getLogServiceOverride(),
    ...getModelServiceOverride(),
  };
};

export const reportServiceLoading = (
  services: monaco.editor.IEditorOverrideServices,
  logger?: Logger
) => {
  for (const serviceName of Object.keys(services)) {
    logger?.debug(`Loading service: ${serviceName}`);
  }
};

export const mergeServices = (
  overrideServices: monaco.editor.IEditorOverrideServices,
  services?: monaco.editor.IEditorOverrideServices
) => {
  if (services !== undefined) {
    for (const [name, service] of Object.entries(services)) {
      overrideServices[name] = service;
    }
  }
};

export const initServices = async (
  vscodeApiConfig: VscodeApiConfig,
  instructions?: InitServicesInstructions
) => {
  const envEnhanced = initEnhancedMonacoEnvironment();

  if (!(envEnhanced.vscodeInitialising ?? false)) {
    if (envEnhanced.vscodeApiInitialised ?? false) {
      instructions?.logger?.debug(
        'Initialization of vscode services can only performed once!'
      );
    } else {
      envEnhanced.vscodeInitialising = true;
      instructions?.logger?.debug(
        `Initializing vscode services. Caller: ${instructions.caller ?? 'unknown'}`
      );

      if (vscodeApiConfig.userConfiguration?.json !== undefined) {
        await initUserConfiguration(vscodeApiConfig.userConfiguration.json);
      }
      await importAllServices(vscodeApiConfig, instructions);

      vscodeApiConfig.viewsConfig?.htmlAugmentationInstructions?.(
        instructions?.htmlContainer
      );
      await vscodeApiConfig.viewsConfig?.viewsInitFunc?.();
      instructions?.logger?.debug(
        'Initialization of vscode services completed successfully.'
      );

      envEnhanced.vscodeApiInitialised = true;
      envEnhanced.vscodeInitialising = false;
    }
  }

  return envEnhanced.vscodeApiInitialised;
};

/**
 * monaco-vscode-api automatically loads the following services:
 *  - layout
 *  - environment
 *  - extension
 *  - files
 *  - quickAccess
 * monaco-languageclient always adds the following services:
 *   - languages
 *   - log
 *   - model
 */
export const importAllServices = async (
  vscodeApiConfig: VscodeApiConfig,
  instructions?: InitServicesInstructions
) => {
  const services = await supplyRequiredServices();

  mergeServices(services, vscodeApiConfig.serviceOverrides);
  await configureExtHostWorker(
    vscodeApiConfig.enableExtHostWorker === true,
    services
  );

  reportServiceLoading(services, instructions?.logger);

  if (
    instructions?.performServiceConsistencyChecks === undefined ||
    (typeof instructions.performServiceConsistencyChecks === 'function' &&
      instructions.performServiceConsistencyChecks())
  ) {
    if (
      vscodeApiConfig.viewsConfig?.viewServiceType === 'ViewsService' ||
      vscodeApiConfig.viewsConfig?.viewServiceType === 'WorkspaceService'
    ) {
      await initialize(
        services,
        instructions?.htmlContainer,
        vscodeApiConfig.workspaceConfig,
        vscodeApiConfig.envOptions
      );
    } else {
      await initialize(
        services,
        undefined,
        vscodeApiConfig.workspaceConfig,
        vscodeApiConfig.envOptions
      );
    }
  }

  setUnexpectedErrorHandler((e) => {
    instructions?.logger?.createErrorAndLog('Unexpected error', e);
  });
};

/**
 * Enable ext host to run in a worker
 */
export const configureExtHostWorker = async (
  enableExtHostWorker: boolean,
  userServices: monaco.editor.IEditorOverrideServices
) => {
  if (enableExtHostWorker) {
    const fakeWorker = new FakeWorker(
      new URL(
        '@codingame/monaco-vscode-api/workers/extensionHost.worker',
        import.meta.url
      ),
      { type: 'module' }
    );
    const workerConfig: WorkerConfig = {
      url: fakeWorker.url.toString(),
      options: fakeWorker.options,
    };

    mergeServices(userServices, {
      ...getExtensionServiceOverride(workerConfig),
    });
  }
};

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
