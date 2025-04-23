import { PlateEditor } from '@udecode/plate/react';
import { create } from 'zustand';

interface EditorStore {
  editor: PlateEditor | null;
  setEditor: (editor: PlateEditor) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor: PlateEditor) => set({ editor }),
}));
