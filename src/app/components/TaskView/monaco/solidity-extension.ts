import { IMenu } from '@codingame/monaco-vscode-api/vscode/vs/platform/actions/common/actions';

export const solidityManifest = {
  "name": "solidity",
  displayName:"%displayName%",
  "description": "Ethereum Solidity Language for Visual Studio Code",
  "version": "0.0.184",
  "publisher": "JuanBlanco",
  "license": "MIT",
  "engines": {
    "vscode": "*"
  },
  "contributors": [
    "Juan Blanco"
  ],
  "categories": [
    "Programming Languages",
    "Snippets"
  ],
  "bin": {
    "vscode-solidity-server": "./dist/cli/server.js"
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "package": "vsce package",
    "prepublishOnly": "tsc --noEmit && npm run build:cli",
    "build:cli": "tsup src/server.ts -d dist/cli && node scripts/add_shebang.js dist/cli/server.js && node scripts/add_cmd_wrapper.js",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "test": "nyc --require ts-node/register --require source-map-support/register mocha test/**/*.spec.ts",
    "prestandalonebuild": "node scripts/pre-standalone-build.js",
    "poststandalonebuild": "node scripts/post-standalone-build.js",
    "standalone:build": "npm run prestandalonebuild && npm run build:cli && npm run poststandalonebuild",
    "publish": "npm run prestandalonebuild && npm run build:cli && npm publish --ignore-scripts && npm run poststandalonebuild"
  },
  "dependencies": {
    "@iarna/toml": "^2.2.5",
    "axios": "^1.4.0",
    "fs-extra": "^4.0.3",
    "glob": "^8.1.0",
    "@vscode/vsce": "^2.23.0",
    "nethereum-codegen-old": "npm:nethereum-codegen@^1.0.26",
    "nethereum-codegen": "npm:nethereum-codegen@^2.0.6",
    "prettier": "^3.2.4",
    "prettier-plugin-solidity": "^1.3.1",
    "solc": "^0.8.29",
    "solhint": "^5.0.5",
    "solium": "^1.2.5",
    "solparse-exp-jb": "4.0.0",
    "vscode-languageclient": "^8.1.0",
    "vscode-languageserver": "^8.1.0",
    "vscode-languageserver-textdocument": "^1.0.8",
    "vscode-uri": "3.0.2",
    "yaml-js": "0.2.3"
  },
  "devDependencies": {
    "@types/node": "^11.15.3",
    "@types/vscode": "^1.77.0",
    "ts-node": "^7.0.1",
    "tslint": "^5.20.1",
    "tsup": "^7.1.0",
    "typescript": "^5.0.4",
    "vsce": "^2.12.0"
  },
  "nyc": {
    "extension": [
      ".ts"
    ],
    "include": [
      "src/**/*.ts"
    ],
    "exclude": [
      "**/*.d.ts",
      "out",
      "dist"
    ],
    "all": true
  },
  "contributes": {
    "configuration": {
      "type": "object",
      "title": "Solidity configuration",
      "properties": {
        "solidity.nodemodulespackage": {
          "type": "string",
          "default": "solc",
          "description": "The node modules package to find the solcjs compiler"
        },
        "solidity.compileUsingRemoteVersion": {
          "type": "string",
          "default": "latest",
          "description": "Configuration to download a 'remote' solc (js) version binary file from 'https://binaries.soliditylang.org/', for example: 'latest' will always use the latest version, or a specific version like: 'v0.4.3+commit.2353da71', use the command 'Solidity: Get solidity releases' to list all versions available, or just right click in a solidity file and select either `Solidity: Change global compiler version (Remote)` or `Solidity: Change workspace compiler version (Remote)` to use the wizard to set the correct version or setting for either the current workspace or globally"
        },
        "solidity.compilerOptimization": {
          "type": "number",
          "default": 200,
          "description": "Optimize for how many times you intend to run the code. Lower values will optimize more for initial deployment cost, higher values will optimize more for high-frequency usage."
        },
        "solidity.evmVersion": {
          "type": "string",
          "default": "",
          "description": "Evm version, ie london, istanbul, petersburg, constantinople, byzantium, tangerineWhistle, spuriousDragon, homestead, frontier, or leave it blank for the default evm version"
        },
        "solidity.viaIR": {
          "type": "boolean",
          "default": false,
          "description": "Compile using the intermediate representation (IR) instead of the AST"
        },
        "solidity.compileUsingLocalVersion": {
          "type": "string",
          "default": "",
          "description": "Compile using a local solc (js) binary file, please include the path of the file if wanted: 'C://v0.4.3+commit.2353da71.js'"
        },
        "solidity.defaultCompiler": {
          "type": "string",
          "description": "Sets the default compiler and compiler configuration to use. Remote will use the configured compiler using the setting 'compileUsingRemoteVersion' downloaded from https://binaries.soliditylang.org/', `localFile` will use the solc file in the location configured in the setting: `compileUsingLocalVersion`, `localNodeModule` will attempt to find the solc file in the node_modules folder / package configured on 'nodemodulespackage' and 'embedded' which will use the solc version packaged with the extension. The default is 'remote' which is configured as 'latest'",
          "enum": [
            "remote",
            "localFile",
            "localNodeModule",
            "embedded"
          ],
          "default": "remote"
        },
        "solidity.linter": {
          "type": "string",
          "enum": [
            "",
            "solhint",
            "solium"
          ],
          "default": "solhint",
          "description": "Enables linting using either solium (ethlint) or solhint. Possible options 'solhint' and 'solium', the default is solhint"
        },
        "solidity.solhintRules": {
          "type": [
            "object"
          ],
          "default": null,
          "description": "Solhint linting validation rules"
        },
        "solidity.formatter": {
          "type": "string",
          "default": "prettier",
          "enum": [
            "none",
            "prettier",
            "forge"
          ],
          "description": "Enables / disables the solidity formatter prettier (default) or forge (note it needs to be installed)"
        },
        "solidity.soliumRules": {
          "type": [
            "object"
          ],
          "default": {
            "imports-on-top": 0,
            "variable-declarations": 0,
            "indentation": [
              "off",
              4
            ],
            "quotes": [
              "off",
              "double"
            ]
          },
          "description": "Solium linting validation rules"
        },
        "solidity.enabledAsYouTypeCompilationErrorCheck": {
          "type": "boolean",
          "default": true,
          "description": "Enables as you type compilation of the document and error highlighting"
        },
        "solidity.validationDelay": {
          "type": "number",
          "default": 1500,
          "description": "Delay to trigger the validation of the changes of the current document (compilation, solium)"
        },
        "solidity.packageDefaultDependenciesDirectory": {
          "type": [
            "string",
            "string[]"
          ],
          "default": [
            "node_modules",
            "lib"
          ],
          "description": "Default directory for Packages Dependencies, i.e: 'node_modules', 'lib'. This is used to avoid typing imports with that path prefix, multiple dependency paths can be set as an array: ['node_modules', 'lib'] "
        },
        "solidity.monoRepoSupport": {
          "type": "boolean",
          "default": true,
          "description": "Enables mono repo support in the current workspace, a project folder will be signaled if a file is found on the current folder or above including: remappings.txt, truffle-config.js, brownie-config.yaml, foundry.toml, hardhat.config.js, hardhat.config.ts, dappfile"
        },
        "solidity.packageDefaultDependenciesContractsDirectory": {
          "type": [
            "string",
            "string[]"
          ],
          "default": [
            "src",
            "contracts",
            ""
          ],
          "description": "Default directory where the Package Dependency store its contracts, i.e: 'src', 'contracts', or just a blank string '', this is used to avoid typing imports with subfolder paths"
        },
        "solidity.remappings": {
          "type": "array",
          "default": [],
          "description": "Remappings to resolve contracts to local files / directories, i.e: [\"@openzeppelin/=lib/openzeppelin-contracts\",\"ds-test/=lib/ds-test/src/\"]"
        },
        "solidity.remappingsWindows": {
          "type": "array",
          "default": [],
          "description": "Windows Remappings to resolve contracts to local Windows files / directories (Note this overrides the generic remapping settings if the OS is Windows) , i.e: [\"@openzeppelin/=C:/lib/openzeppelin-contracts\",\"ds-test/=C:/lib/ds-test/src/\"]"
        },
        "solidity.remappingsUnix": {
          "type": "array",
          "default": [],
          "description": "Unix Remappings to resolve contracts to local Unix files / directories (Note this overrides the generic remapping settings if the OS is Unix based), i.e: [\"@openzeppelin/=/opt/lib/openzeppelin-contracts\",\"ds-test/=/opt/lib/ds-test/src/\"]"
        },
        "solidity.explorer_etherscan_apikey": {
          "type": "string",
          "default": "YourApiKey",
          "description": "Api key for downloading ethereum smart contracts from etherscan.io"
        },
        "solidity.explorer_etherscan_optimism_apikey": {
          "type": "string",
          "default": "YourApiKey",
          "description": "Api key for downloading optimism smart contracts from api-optimistic.etherscan.io"
        },
        "solidity.explorer_bscscan_apikey": {
          "type": "string",
          "default": "YourApiKey",
          "description": "Api key for downloading Binance smart chain smart contracts from api.bscscan.com"
        },
        "solidity.explorer_polygonscan_apikey": {
          "type": "string",
          "default": "YourApiKey",
          "description": "Api key for downloading polygon smart contracts from api.polygonscan.com"
        }
      }
    },
    "languages": [
      {
        "id": "solidity",
        "aliases": [
          "Solidity",
          "solidity"
        ],
        "extensions": [
          ".sol"
        ],
        "configuration": "./solidity.configuration.json"
      },
      {
        "id": "solidity-markdown-injection"
      },
      {
        "id": "json",
        "aliases": [
          "JSON",
          "json"
        ],
        "extensions": [
          ".nethereum-gen.multisettings"
        ]
      }
    ],
    "configurationDefaults": {
      "[json]": {
        "files.associations": {
          "nethereum-gen.multisettings": "json",
          "nethereum-gen.settings": "json"
        }
      }
    },
    "commands": [
      {
        "command": "solidity.compile.active",
        "title": "Solidity: Compile Contract"
      },
      {
        "command": "solidity.compile.activeUsingRemote",
        "title": "Solidity: Compile with configured Remote version"
      },
      {
        "command": "solidity.compile.activeUsingLocalFile",
        "title": "Solidity: Compile with configured Local solc file"
      },
      {
        "command": "solidity.compile.activeUsingNodeModule",
        "title": "Solidity: Compile with configured Node module"
      },
      {
        "command": "solidity.compile",
        "title": "Solidity: Compile All"
      },
      {
        "command": "solidity.compilerInfo",
        "title": "Solidity: Compiler Information"
      },
      {
        "command": "solidity.solcReleases",
        "title": "Solidity: Get solidity releases"
      },
      {
        "command": "solidity.codegenNethereumCodeGenSettings",
        "title": "Solidity: Create 'nethereum-gen.settings' with default values at root"
      },
      {
        "command": "solidity.codegenCSharpProject",
        "title": "Solidity: Code generate CSharp contract definition"
      },
      {
        "command": "solidity.compileAndCodegenCSharpProject",
        "title": "Solidity: Compile and Code generate CSharp contract definition"
      },
      {
        "command": "solidity.codegenVbNetProject",
        "title": "Solidity: Code generate VB.Net contract definition"
      },
      {
        "command": "solidity.compileAndCodegenVbNetProject",
        "title": "Solidity: Compile and Code generate VB.Net contract definition"
      },
      {
        "command": "solidity.codegenFSharpProject",
        "title": "Solidity: Code generate FSharp contract definition"
      },
      {
        "command": "solidity.compileAndCodegenFSharpProject",
        "title": "Solidity: Compile and Code generate FSharp contract definition"
      },
      {
        "command": "solidity.codegenCSharpProjectAll",
        "title": "Solidity: Code generate CSharp Project from all compiled files"
      },
      {
        "command": "solidity.codegenVbNetProjectAll",
        "title": "Solidity: Code generate VB.Net Project from all compiled files"
      },
      {
        "command": "solidity.codegenFSharpProjectAll",
        "title": "Solidity: Code generate FSharp Project from all compiled files"
      },
      {
        "command": "solidity.codegenCSharpProjectAllAbiCurrent",
        "title": "Solidity: Code generate CSharp Definitions for Abi files in current folder"
      },
      {
        "command": "solidity.codegenVbNetProjectAllAbiCurrent",
        "title": "Solidity: Code generate VB.Net Definitions for Abi files in current folder"
      },
      {
        "command": "solidity.codegenFSharpProjectAllAbiCurrent",
        "title": "Solidity: Code generate FSharp Definitions for Abi files in current folder"
      },
      {
        "command": "solidity.codeGenFromNethereumGenAbisFile",
        "title": "Solidity: Code generate Definitions for Abi files in selected 'nethereum-gen.multisettings'"
      },
      {
        "command": "solidity.fixDocument",
        "title": "Solidity: Fix document rules using Solium"
      },
      {
        "command": "solidity.selectWorkspaceRemoteSolcVersion",
        "title": "Solidity: Change workspace compiler version (Remote)"
      },
      {
        "command": "solidity.selectGlobalRemoteSolcVersion",
        "title": "Solidity: Change global compiler version (Remote)"
      },
      {
        "command": "solidity.downloadRemoteSolcVersion",
        "title": "Solidity: Download compiler"
      },
      {
        "command": "solidity.downloadRemoteVersionAndSetLocalPathSetting",
        "title": "Solidity: Download compiler and set workspace local Path"
      },
      {
        "command": "solidity.changeDefaultCompilerType",
        "title": "Solidity: Change the default workspace compiler to Remote, Local, NodeModule, Embedded"
      },
      {
        "command": "solidity.downloadVerifiedSmartContractEtherscan",
        "title": "Solidity: Download from Etherscan"
      }
    ],
    "submenus": [
      {
        "id": "solidity.codegen.submenu",
        "label": "Solidity: Code Generation"
      },
      {
        "id": "solidity.compilerSettings.submenu",
        "label": "Solidity: Compiler Settings and Solc Versions"
      },
      {
        "id": "solidity.downloadVerifiedContracts.submenu",
        "label": "Solidity: Download smart contract source code / ABIs"
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "when": "resourceExtname == .abi || resourceExtname == .json",
          "command": "solidity.codegenCSharpProject"
        } as unknown as IMenu,
        {
          "when": "resourceExtname == .abi || resourceExtname == .json",
          "command": "solidity.codegenVbNetProject"
        } as unknown as IMenu,
        {
          "when": "resourceExtname == .abi || resourceExtname == .json",
          "command": "solidity.codegenFSharpProject"
        } as unknown as IMenu,
        {
          "when": "resourceExtname == .sol",
          "command": "solidity.compile.active"
        } as unknown as IMenu,
        {
          "when": "explorerResourceIsFolder || resourceExtname == .sol || resourceExtname == .abi",
          "command": "solidity.downloadVerifiedSmartContractEtherscan"
        } as unknown as IMenu,
        {
          "when": "resourceExtname == .sol",
          "command": "solidity.compile"
        } as unknown as IMenu
      ],
      "solidity.codegen.submenu": [
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.codegenNethereumCodeGenSettings",
          "group": "3_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compileAndCodegenCSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compileAndCodegenVbNetProject",
          "group": "3_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compileAndCodegenFSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenCSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenVbNetProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenFSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenCSharpProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenVbNetProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenFSharpProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "resourceFilename =~ /^(.*\\.)?nethereum-gen\\.multisettings$/",
          "command": "solidity.codeGenFromNethereumGenAbisFile",
          "group": "3_solidity"
        }
      ],
      "solidity.compilerSettings.submenu": [
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.changeDefaultCompilerType",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.solcReleases",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.selectGlobalRemoteSolcVersion",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.selectWorkspaceRemoteSolcVersion",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.downloadRemoteSolcVersion",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.downloadRemoteVersionAndSetLocalPathSetting",
          "group": "2_solidity"
        }
      ],
      "solidity.downloadVerifiedContracts.submenu": [
        {
          "when": "explorerResourceIsFolder || resourceExtname == .sol || resourceExtname == .abi",
          "command": "solidity.downloadVerifiedSmartContractEtherscan",
          "group": "2_solidity"
        }
      ],
      "editor/context": [
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compile.active",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compile",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compilerInfo",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compile.activeUsingRemote",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compile.activeUsingLocalFile",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "command": "solidity.compile.activeUsingNodeModule",
          "group": "1_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "submenu": "solidity.downloadVerifiedContracts.submenu",
          "group": "4_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "submenu": "solidity.compilerSettings.submenu",
          "group": "2_solidity"
        },
        {
          "when": "editorLangId == 'solidity'",
          "submenu": "solidity.codegen.submenu",
          "group": "3_solidity"
        },
        {
          "when": "resourceFilename =~ /^(.*\\.)?nethereum-gen\\.multisettings$/",
          "command": "solidity.codeGenFromNethereumGenAbisFile",
          "group": "3_solidity"
        }
      ],
      "explorer/context": [
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenCSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenVbNetProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenFSharpProject",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .sol",
          "command": "solidity.compile.active",
          "group": "2_solidity"
        },
        {
          "when": "resourceExtname == .sol",
          "command": "solidity.compile",
          "group": "2_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenCSharpProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenVbNetProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "resourceExtname == .abi",
          "command": "solidity.codegenFSharpProjectAllAbiCurrent",
          "group": "3_solidity"
        },
        {
          "when": "explorerResourceIsFolder || resourceExtname == .sol || resourceExtname == .abi",
          "command": "solidity.downloadVerifiedSmartContractEtherscan",
          "group": "2_solidity"
        },
        {
          "when": "resourceFilename =~ /^(.*\\.)?nethereum-gen\\.multisettings$/",
          "command": "solidity.codeGenFromNethereumGenAbisFile",
          "group": "3_solidity"
        }
      ]
    },
    "keybindings": [
      {
        "command": "solidity.compile.active",
        "key": "f5",
        "mac": "f5",
        "when": "editorTextFocus && editorLangId == 'solidity'"
      },
      {
        "command": "solidity.compile",
        "key": "Ctrl+f5",
        "mac": "Cmd+f5",
        "when": "editorTextFocus && editorLangId == 'solidity'"
      }
    ],
    "snippets": [
      {
        "language": "solidity",
        "path": "./snippets/solidity.json"
      }
    ],
    "grammars": [
      {
        "language": "solidity",
        "scopeName": "source.solidity",
        "path": "./syntaxes/solidity.json",
        "balancedBracketScopes": [
          "*"
        ],
        "unbalancedBracketScopes": [
          "meta.scope.case-pattern.solidity"
        ]
      },
      {
        "language": "solidity-markdown-injection",
        "scopeName": "markdown.solidity.codeblock",
        "path": "./syntaxes/solidity-markdown-injection.json",
        "injectTo": [
          "text.html.markdown"
        ],
        "embeddedLanguages": {
          "meta.embedded.block.solidity": "solidity"
        }
      }
    ]
  }
};
