'use client';

import {
  usePlateEditor,
  Plate,
  PlateContent,
  PlateElement,
  PlateLeaf,
} from '@udecode/plate/react';

import React from 'react';
import {
  createSlateEditor,
  PlateStatic,
  BaseParagraphPlugin,
  TText,
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
    <SlateElement className={cn(className, 'py-2.5')} {...props}>
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
    // options: {
    //   lowlight: createLowlight(all),
    // },
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
];

const PlateEditor = () => {
  const editor = usePlateEditor({
    id: 'content',
    value: ARTICLE_DATA,
    plugins: plugins,
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className: 'mb-4 mt-6 text-3xl font-medium tracking-tight',
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
          as: 'p',
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
        img: ImageElementStatic,
      },
    },
  });

  return (
    <div className="px-16">
      <Plate editor={editor}>
        <PlateContent readOnly />
      </Plate>
    </div>
  );
};

export default PlateEditor;
