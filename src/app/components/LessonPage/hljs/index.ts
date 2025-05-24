/**
 * highlight.js Solidity syntax highlighting definition
 *
 * @see https://github.com/isagalaev/highlight.js
 *
 * @package: highlightjs-solidity
 * @author:  Sam Pospischil <sam@changegiving.com>
 * @since:   2016-07-01
 */

import solidityGrammar from './languages/solidity';
import yulGrammar from './languages/yul';

// Define a basic interface for hljs to provide type safety
interface HLJSApi {
  registerLanguage(name: string, language: (hljs: HLJSApi) => any): void;
}

export default function (hljs: HLJSApi) {
  hljs.registerLanguage('solidity', solidityGrammar);
  hljs.registerLanguage('yul', yulGrammar);
}

export { solidityGrammar as solidity, yulGrammar as yul };
