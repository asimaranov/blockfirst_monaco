'use client';
import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { useCreateEditor } from './PlateComment';
import { Editor } from '~/components/plate-ui/editor';
import { EditorContainer } from '~/components/plate-ui/editor';
import { Plate, useEditorRef, useEditorState } from '@udecode/plate/react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CommentsList from './CommentsList';
import { useEffect, useState } from 'react';
import type { Value } from '@udecode/plate';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';

export default function CommentsEditor({
  onSubmit,
  lessonId,
  className,
  value,
  id,
  onCancel,
  replyFormAfterId,
  isEditing,
  commentId,
}: {
  className?: string;
  value?: string;
  id?: string;
  onCancel?: () => void;
  replyFormAfterId?: string | null;
  lessonId: string;
  onSubmit?: () => void;
  isEditing?: boolean;
  commentId?: string;
}) {
  const [commentDisabled, setCommentDisabled] = useState(true);
  const [editorFocused, setEditorFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const editor = useCreateEditor({
    id: id || 'comments',
  });

  useEffect(() => {
    if (value) {
      editor?.tf.setValue(value);
    }
  }, [value, editor]);
  const utils = api.useUtils();

  const createCommentMutation = api.comments.create.useMutation({
    onSuccess: () => {
      onSubmit?.();
      utils.comments.getByLessonId.reset({ lessonId });
    },
  });

  const updateCommentMutation = api.comments.update.useMutation({
    onSuccess: () => {
      onSubmit?.();
      utils.comments.getByLessonId.reset({ lessonId });
    },
  });

  const handleSubmit = () => {
    if (commentDisabled || !editor) return;

    setSubmitting(true);

    try {
      const value = editor.children;


      console.log('value', value);
      

      if (isEditing && commentId) {
        // Update existing comment
        updateCommentMutation.mutate({
          commentId,
          content: value,
        });
      } else if (replyFormAfterId) {
        // Create a reply
        createCommentMutation.mutate({
          lessonId,
          parentId: replyFormAfterId,
          content: value,
        });
      } else {
        // Create a new comment
        createCommentMutation.mutate({
          lessonId,
          content: value,
        });
      }

      // Clear the editor
      editor.tf.setValue([
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ]);

      // Reset state
      setCommentDisabled(true);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        'border-border relative w-full rounded-[0.625vw] border-[0.026vw]',
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
              (value?.length == 1 &&
                (!value?.[0]?.children ||
                  value?.[0]?.children.length == 0 ||
                  !value?.[0]?.children[0].text));

            if (commentDisabled) {
              setCommentDisabled(true);
            } else {
              setCommentDisabled(false);
            }
          }}
          onValueChange={({ value }) => {
            console.log('value', value);
          }}
        >
          <EditorContainer
            className="dark rounded-[0.625vw]"
            data-registry="plate"
          >
            <Editor
              variant="none"
              className="bg-background min-h-40 rounded-t-none rounded-b-[0.625vw] p-5 pb-17"
              placeholder="Введите текст комментария..."
              onFocus={() => setEditorFocused(true)}
              onBlur={() => setEditorFocused(false)}
            />
          </EditorContainer>
        </Plate>
      </DndProvider>

      <div className="absolute right-5 bottom-5 flex flex-grow flex-row gap-3">
        {(id === 'sub-editor' || isEditing) && (
          <button
            className="text-error cursor-pointer px-4 py-2 text-xs hover:opacity-50"
            onClick={() => {
              onCancel?.();
            }}
          >
            Отменить
          </button>
        )}
        <button
          className="border-primary rounded-[100px] border px-4 py-2 text-xs not-disabled:cursor-pointer disabled:opacity-50"
          disabled={commentDisabled || submitting}
          onClick={handleSubmit}
        >
          {submitting
            ? 'Отправка...'
            : isEditing
              ? 'Сохранить'
              : 'Опубликовать'}
        </button>
      </div>
    </div>
  );
}
