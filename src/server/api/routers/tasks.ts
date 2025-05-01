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
}

export const tasksRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ input }) => {
      const { taskId } = input;

      const document = await prisma.document.findUnique({
        where: {
          id: taskId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          contentRich: true,
          coverImage: true,
          icon: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImageUrl: true,
            },
          },
        },
      });

      console.log('Found doc by id', taskId, document);

      if (!document) {
        throw new Error('Task not found');
      }

      // Process the document content using the same approach as getMultiple
      const editor = createSlateEditor({
        plugins: [BaseHeadingPlugin, BaseTocPlugin],
        value: document.contentRich as any,
      });

      const headingList: Heading[] = [];

      const values = editor.api.nodes<TElement>({
        at: [],
        match: (n) => isHeading(n),
      });

      Array.from(values, ([node, path]) => {
        const { type } = node;
        const title = NodeApi.string(node);
        const depth = headingDepth[type];
        const id = node.id as string;
        title &&
          headingList.push({
            id,
            depth,
            path,
            title,
            type,
          });
      });

      const title = headingList.find((heading) => heading.title == 'Title');
      const titleContentNodePath = [
        title?.path[0]! + 1,
        ...title?.path.slice(1)!,
      ];
      const titleContentNode = editor.api.node(titleContentNodePath!)![0]!;
      const titleContent = (titleContentNode?.children as any)[0]!.text;

      const hero = headingList.find((heading) => heading.title == 'Hero');
      const heroContentNodePath = [hero?.path[0]! + 1, ...hero?.path.slice(1)!];
      const heroContentNode = editor.api.node(heroContentNodePath!)![0]!;
      const heroContent = (heroContentNode?.children as any)[0]!.text;

      const description = headingList.find(
        (heading) => heading.title == 'Description'
      );
      const descriptionContentNodePath = [
        description?.path[0]! + 1,
        ...description?.path.slice(1)!,
      ];
      const descriptionContentNode = editor.api.node(
        descriptionContentNodePath!
      )![0]!;
      const descriptionContent = (descriptionContentNode?.children as any)[0]!
        .text;

      const problemStatement = getContentBetweenHeadings(
        editor,
        'Problem Statement'
      );
      const problemStatementElements = problemStatement
        ? Array.from(problemStatement, ([node]) => node as TElement)
        : [];

      // Format the data to match TaskCardProps
      return {
        id: document.id,
        updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
        heroImageSrc: document.user?.profileImageUrl || '/heroes/Alex.png',
        heroName:
          heroContent ||
          document.user?.name ||
          document.user?.username ||
          'Алекс',
        heroTagline: 'Реши задачу за нашего героя!',
        labels: ['Глава 1', 'Тема 2', 'Урок 2'],
        title: titleContent || document.title || 'Без названия',
        description: descriptionContent || document.content || '',
        problemStatement: problemStatementElements,
        completionCount: '5+',
        rating: '4.9',
        status: ['available', 'in-progress', 'completed'][
          Math.floor(Math.random() * 3)
        ],
        advancedTasksSolved: Math.random() > 0.5,
      } as TaskData;
    }),

  getMultiple: publicProcedure
    .input(z.object({ taskIds: z.array(z.string()) }))
    .query(async ({ input }) => {
      const { taskIds } = input;

      const documents = await prisma.document.findMany({
        where: {
          id: {
            in: taskIds,
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          contentRich: true,
          coverImage: true,
          icon: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImageUrl: true,
            },
          },
        },
      });

      // console.log('Found docs by ids', taskIds, documents);

      // Format the data to match TaskCardProps
      return documents.map((document) => {
        const editor = createSlateEditor({
          plugins: [BaseHeadingPlugin, BaseTocPlugin],
          value: document.contentRich as any,
        });

        const headingList: Heading[] = [];

        const values = editor.api.nodes<TElement>({
          at: [],
          match: (n) => isHeading(n),
        });

        // console.log('Heading list', values);

        // const allNodes = editor.api.nodes<TElement>({
        //   at: [],
        //   match: (n) => true,
        // });

        // console.log(
        //   'Node Rich',
        //   JSON.stringify(
        //     Array.from(allNodes, ([node, path]) => ({ node, path }))
        //   )
        // );

        Array.from(values, ([node, path]) => {
          const { type } = node;
          const title = NodeApi.string(node);
          const depth = headingDepth[type];
          const id = node.id as string;
          title &&
            headingList.push({
              id,
              depth,
              path,
              title,
              type,
            });
        });

        // console.log('Heading list', headingList);

        const title = headingList.find((heading) => heading.title == 'Title');
        const titleContentNodePath = [
          title?.path[0]! + 1,
          ...title?.path.slice(1)!,
        ];
        const titleContentNode = editor.api.node(titleContentNodePath!)![0]!;
        const titleContent = (titleContentNode?.children as any)[0]!.text;

        const hero = headingList.find((heading) => heading.title == 'Hero');
        const heroContentNodePath = [
          hero?.path[0]! + 1,
          ...hero?.path.slice(1)!,
        ];
        const heroContentNode = editor.api.node(heroContentNodePath!)![0]!;
        const heroContent = (heroContentNode?.children as any)[0]!.text;

        const description = headingList.find(
          (heading) => heading.title == 'Description'
        );
        const descriptionContentNodePath = [
          description?.path[0]! + 1,
          ...description?.path.slice(1)!,
        ];
        const descriptionContentNode = editor.api.node(
          descriptionContentNodePath!
        )![0]!;
        const descriptionContent = (descriptionContentNode?.children as any)[0]!
          .text;

        const problemStatement = getContentBetweenHeadings(
          editor,
          'Problem Statement'
        );
        const problemStatementElements = problemStatement
          ? Array.from(problemStatement, ([node]) => node as TElement)
          : [];

        // console.log('Problem statement elements', problemStatementElements);

        return {
          id: document.id,
          updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
          heroImageSrc: document.user?.profileImageUrl || '/heroes/Alex.png',
          heroName: heroContent || 'Герой',
          heroTagline: 'Реши задачу за нашего героя!',
          labels: ['Глава 1', 'Тема 2', 'Урок 2'],
          title: titleContent || 'Без названия',
          description: descriptionContent || '',
          problemStatement: problemStatementElements,
          completionCount: '5+',
          rating: '4.9',
          status: ['available', 'in-progress', 'completed'][
            Math.floor(Math.random() * 3)
          ],
          advancedTasksSolved: Math.random() > 0.5,
        } as TaskData;
      });
    }),
});

