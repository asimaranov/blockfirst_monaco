import { create } from 'zustand';
import { RefObject } from 'react';

interface MonacoEditorState {
  editorReady: boolean;
  iframeLoaded: boolean;
  iframeKey: number;
  showActionBar: boolean;

  setEditorReady: (ready: boolean) => void;
  setShowActionBar: (show: boolean) => void;
  setIframeKey: (key: number) => void;
  setIframeLoaded: (loaded: boolean) => void;
  resetEditor: () => void;
}

export const useMonacoEditorStore = create<MonacoEditorState>((set) => ({
  iframeRef: null,
  iframeKey: 0,
  editorReady: false,
  iframeLoaded: false,
  showActionBar: true,

  setEditorReady: (ready) => set({ editorReady: ready }),
  setShowActionBar: (show) => set({ showActionBar: show }),
  setIframeKey: (key) => set({ iframeKey: key }),
  setIframeLoaded: (loaded) => set({ iframeLoaded: loaded }),
  resetEditor: () =>
    set({
      editorReady: false,
      iframeLoaded: false,
    }),
}));
