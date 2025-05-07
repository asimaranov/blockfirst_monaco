'use client';

import {
  usePlateEditor,
  Plate,
  PlateContent,
  PlateElement,
  PlateLeaf,
} from '@udecode/plate/react';

import React, { useEffect } from 'react';
import {
  createSlateEditor,
  PlateStatic,
  BaseParagraphPlugin,
  TText,
  Value,
} from '@udecode/plate';
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin,
  BaseCodeSyntaxPlugin,
} from '@udecode/plate-code-block';
import {
  BaseHeadingPlugin,
  BaseTocPlugin,
  HEADING_LEVELS,
} from '@udecode/plate-heading';
import { BaseHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { BaseIndentPlugin } from '@udecode/plate-indent';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { BaseLinkPlugin } from '@udecode/plate-link';
import { ARTICLE_DATA } from './data'; // Assuming data is in the same folder or adjust path
// import { CaptionPlugin } from '@udecode/plate-caption/react';
import { BaseColumnItemPlugin, BaseColumnPlugin } from '@udecode/plate-layout';
import { BaseDatePlugin } from '@udecode/plate-date';
import { BaseCalloutPlugin } from '@udecode/plate-callout';
import { BaseTogglePlugin } from '@udecode/plate-toggle';
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BaseVideoPlugin,
} from '@udecode/plate-media';
import {
  BaseTableCellHeaderPlugin,
  BaseTableCellPlugin,
  BaseTablePlugin,
  BaseTableRowPlugin,
} from '@udecode/plate-table';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
} from '@udecode/plate-math';
import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontSizePlugin,
} from '@udecode/plate-font';
import { BaseMentionPlugin } from '@udecode/plate-mention';
import { BaseCommentsPlugin } from '@udecode/plate-comments';
// import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { withProps } from '@udecode/cn';

import type { TCaptionElement } from '@udecode/plate-caption';
import type { TImageElement } from '@udecode/plate-media';

import { cn } from '@udecode/cn';
import { type SlateElementProps, NodeApi, SlateElement } from '@udecode/plate';
import { useEditorStore } from '~/store/editorStore';
import { TableCellHeaderStaticElement } from './plate/table';
import { TableRowElementStatic } from './plate/table';
import { TableCellElementStatic } from './plate/table';
import { TableElementStatic } from './plate/table';
import { CodeBlockElement } from '~/components/plate-ui/code-block-element';
import { CodeLineElementStatic } from '~/components/plate-ui/code-line-element-static';
import { CodeLeafStatic } from '~/components/plate-ui/code-leaf-static';
import { CodeSyntaxLeafStatic } from '~/components/plate-ui/code-syntax-leaf-static';
// import { CodeBlockElement } from '~/components/plate-ui/code-block-element';
import { all, createLowlight } from 'lowlight';
import { CalloutElementStatic } from './plate/callout-element-static';
import { MediaVideoElement } from './plate/media-video-element';
import { TaskElement } from './plate/task-element';
import { BaseTaskPlugin } from './plate/plugins/task-plugins';
import { ColumnGroupElementStatic } from '~/components/plate-ui/column-group-element-static';
import { ColumnGroupElement } from './plate/column-group-element';
import { ColumnElement } from './plate/column-element';

export function ImageElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  const {
    align = 'center',
    caption,
    url,
    width,
  } = props.element as TImageElement &
    TCaptionElement & {
      width: number;
    };

  return (
    <SlateElement className={cn(className, 'mt-16 mb-16')} {...props}>
      <figure className="group relative m-0 inline-block">
        <div
          className="relative max-w-full min-w-[92px]"
          style={{ textAlign: align }}
        >
          <div className="inline-block" style={{ width }}>
            <img
              className={cn(
                'w-full max-w-full cursor-default object-cover px-0',
                'rounded-sm'
              )}
              alt=""
              src={url}
              {...props.nodeProps}
            />
            {caption && (
              <figcaption className="mx-auto mt-2 h-[24px] max-w-full">
                {NodeApi.string(caption[0] as TText)}
              </figcaption>
            )}
          </div>
        </div>
      </figure>
      {children}
    </SlateElement>
  );
}

