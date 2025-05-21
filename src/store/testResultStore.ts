import { create } from 'zustand';

interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  failureId?: string;
}

interface TestResults {
  passing: TestResult[];
  failing: TestResult[];
  all: TestResult[];
  failureDetails: Record<string, string>;
  summary?: string;
}

interface TestResultState {
  testResults: TestResults | null;
  currentTest: TestResult | null;
  isRunningTests: boolean;

  // Actions
  setTestResults: (results: TestResults | null) => void;
  setCurrentTest: (test: TestResult | null) => void;
  setIsRunningTests: (isRunning: boolean) => void;
  resetTestResults: () => void;
}

export const useTestResultStore = create<TestResultState>((set) => ({
  testResults: null,
  currentTest: null,
  isRunningTests: false,

  setTestResults: (results) => {
    console.log('Setting test results:', results);
    set({ testResults: results });
  },
  setCurrentTest: (test) => {
    console.log('Setting current test:', test);
    set({ currentTest: test });
  },
  setIsRunningTests: (isRunning) => {
    console.log('Setting isRunningTests:', isRunning);
    set({ isRunningTests: isRunning });
  },
  resetTestResults: () => {
    console.log('Resetting test resuls');
    set({
      testResults: null,
      currentTest: null,
      isRunningTests: false,
    });
  },
}));
