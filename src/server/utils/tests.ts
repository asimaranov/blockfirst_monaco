/**
 * Extracts test names from test code blocks
 * @param testsCode String containing test code with it("...") blocks
 * @returns Array of test names
 */
export function extractTestNames(testsCode: string): string[] {
  if (!testsCode) return [];

  const testNameRegex = /it\s*\(\s*["'](.*?)["']/g;
  const matches = [...testsCode.matchAll(testNameRegex)];

  return matches.map((match) => match[1]);
}
