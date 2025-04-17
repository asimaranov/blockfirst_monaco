'use client';
import React, { useEffect, RefObject, useMemo, useState } from 'react';
import {
  useEditorRef,
  useEditorSelector,
  useScrollRef,
} from '@udecode/plate/react';

import {
  type SlateEditor,
  type TElement,
  NodeApi,
} from '@udecode/plate';
import {
  type Heading,
  BaseTocPlugin,
  HEADING_KEYS,
  isHeading,
} from '@udecode/plate-heading';

import LessonNavigation from './LessonNavigation';

export const heightToTop = (
  ele: HTMLElement,
  editorContentRef?: React.RefObject<HTMLDivElement | null>
) => {
  const root = editorContentRef ? editorContentRef.current : document.body;

  if (!root || !ele) return 0;

  const containerRect = root.getBoundingClientRect();
  const elementRect = ele.getBoundingClientRect();

  const scrollY = root.scrollTop;
  const absoluteElementTop = elementRect.top + scrollY - containerRect.top;

  return absoluteElementTop;
};

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
    match: (n) => isHeading(n),
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

function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        if (entries[0]) {
          setIntersecting(entries[0].isIntersecting);
        }
      }),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}

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

const RightSidebar = () => {
  const headingList = useEditorSelector(getHeadingList, []);
  const containerRef = useScrollRef();
  const editor = useEditorRef();
  const activeHeadingIndex = useHeadingsIntersection(headingList, editor);

  return (
    <div className="w-75 bg-[#14171C] border-accent border-l">
      <LessonNavigation
        items={headingList.map((heading) => heading.title)}
        activeIndex={activeHeadingIndex}
      />
    </div>
  );
};

export default RightSidebar;
