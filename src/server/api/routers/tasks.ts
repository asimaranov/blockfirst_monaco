import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import prisma from '~/lib/prisma';
import {
  createSlateEditor,
  NodeApi,
  SlateEditor,
  TElement,
} from '@udecode/plate';
import {
  BaseTocPlugin,
  Heading,
  HEADING_KEYS,
  isHeading,
} from '@udecode/plate-heading';
import { BaseHeadingPlugin } from '@udecode/plate-heading';
import { json } from 'stream/consumers';
import {
  getContentBetweenHeadings,
  getDocumentWithFields,
  extractCodeFromElements,
} from '~/server/utils/document';
import { SyncedDocument } from '~/app/models/SyncedDocument';

const headingDepth: Record<string, number> = {
  [HEADING_KEYS.h1]: 1,
  [HEADING_KEYS.h2]: 2,
  [HEADING_KEYS.h3]: 3,
  [HEADING_KEYS.h4]: 4,
  [HEADING_KEYS.h5]: 5,
  [HEADING_KEYS.h6]: 6,
};

export interface TaskData {
  id: string;
  updateDate: string;
  heroImageSrc: string;
  heroName: any;
  heroTagline: string;
  labels: string[];
  title: any;
  description: any;
  problemStatement: TElement[];
  completionCount: string;
  rating: string;
  status: 'available' | 'in-progress' | 'completed';
  advancedTasksSolved: boolean;
  filesList?: TElement[];
  filesCode?: Record<string, string>;
  savedFilesCode?: Record<string, string>;
  tests?: Array<{
    name?: string;
    Name?: string;
    content: string;
  }>;
}

export const tasksRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { taskId } = input;

      try {
        const { document, data, headings } = await getDocumentWithFields<{
          Title: string;
          Hero: string;
          Description: string;
          'Problem Statement': string;
          'Problem Statement-Elements': TElement[];
          'Files list': string;
          'Files list-Elements': TElement[];
          Tests: string;
          'Tests-Elements': TElement[];
          'Tests-SubHeadings': {
            Name: string;
            'Content-Elements': TElement[];
          }[];
        }>(taskId, [
          'Title',
          'Hero',
          'Description',
          { field: 'Problem Statement', includeElements: true },
          { field: 'Files list', includeElements: true },
          {
            field: 'Tests',
            includeElements: true,
            includeSubHeadings: [
              { field: 'Name', includeElements: false },
              { field: 'Content', includeElements: true },
            ],
          },
        ]);

        const filesList = data['Files list-Elements'].map(
          (x) => x.children[0].text
        );

        const {
          document: document2,
          data: data2,
          headings: headings2,
        } = await getDocumentWithFields<any>(
          taskId,
          filesList.map((x) => ({ field: x, includeElements: true })) as {
            field: string;
            includeElements?: boolean;
          }[]
        );

        console.log(
          'Found doc2222',
          JSON.stringify(data2, null, 2),
          JSON.stringify(headings2, null, 2)
        );

        // Extract code from elements
        const filesCode: Record<string, string> = {};
        for (const fileName of filesList) {
          const elements = data2[`${fileName}-Elements`];
          if (elements) {
            filesCode[fileName as string] = extractCodeFromElements(elements);
          }
        }

        console.log('Files code', filesCode);

        // Fetch saved documents from MongoDB
        let savedFilesCode: Record<string, string> = {};

        if (ctx.session?.user?.id) {
          try {
            const userId = ctx.session?.user?.id;
            const query = userId ? { taskId, userId } : { taskId };
            const savedDocument = await SyncedDocument.findOne(query);

            if (savedDocument && savedDocument.documents) {
              savedDocument.documents.forEach(
                (doc: { key: string; value: string }) => {
                  savedFilesCode[doc.key] = doc.value;
                }
              );
            }
          } catch (error) {
            console.error('Error fetching saved documents:', error);
          }
        }

        // console.log('Found doc by id', taskId, document);

        return {
          id: document.id,
          updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
          heroImageSrc: document.user?.profileImageUrl || '/heroes/Alex.png',
          heroName:
            data.Hero ||
            document.user?.name ||
            document.user?.username ||
            'Алекс',
          heroTagline: 'Реши задачу за нашего героя!',
          labels: ['Глава 1', 'Тема 2', 'Урок 2'],
          title: data.Title || document.title || 'Без названия',
          description: data.Description || document.content || '',
          problemStatement: data['Problem Statement-Elements'] || [],
          filesList: filesList || [],
          filesCode: filesCode,
          savedFilesCode: savedFilesCode,
          completionCount: '5+',
          rating: '4.9',
          tests: data['Tests-SubHeadings'].map((x) => ({
            ...x,
            content: extractCodeFromElements(x['Content-Elements']),
          })),
          status: ['available', 'in-progress', 'completed'][
            Math.floor(Math.random() * 3)
          ],
          advancedTasksSolved: Math.random() > 0.5,
        } as TaskData;
      } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Task not found');
      }
    }),

  getMultiple: publicProcedure
    .input(z.object({ taskIds: z.array(z.string()) }))
    .query(async ({ input }) => {
      const { taskIds } = input;

      const results = await Promise.all(
        taskIds.map(async (taskId) => {
          try {
            const { document, data } = await getDocumentWithFields<{
              Title: string;
              Hero: string;
              Description: string;
              'Problem Statement': string;
              'Problem StatementElements': TElement[];
              'Files list': string;
              'Files listElements': TElement[];
              'Tests-SubHeadings': {
                name: string;
                'Content-Elements': TElement[];
              }[];
            }>(taskId, [
              'Title',
              'Hero',
              'Description',
              'Problem Statement',
              'Files list',
              {
                field: 'Tests',
                includeElements: true,
                includeSubHeadings: ['Name', 'Content'],
              },
            ]);

            console.log('Files list', data['Files listElements']);

            return {
              id: document.id,
              updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
              heroImageSrc:
                document.user?.profileImageUrl || '/heroes/Alex.png',
              heroName: data.Hero || 'Герой',
              heroTagline: 'Реши задачу за нашего героя!',
              labels: ['Глава 1', 'Тема 2', 'Урок 2'],
              title: data.Title || 'Без названия',
              description: data.Description || '',
              problemStatement: data['Problem StatementElements'] || [],
              filesList: data['Files listElements'] || [],
              completionCount: '5+',
              rating: '4.9',
              status: ['available', 'in-progress', 'completed'][
                Math.floor(Math.random() * 3)
              ],
              advancedTasksSolved: Math.random() > 0.5,
              tests: data['Tests-SubHeadings'].map((x) => ({
                name: x.name,
                content: extractCodeFromElements(x['Content-Elements']),
              })),
            } as TaskData;
          } catch (error) {
            console.error(`Error fetching task ${taskId}:`, error);
            return null;
          }
        })
      );

      return results.filter(Boolean);
    }),

  save: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        documents: z.array(
          z.object({
            key: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      // Upsert - update if exists, or create new document
      const result = await SyncedDocument.findOneAndUpdate(
        { taskId: input.taskId, userId },
        {
          taskId: input.taskId,
          userId,
          documents: input.documents,
        },
        { upsert: true, new: true }
      );

      return result;
    }),
});