function getContentBetweenHeadings(
  editor: SlateEditor,
  startHeadingTitle: string
) {
  // First get all headings
  const headingList: Heading[] = [];
  const values = editor.api.nodes<TElement>({
    at: [],
    match: (n) => isHeading(n),
  });

  Array.from(values, ([node, path]) => {
    const { type } = node;
    const title = NodeApi.string(node);
    const depth = headingDepth[type];
    const id = node.id as string;
    title && headingList.push({ id, depth, path, title, type });
  });

  // Find the start heading
  const startHeading = headingList.find(
    (heading) => heading.title.toLowerCase() === startHeadingTitle.toLowerCase()
  );

  if (!startHeading) return null;

  // Find the next heading after the start heading
  const nextHeadingIndex = headingList.findIndex(
    (heading) => heading.path[0] > startHeading.path[0]
  );
  const nextHeading =
    nextHeadingIndex !== -1 ? headingList[nextHeadingIndex] : null;

  // Get all nodes between the start heading and next heading
  const nodesBetween = editor.api.nodes<TElement>({
    at: [],
    match: (n, path) => {
      // Only include nodes that are direct children of the document
      if (path.length !== 1) return false;

      // Check if node is between start and next heading
      const isAfterStart = path[0] > startHeading.path[0];
      const isBeforeNext = nextHeading ? path[0] < nextHeading.path[0] : true;

      // Only include block elements and exclude headings
      return isAfterStart && isBeforeNext && !isHeading(n);
    },
  });

  // Convert the nodes to content
  return nodesBetween;
}
