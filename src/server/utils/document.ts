import { NodeApi, SlateEditor, TElement } from '@udecode/plate';
import { Heading, HEADING_KEYS, isHeading } from '@udecode/plate-heading';
import { createSlateEditor } from '@udecode/plate';
import { BaseHeadingPlugin, BaseTocPlugin } from '@udecode/plate-heading';
import prisma from '~/lib/prisma';

const headingDepth: Record<string, number> = {
  [HEADING_KEYS.h1]: 1,
  [HEADING_KEYS.h2]: 2,
  [HEADING_KEYS.h3]: 3,
  [HEADING_KEYS.h4]: 4,
  [HEADING_KEYS.h5]: 5,
  [HEADING_KEYS.h6]: 6,
};

/**
 * Gets content elements between a heading with the specified title and the next heading
 */
export function getContentBetweenHeadings(
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

/**
 * Get all headings from a Slate editor
 */
export function getAllHeadings(editor: SlateEditor): Heading[] {
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

  return headingList;
}

/**
 * Get content of a specific heading section
 */
export function getHeadingContent(
  editor: SlateEditor,
  heading: Heading
): string | null {
  if (!heading) return null;

  const contentNodePath = [heading.path[0] + 1, ...heading.path.slice(1)];
  const nodeEntry = editor.api.node(contentNodePath);

  if (
    !nodeEntry ||
    !nodeEntry[0] ||
    !Array.isArray(nodeEntry[0].children) ||
    !nodeEntry[0].children[0]
  ) {
    return null;
  }

  return (nodeEntry[0].children[0] as any).text;
}

/**
 * Fetch document by ID and extract specific data from it
 * @param documentId - ID of the document to fetch
 * @param fields - Array of field names to extract (e.g., 'Title', 'Hero', 'Description')
 * @returns Object containing the document and extracted fields
 */
export async function getDocumentWithFields<T extends Record<string, any>>(
  documentId: string,
  fields: (string | { field: string; includeElements?: boolean })[]
): Promise<{
  document: any;
  editor: SlateEditor;
  data: T;
  headings: Heading[];
}> {
  // Fetch the document
  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
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

  if (!document) {
    throw new Error(`Document not found: ${documentId}`);
  }

  // Create editor from document content
  const editor = createSlateEditor({
    plugins: [BaseHeadingPlugin, BaseTocPlugin],
    value: document.contentRich as any,
  });

  // Get all headings
  const headings = getAllHeadings(editor);

  // Extract requested fields
  const data = {} as T;

  for (const field of fields) {
    let fieldTitle = field;
    let includeElements = false;
    if (typeof field === 'object') {
      fieldTitle = field.field;
      includeElements = field.includeElements || false;
    } else {
      fieldTitle = field;
    }
    const heading = headings.find(
      (h) => h.title.toLowerCase() === fieldTitle.toLowerCase()
    );

    if (heading) {
      // Get text content for this heading
      const content = getHeadingContent(editor, heading);
      (data as any)[fieldTitle] = content;

      // Also get content between headings if needed
      if (includeElements) {
        const sectionContent = getContentBetweenHeadings(editor, fieldTitle);
        const elements = sectionContent
          ? Array.from(sectionContent, ([node]) => node as TElement)
          : [];
        (data as any)[`${fieldTitle}-Elements`] = elements;
      }
    }
  }

  return { document, editor, data, headings };
}

/**
 * Extracts code content from element structure
 * @param elements - Array of elements containing code
 * @returns The extracted code as a string
 */
export function extractCodeFromElements(elements: TElement[]): string {
  if (!elements || !Array.isArray(elements)) return '';

  let code = '';

  // Process each element
  for (const element of elements) {
    if (element.type === 'code_block') {
      // Process code block element
      if (Array.isArray(element.children)) {
        for (const line of element.children) {
          if (line.type === 'code_line' && Array.isArray(line.children)) {
            for (const textNode of line.children) {
              if (typeof textNode.text === 'string') {
                code += textNode.text;
              }
            }
            // Add newline after each code line
            code += '\n';
          }
        }
      }
    } else if (Array.isArray(element.children)) {
      // Recursively process other elements with children
      code += extractCodeFromElements(element.children as TElement[]);
    } else if (typeof element.text === 'string') {
      // Handle direct text nodes
      code += element.text;
    }
  }

  return code;
}
