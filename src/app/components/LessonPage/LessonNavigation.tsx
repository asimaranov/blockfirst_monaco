'use client';
import { authClient } from '~/server/auth/client';
import { InfoPopover } from '../shared/InfoPopover';
import { UserInfoClient } from '../Sidebar/UserInfoClient';
import {
  BaseTocPlugin,
  Heading,
  HEADING_KEYS,
  isHeading,
} from '@udecode/plate-heading';
import { NodeApi, SlateEditor, TElement } from '@udecode/plate';
import { useEffect, useState } from 'react';
import { useEditorSelector } from '@udecode/plate/react';
import { useScrollRef } from '@udecode/plate/react';
import { useEditorRef } from '@udecode/plate/react';
import { cn } from '~/lib/utils';

type NavigationItemType = 'completed' | 'active' | 'upcoming';

interface NavigationItem {
  title: string;
  type: NavigationItemType;
}

const headingDepth: Record<string, number> = {
  [HEADING_KEYS.h1]: 1,
  [HEADING_KEYS.h2]: 2,
  [HEADING_KEYS.h3]: 3,
  [HEADING_KEYS.h4]: 4,
  [HEADING_KEYS.h5]: 5,
  [HEADING_KEYS.h6]: 6,
};

const getHeadingList = (editor?: SlateEditor) => {
  if (!editor) return [];

  const options = editor.getOptions(BaseTocPlugin);

  if (options.queryHeading) {
    return options.queryHeading(editor);
  }

  const headingList: Heading[] = [];

  const values = editor.api.nodes({
    at: [],
    match: (n) => n.type && n.type === 'h1',
  });

  if (!values) return [];

  Array.from(values, ([node, path]) => {
    const { type } = node as TElement;
    const title = NodeApi.string(node);
    const depth = headingDepth[type];
    const id = node.id as string;
    title && headingList.push({ id, depth: depth!, path, title, type });
  });

  return headingList;
};

function useHeadingsIntersection(
  headingList: Heading[],
  editor: SlateEditor | null
) {
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);
  const [visibleHeadings, setVisibleHeadings] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (!editor || headingList.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const headingElements: HTMLElement[] = [];

    // Create observers for each heading
    headingList.forEach((heading, index) => {
      const node = NodeApi.get(editor, heading.path);
      if (!node) return;

      const element = editor.api.toDOMNode(node);
      if (!element) return;

      headingElements.push(element);

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setVisibleHeadings((prev) => {
              const updated = new Set(prev);
              if (entry.isIntersecting) {
                updated.add(index);
              } else {
                updated.delete(index);
              }
              return updated;
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headingList, editor]);

  // Update active heading based on visible headings
  useEffect(() => {
    if (visibleHeadings.size > 0) {
      // Get the min index from the visible headings (first one on screen)
      const firstVisibleIndex = Math.min(...Array.from(visibleHeadings));
      setActiveHeadingIndex(firstVisibleIndex);
    }
  }, [visibleHeadings]);

  return activeHeadingIndex;
}

export default function LessonNavigation() {
  const headingList = useEditorSelector(getHeadingList, [], {
    id: 'content',
  });
  const containerRef = useScrollRef();
  const editor = useEditorRef('content');
  const activeHeadingIndex = useHeadingsIntersection(headingList, editor);

  const items = headingList.map((heading) => heading.title);
  const activeIndex = Math.min(activeHeadingIndex, items.length - 1);

  const navigationItems: NavigationItem[] = items.map((x, i) => ({
    title: x,
    type:
      activeIndex === i ? 'active' : activeIndex > i ? 'completed' : 'upcoming',
  }));

  return (
    <div className="sticky top-0 flex h-screen w-75 flex-col gap-8 pt-10">
      <div className="flex items-center justify-between px-8">
        <span className="text-secondary/50 text-xs uppercase">
          Структура урока
        </span>
        <InfoPopover
          title="Структура урока"
          content="Степ-бар отображает текущий прогресс прохождения урока и содержит только названия глав."
          className=""
          offsetSide={-7.65}
        />
      </div>

      <div className="flex flex-col gap-4 px-8">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-row items-start gap-5 ${index !== navigationItems.length - 1 ? 'pb-10' : ''} group`}
          >
            <div className="flex h-5 w-5 shrink-0 flex-col items-center justify-center">
              {item.type === 'completed' && (
                <>
                  <div className="z-10 h-2 w-2 shrink-0 rounded-full bg-[#163888]"></div>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#163888] pt-4"></div>
                </>
              )}
              {item.type === 'active' && (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="z-10 h-4 w-4 shrink-0"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7.5"
                      fill="#14171C"
                      stroke="#195AF4"
                    />
                    <circle cx="8" cy="8" r="4" fill="#195AF4" />
                  </svg>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#575F69] pt-4 group-last:hidden"></div>
                </>
              )}
              {item.type === 'upcoming' && (
                <>
                  <div className="z-10 h-2 w-2 shrink-0 rounded-full bg-[#575F69]"></div>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#575F69] pt-4 group-last:hidden"></div>
                </>
              )}
            </div>

            <span className={cn(
                'text-secondary text-sm',
                item.type === 'active' && 'text-foreground'
              )}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <UserInfoClient />
    </div>
  );
}
