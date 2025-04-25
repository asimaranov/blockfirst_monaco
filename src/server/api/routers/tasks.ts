import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import prisma from '~/lib/prisma';
import { createSlateEditor, NodeApi, TElement } from '@udecode/plate';
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

      // Format the data to match TaskCardProps
      return {
        id: document.id,
        updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
        heroImageSrc: document.user?.profileImageUrl || '/heroes/Alex.png', // Fallback if no image
        heroName: document.user?.name || document.user?.username || 'Алекс',
        heroTagline: 'Реши задачу за нашего героя!',
        labels: ['Глава 1', 'Тема 2', 'Урок 2'], // This could be dynamic based on metadata or categories
        title: document.title || 'Без названия',
        description: document.content || '',
        completionCount: '1 207+', // This could be dynamic based on analytics
        rating: '1 207+', // This could be dynamic based on analytics
      };
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

        const allNodes = editor.api.nodes<TElement>({
          at: [],
          match: (n) => true,
        });

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
        const titleContentNodePath = [title?.path[0]! + 1, ...title?.path.slice(1)!];
        const titleContentNode = editor.api.node(titleContentNodePath!)![0]!;
        const titleContent = (titleContentNode?.children as any)[0]!.text;

        const hero = headingList.find((heading) => heading.title == 'Hero');
        const heroContentNodePath = [hero?.path[0]! + 1, ...hero?.path.slice(1)!];
        const heroContentNode = editor.api.node(heroContentNodePath!)![0]!;
        const heroContent = (heroContentNode?.children as any)[0]!.text;

        const shortDescription = headingList.find(
          (heading) => heading.title == 'Short description'
        );
        const shortDescriptionContentNodePath = [shortDescription?.path[0]! + 1, ...shortDescription?.path.slice(1)!];
        const shortDescriptionContentNode = editor.api.node(shortDescriptionContentNodePath!)![0]!;
        const shortDescriptionContent = (shortDescriptionContentNode?.children as any)[0]!.text;

        return {
          id: document.id,
          updateDate: document.updatedAt.toLocaleDateString('ru-RU'),
          heroImageSrc: document.user?.profileImageUrl || '/heroes/Alex.png',
          heroName: heroContent || 'Герой',
          heroTagline: 'Реши задачу за нашего героя!',
          labels: ['Глава 1', 'Тема 2', 'Урок 2'],
          title: titleContent || 'Без названия',
          description: shortDescriptionContent || '',
          completionCount: '5+',
          rating: '4.9',
        };
      });
    }),
});
