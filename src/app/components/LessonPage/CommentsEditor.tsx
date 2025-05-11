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
import Image from 'next/image';

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
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  // const [modalImage, setModalImage] = useState<string | null>(null);

  const editor = useCreateEditor({
    id: id || 'comments',
  });

  useEffect(() => {
    if (value) {
      editor?.tf.setValue(value);
    }
  }, [value, editor]);
  const utils = api.useUtils();

  // Image Modal Component
  const ImageModal = ({
    imageUrl,
    isOpen,
    onClose,
  }: {
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <button
            className="text-foreground absolute top-4 right-4 cursor-pointer hover:opacity-50 focus:outline-none"
            onClick={onClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Image
            src={imageUrl}
            alt="Expanded image"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            width={1000}
            height={1000}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  const createCommentMutation = api.comments.create.useMutation({
    onSuccess: () => {
      onSubmit?.();
      utils.comments.getByLessonId.reset({ lessonId });
      utils.comments.getTotalCount.reset({ lessonId });
    },
  });

  const updateCommentMutation = api.comments.update.useMutation({
    onSuccess: () => {
      onSubmit?.();
      utils.comments.getByLessonId.reset({ lessonId });
    },
  });

  // Extract images from editor value
  const extractImagesFromEditorValue = (value: any[]) => {
    const extractedImages: { id: string; url: string }[] = [];
    let hasUploadingImages = false;
    const newValue = value
      .map((node) => {
        // Deep clone to avoid mutating original
        let newNode = { ...node };

        // If this is an image node
        if (newNode.type === 'img') {
          extractedImages.push({
            id: newNode.id || `img-${Date.now()}-${extractedImages.length}`,
            url: newNode.url,
          });
          return null; // Remove from content
        }

        if (newNode.type === 'placeholder') {
          hasUploadingImages = true;
        }

        // If this is an empty paragraph node
        if (
          newNode.type === 'p' &&
          (!newNode.children ||
            newNode.children.length === 0 ||
            (newNode.children.length === 1 && newNode.children[0].text === ''))
        ) {
          return null; // Remove empty paragraph
        }

        // If the node has children, process them recursively
        if (newNode.children && Array.isArray(newNode.children)) {
          const {
            newChildren,
            childImages,
            emptyChildrenRemoved,
            childHasUploadingImages,
          } = extractImagesFromChildren(newNode.children);
          newNode.children = newChildren;
          extractedImages.push(...childImages);
          if (childHasUploadingImages) {
            hasUploadingImages = true;
          }

          // If all children were removed and it's a paragraph, mark it for removal
          if (
            newNode.type === 'p' &&
            emptyChildrenRemoved &&
            newNode.children.length === 0
          ) {
            return null;
          }
        }

        return newNode;
      })
      .filter(Boolean); // Remove null entries (images and empty paragraphs)

    return { newValue, extractedImages, hasUploadingImages };
  };

  // Process children nodes recursively
  const extractImagesFromChildren = (children: any[]) => {
    const newChildren: any[] = [];
    const childImages: { id: string; url: string }[] = [];
    let emptyChildrenRemoved = true; // Assume all children will be empty or removed initially
    let hasUploadingImages = false;

    children.forEach((child) => {
      let currentChild = { ...child }; // Deep clone

      if (currentChild.type === 'img') {
        childImages.push({
          id: currentChild.id || `img-${Date.now()}-${childImages.length}`,
          url: currentChild.url,
        });
        // Do not add to newChildren, effectively removing it
      } else if (currentChild.type === 'placeholder') {
        hasUploadingImages = true;
      } else if (
        currentChild.type === 'p' &&
        (!currentChild.children ||
          currentChild.children.length === 0 ||
          (currentChild.children.length === 1 &&
            currentChild.children[0].text === ''))
      ) {
        // This is an empty paragraph, do not add to newChildren
      } else {
        if (currentChild.children && Array.isArray(currentChild.children)) {
          const {
            newChildren: nestedNewChildren,
            childImages: nestedChildImages,
            emptyChildrenRemoved: nestedEmptyRemoved,
            childHasUploadingImages: nestedHasUploading,
          } = extractImagesFromChildren(currentChild.children);
          currentChild.children = nestedNewChildren;
          childImages.push(...nestedChildImages);
          if (nestedHasUploading) {
            hasUploadingImages = true;
          }

          // If nested children resulted in an empty paragraph, don't add it
          if (
            currentChild.type === 'p' &&
            nestedEmptyRemoved &&
            currentChild.children.length === 0
          ) {
            // Skip adding this child
            return;
          }
        }
        newChildren.push(currentChild);
        emptyChildrenRemoved = false; // A non-empty child was found/kept
      }
    });

    return {
      newChildren,
      childImages,
      emptyChildrenRemoved,
      childHasUploadingImages: hasUploadingImages,
    };
  };

  const handleSubmit = () => {
    if (commentDisabled || !editor) return;

    setSubmitting(true);

    try {
      let rawValue = editor.children;

      // Extract images and remove empty paragraphs from editor value
      const { newValue, extractedImages, hasUploadingImages } =
        extractImagesFromEditorValue(rawValue);

      if (hasUploadingImages) {
        alert(
          'Некоторые изображения ещё загружаются. Пожалуйста, дождитесь их загрузки перед отправкой.'
        );
        setSubmitting(false);
        return;
      }

      const processedImages = [...images, ...extractedImages];

      let finalContent = newValue;

      // If after processing, the content is empty (e.g., only contained images or empty paragraphs)
      // set it to a single empty paragraph to avoid errors, or handle as per requirements.
      if (finalContent.length === 0) {
        finalContent = [{ type: 'p', children: [{ text: '' }] }];
      }

      if (isEditing && commentId) {
        // Update existing comment
        updateCommentMutation.mutate({
          commentId,
          content: finalContent,
          images: processedImages.length > 0 ? processedImages : undefined,
        });
      } else if (replyFormAfterId) {
        // Create a reply
        createCommentMutation.mutate({
          lessonId,
          parentId: replyFormAfterId,
          content: finalContent,
          images: processedImages.length > 0 ? processedImages : undefined,
        });
      } else {
        // Create a new comment
        createCommentMutation.mutate({
          lessonId,
          content: finalContent,
          images: processedImages.length > 0 ? processedImages : undefined,
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
      setImages([]);
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
      {/* Image Modal */}
      {/* <ImageModal
        imageUrl={modalImage || ''}
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
      /> */}

      <DndProvider backend={HTML5Backend}>
        <Plate
          editor={editor}
          onChange={({ value }) => {
            // Extract images from editor value when content changes
            // const { extractedImages } = extractImagesFromEditorValue(value);

            // Update images state with any new images found
            // if (extractedImages.length > 0) {
            //   setImages((prevImages) => {
            //     const newImages = extractedImages.filter(
            //       (img) =>
            //         !prevImages.some((prevImg) => prevImg.url === img.url)
            //     );
            //     return [...prevImages, ...newImages];
            //   });
            // }

            const commentDisabled =
              value?.length === 0 ||
              (value?.length == 1 &&
                value?.[0]?.children.length <= 1 &&
                (!value?.[0]?.children ||
                  value?.[0]?.children.length == 0 ||
                  !value?.[0]?.children[0].text));

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
              placeholder="Введите текст комментария..."
              onFocus={() => setEditorFocused(true)}
              onBlur={() => setEditorFocused(false)}
            />
          </EditorContainer>
        </Plate>
      </DndProvider>

      {/* Display images preview */}
      {/*images.length > 0 && (
        <div className="px-5 pb-4">
          <div className="flex flex-row gap-3">
            {images.map((image, i) => (
              <div
                className="group relative h-20 w-20 cursor-pointer"
                key={i}
                onClick={() => setModalImage(image.url)}
              >
                <Image
                  src={image.url}
                  alt={image.id}
                  className="rounded-[0.4167vw] group-hover:brightness-40"
                  fill
                />
                <div className="absolute inset-0 hidden items-center justify-center group-hover:flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M7.66406 9.75H11.8307"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.75 11.8307V7.66406"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.58464 17.5013C13.9569 17.5013 17.5013 13.9569 17.5013 9.58464C17.5013 5.21238 13.9569 1.66797 9.58464 1.66797C5.21238 1.66797 1.66797 5.21238 1.66797 9.58464C1.66797 13.9569 5.21238 17.5013 9.58464 17.5013Z"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3346 18.3346L16.668 16.668"
                      stroke="#F2F2F2"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <button
                  className="absolute top-0 right-0 rounded-full bg-black/60 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImages(images.filter((_img, index) => index !== i));
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )} */}

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
