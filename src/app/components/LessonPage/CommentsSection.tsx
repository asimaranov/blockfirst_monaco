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
export default function CommentsSection() {
  const editor = useCreateEditor({
    id: 'comments',
  });
  return (
    <div className="flex flex-col">
      <div className="flex px-16 pt-16 pb-16">
        <div className="flex flex-row">
          <div>
            <UserAvatar />
          </div>
          <div className="relative h-40 w-190">
            <DndProvider backend={HTML5Backend}>
              <Plate editor={editor}>
                <EditorContainer className="dark" data-registry="plate">
                  <Editor variant="demo" className="bg-background" />
                </EditorContainer>
              </Plate>
            </DndProvider>

            <button className="border-primary absolute right-5 bottom-5 cursor-pointer rounded-[100px] border px-4 py-2">
              Опубликовать
            </button>
          </div>
        </div>
      </div>
      <CommentsList />
    </div>
  );
}
