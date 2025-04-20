import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { UserAvatar } from './UserAvatar';
import { useCreateEditor } from './PlateComment';
import { Editor } from '~/components/plate-ui/editor';
import { EditorContainer } from '~/components/plate-ui/editor';
import { Plate } from '@udecode/plate/react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CommentsList from './CommentsList';
import { useEffect, useState } from 'react';
import type { Value } from '@udecode/plate';
import { cn } from '~/lib/utils';

export default function CommentsEditor({ className, value }: { className?: string, value?: string }) {
  const [commentDisabled, setCommentDisabled] = useState(true);
  const [editorFocused, setEditorFocused] = useState(false);
  // console.log(comment);

  // console.log(commentDisabled, comment?.[0]?.value, !comment?.[0]?.value, comment?.length);

  const editor = useCreateEditor({
    id: 'comments',
  });

  useEffect(() => {
    if (value) {
      console.log('Setting value', value);
      editor.tf.setValue(value);
    }
  }, [value, editor]);

  return (
    <div
      className={cn(
        'border-border relative w-190 rounded-[0.625vw] border-[0.026vw]',
        className,
        editorFocused && 'border-secondary/50'
      )}
    >
      <DndProvider backend={HTML5Backend}>
        <Plate
          
          editor={editor}
          onChange={({ value }) => {
            const commentDisabled =
              value?.length === 0 ||
              (value?.length == 1 && !value?.[0]?.children[0].text);

            if (commentDisabled) {
              setCommentDisabled(true);
            } else {
              setCommentDisabled(false);
            }
          }}
        >
          <EditorContainer
            className="dark rounded-[0.625vw]"
            data-registry="plate"
          >
            <Editor
              variant="none"
              className="bg-background min-h-40 rounded-t-none rounded-b-[0.625vw] p-5 pb-17"
              onFocus={() => setEditorFocused(true)}
              onBlur={() => setEditorFocused(false)}
            />
          </EditorContainer>
        </Plate>
      </DndProvider>

      <button
        className="border-primary absolute right-5 bottom-5 rounded-[100px] border px-4 py-2 text-xs not-disabled:cursor-pointer disabled:opacity-50"
        disabled={commentDisabled}
      >
        Опубликовать
      </button>
    </div>
  );
}
