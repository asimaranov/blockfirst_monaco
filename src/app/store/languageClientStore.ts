import { create } from 'zustand';
import { type MonacoLanguageClient } from 'monaco-languageclient';

interface LanguageClientState {
  languageClient: MonacoLanguageClient | null;
  setLanguageClient: (client: MonacoLanguageClient | null) => void;
}

export const useLanguageClientStore = create<LanguageClientState>((set) => ({
  languageClient: null,
  setLanguageClient: (client) => set({ languageClient: client }),
}));
