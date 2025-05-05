import { create } from 'zustand';

type ResetStoreState = {
  isResetModalOpen: boolean;
  buttonPosition: { top: number; left: number } | null;
  openResetModal: (position: { top: number; left: number }) => void;
  closeResetModal: () => void;
  resetCode: () => void;
};

export const useResetStore = create<ResetStoreState>((set) => ({
  isResetModalOpen: false,
  buttonPosition: null,

  openResetModal: (position) =>
    set({
      isResetModalOpen: true,
      buttonPosition: position,
    }),

  closeResetModal: () =>
    set({
      isResetModalOpen: false,
      buttonPosition: null,
    }),

  resetCode: () => {
    // Execute the VS Code reset command
    try {
      // @ts-ignore - vscode is available in the monaco editor context
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        command: 'myExtension.reset',
      });
    } catch (error) {
      console.error('Failed to execute reset command:', error);
    }

    // Close the modal after reset
    set({ isResetModalOpen: false, buttonPosition: null });
  },
}));
