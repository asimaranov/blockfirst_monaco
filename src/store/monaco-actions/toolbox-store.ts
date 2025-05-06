import { create } from 'zustand';

type ToolsStoreState = {
  isToolboxModalOpen: boolean;
  openToolboxModal: () => void;
  closeToolboxModal: () => void;
};

export const useToolboxStore = create<ToolsStoreState>((set) => ({
  isToolboxModalOpen: false,

  openToolboxModal: () =>
    set({
      isToolboxModalOpen: true,
    }),

  closeToolboxModal: () =>
    set({
      isToolboxModalOpen: false,
    }),
}));
