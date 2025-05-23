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
import { extractTestNames } from '~/server/utils/tests';
import { SyncedDocument } from '~/server/models/SyncedDocument';
import { updateTaskStatus, getTaskHierarchy } from '~/server/utils/progress';
import { UserTaskProgress } from '~/server/models/UserProgress';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY!);

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
  path: string[];
  problemStatement: TElement[];
  completionCount: string;
  rating: string;
  status: 'available' | 'in-progress' | 'completed';
  advancedTasksSolved: boolean;
  submissionCount: number;
  filesList?: TElement[];
  filesCode?: Record<string, string>;
  savedFilesCode?: Record<string, string>;
  tests?: Array<{
    name?: string;
    Name?: string;
    content: string;
  }>;
  data?: string;
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
          'Path-Elements': TElement[];
        }>(taskId, [
          'Title',
          'Hero',
          'Description',
          { field: 'Path', includeElements: true },
          { field: 'Problem Statement', includeElements: true },
          { field: 'Files list', includeElements: true },
          {
            field: 'Tests',
            includeElements: true,
          },
        ]);



        // console.log('Tests elements', data['Tests-Elements']);
        const testsCode = extractCodeFromElements(data['Tests-Elements']);
        // console.log('Tests code', testsCode);

        // Extract test names from tests code
        const testNames = extractTestNames(testsCode);
        // console.log('Test names:', testNames);

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

        // Default task status and advanced status
        let taskStatus: 'available' | 'in-progress' | 'completed' = 'available';
        let submissionCount = 0;

        let advancedTasksSolved = false;

        if (ctx.session?.user?.id) {
          const userId = ctx.session.user.id;

          try {
            const query = { taskId, userId };
            const savedDocument = await SyncedDocument.findOne(query);

            if (savedDocument && savedDocument.documents) {
              savedDocument.documents.forEach(
                (doc: { key: string; value: string }) => {
                  savedFilesCode[doc.key] = doc.value;
                }
              );
            }

            // Fetch actual task progress from the database
            const taskProgress = await UserTaskProgress.findOne({
              userId,
              taskId,
            });

            if (taskProgress) {
              submissionCount = taskProgress.submissionCount;
              taskStatus = taskProgress.status;
              advancedTasksSolved = taskProgress.advancedTasksSolved;
            }
          } catch (error) {
            console.error(
              'Error fetching saved documents or task progress:',
              error
            );
          }
        }

        // console.log('Found doc by id', taskId, document);

        console.log('Path elements', data['Path-Elements']?.map((x) => x.children[0].text) || []);

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
          title: data.Title || document.title || 'Без названия',
          description: data.Description || document.content || '',
          path: data['Path-Elements']?.map((x) => x.children[0].text) || [],
          problemStatement: data['Problem Statement-Elements'] || [],
          filesList: filesList || [],
          filesCode: filesCode,
          savedFilesCode: savedFilesCode,
          completionCount: '5+',
          rating: '4.9',
          tests:
            testNames?.map((x: string) => ({
              name: x,
            })) || [],
          status: taskStatus,
          advancedTasksSolved: advancedTasksSolved,
          submissionCount: submissionCount,
          data: cryptr.encrypt(
            JSON.stringify({
              userId: ctx.session?.user?.id,
              taskId,
              testsCode,
              testNames,
            })
          ),
        } as TaskData;
      } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Task not found');
      }
    }),

  getMultiple: publicProcedure
    .input(z.object({ taskIds: z.array(z.string()) }))
    .query(async ({ input, ctx }) => {
      const { taskIds } = input;
      const userId = ctx.session?.user?.id;

      // If user is authenticated, fetch all their task progress records for the requested tasks
      let taskProgressMap: Record<string, any> = {};
      if (userId) {
        try {
          const taskProgresses = await UserTaskProgress.find({
            userId,
            taskId: { $in: taskIds },
          });

          // Create a map of task progress by task ID
          taskProgressMap = taskProgresses.reduce(
            (map, record) => {
              map[record.taskId] = record;
              return map;
            },
            {} as Record<string, any>
          );
        } catch (error) {
          console.error('Error fetching task progress records:', error);
        }
      }

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
              'Path-Elements': TElement[];
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
              {
                field: 'Path',
                includeElements: true,
              },
            ]);

            console.log('Files list', data['Files listElements']);

            // Get task progress if it exists, otherwise use default values
            const taskProgress = taskProgressMap[taskId];
            const taskStatus = taskProgress?.status || 'available';
            const advancedTasksSolved =
              taskProgress?.advancedTasksSolved || false;

            return {
              id: document.id,
              updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
              heroImageSrc:
                document.user?.profileImageUrl || '/heroes/Alex.png',
              heroName: data.Hero || 'Герой',
              heroTagline: 'Реши задачу за нашего героя!',
              title: data.Title || 'Без названия',
              description: data.Description || '',
              path: data['Path-Elements']?.map((x) => x.children[0].text) || [],
              problemStatement: data['Problem StatementElements'] || [],
              filesList: data['Files listElements'] || [],
              completionCount: '5+',
              rating: '4.9',
              status: taskStatus,
              advancedTasksSolved: advancedTasksSolved,
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

  clearSaved: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      // Delete the saved document for this task and user
      const result = await SyncedDocument.findOneAndDelete({
        taskId: input.taskId,
        userId,
      });

      return { success: !!result };
    }),

  submit: protectedProcedure
    .input(z.object({ data: z.string(), taskId: z.string(), lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      if (!input.data) {
        // Check task is not already completed
        const taskProgressOld = await UserTaskProgress.findOne({
          userId,
          taskId: input.taskId,
        });

        if (taskProgressOld?.status === 'completed') {
          return {
            success: false,
            taskProgressOld,
          };
        }

        // Update task status to in-progress
        const taskProgress = await updateTaskStatus(
          userId,
          input.taskId,
          input.lessonId,
          'in-progress',
          false
        );

        return {
          success: false,
          taskProgress,
        };
      }

      const decryptedData = JSON.parse(cryptr.decrypt(input.data)) as {
        userId: string;
        taskId: string;
        status: 'passed' | 'failed';
        advancedTasksSolved?: boolean;
      };

      // Verify the user ID matches to prevent tampering
      if (decryptedData.userId !== userId) {
        throw new Error('User ID mismatch');
      }

      // Verify the user ID matches to prevent tampering
      if (decryptedData.taskId !== input.taskId) {
        throw new Error('Task ID mismatch');
      }

      if (
        decryptedData.status === 'passed' ||
        decryptedData.status === 'failed'
      ) {
        // Update the task status to completed and propagate changes
        const taskProgress = await updateTaskStatus(
          userId,
          decryptedData.taskId,
          input.lessonId,
          'completed',
          decryptedData.advancedTasksSolved || false
        );

        // Get task's hierarchy for the response
        const hierarchy = await getTaskHierarchy(decryptedData.taskId);

        return {
          success: true,
          taskProgress,
          hierarchy,
        };
      } else {
        // Update as in-progress if the submission failed
        const taskProgress = await updateTaskStatus(
          userId,
          decryptedData.taskId,
          input.lessonId,
          'in-progress',
          false
        );

        return {
          success: false,
          taskProgress,
        };
      }
    }),
});