const plugins = [
  BaseEquationPlugin,
  BaseColumnPlugin,
  BaseColumnItemPlugin,
  BaseTocPlugin,
  BaseVideoPlugin,
  BaseAudioPlugin,
  BaseParagraphPlugin,
  BaseHeadingPlugin,
  BaseMediaEmbedPlugin,
  BaseInlineEquationPlugin,
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
  BaseBlockquotePlugin,
  BaseDatePlugin,
  BaseCalloutPlugin,
  BaseCodeBlockPlugin.configure({
    options: {
      lowlight: createLowlight(all),
    },
  }),
  BaseIndentPlugin.extend({
    inject: {
      targetPlugins: [
        BaseParagraphPlugin.key,
        BaseBlockquotePlugin.key,
        BaseCodeBlockPlugin.key,
      ],
    },
  }),
  BaseIndentListPlugin.extend({
    inject: {
      targetPlugins: [
        BaseParagraphPlugin.key,
        ...HEADING_LEVELS,
        BaseBlockquotePlugin.key,
        BaseCodeBlockPlugin.key,
        BaseTogglePlugin.key,
      ],
    },
    // options: {
    //   listStyleTypes: {
    //     todo: {
    //       liComponent: TodoLiStatic,
    //       markerComponent: TodoMarkerStatic,
    //       type: 'todo',
    //     },
    //   },
    // },
  }),
  BaseLinkPlugin,
  BaseTableRowPlugin,
  BaseTablePlugin,
  BaseTableCellPlugin,
  BaseHorizontalRulePlugin,
  BaseFontColorPlugin,
  BaseFontBackgroundColorPlugin,
  BaseFontSizePlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMentionPlugin,
  BaseCommentsPlugin,
  BaseTogglePlugin,
  BaseTaskPlugin,
];

const PlateEditor = ({ richText }: { richText: Value }) => {
  // console.log('richText', r/ );
  const editorStore = useEditorStore();

  const editor = usePlateEditor({
    id: 'content',
    value: richText || ARTICLE_DATA,
    plugins: plugins,
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className:
            'mb-4 border-[#33CF8E] pl-5.5 text-[#636c76] bg-[url(/images/line.svg)] bg-top-left bg-repeat-y ',
        }),
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'text-3xl font-medium tracking-tight mt-16 mb-6 first:mt-10 ',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-medium tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'div',
          className: 'mb-6 text-base leading-6 text-foreground/90 font-light',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
        img: ImageElementStatic,

        [BaseTableCellHeaderPlugin.key]: TableCellHeaderStaticElement,
        [BaseTableCellPlugin.key]: TableCellElementStatic,
        [BaseTablePlugin.key]: TableElementStatic,
        [BaseTableRowPlugin.key]: TableRowElementStatic,
        [BaseTaskPlugin.key]: TaskElement,
        [BaseCodeBlockPlugin.key]: CodeBlockElement,
        [BaseCodeLinePlugin.key]: CodeLineElementStatic,
        [BaseCodePlugin.key]: CodeLeafStatic,
        [BaseCodeSyntaxPlugin.key]: CodeSyntaxLeafStatic,
        [BaseCalloutPlugin.key]: CalloutElementStatic,
        [BaseVideoPlugin.key]: MediaVideoElement,
        [BaseColumnPlugin.key]: ColumnGroupElement,
        [BaseColumnItemPlugin.key]: ColumnElement,
      },
    },
  });

  useEffect(() => {
    editorStore.setEditor(editor);
  }, [editor]);

  return (
    <Plate editor={editor}>
      <PlateContent readOnly className="group" />
    </Plate>
  );
};

export default PlateEditor;
