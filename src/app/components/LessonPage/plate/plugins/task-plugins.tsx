import { toPlatePlugin } from "@udecode/plate/react";
import { bindFirst } from "@udecode/plate";
import { createSlatePlugin } from "@udecode/plate";
import { InsertNodesOptions, SlateEditor, TElement } from "@udecode/plate";

export const CALLOUT_STORAGE_KEY = `plate-storage-callout`;

export const insertTask = (
  editor: SlateEditor,
  {
    icon,
    variant,
    ...options
  }: InsertNodesOptions & {
    icon?: string;
    variant?: (string & {}) | TCalloutElement['variant'];
  } = {}
) => {
  editor.tf.insertNodes<TCalloutElement>(
    {
      children: [{ text: '' }],
      icon: icon ?? localStorage.getItem(CALLOUT_STORAGE_KEY) ?? '💡',
      type: editor.getType(BaseTaskPlugin),
      variant,
    },
    options as any
  );
};
export interface TCalloutElement extends TElement {
  backgroundColor?: string;
  icon?: string;
  variant?:
    | (string & {})
    | 'error'
    | 'info'
    | 'note'
    | 'success'
    | 'tip'
    | 'warning';
}

export const BaseTaskPlugin = createSlatePlugin({
  key: 'task',
  node: { isElement: true },
}).extendEditorTransforms(({ editor }) => ({
  insert: { task: bindFirst(insertTask, editor) },
}));

export const TaskPlugin = toPlatePlugin(BaseTaskPlugin);


export const taskPlugin = [TaskPlugin.configure({})] as const;