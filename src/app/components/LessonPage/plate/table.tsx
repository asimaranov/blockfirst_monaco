import React from 'react';

import type { SlateElementProps } from '@udecode/plate';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';
import {
  type TTableCellElement,
  BaseTablePlugin,
  type TTableElement,
} from '@udecode/plate-table';

export const TableElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps<TTableElement>) => {
  const { disableMarginLeft } = props.editor.getOptions(BaseTablePlugin);

  const marginLeft = disableMarginLeft ? 0 : props.element.marginLeft;

  return (
    <SlateElement
      className={cn(className, 'overflow-x-auto py-5')}
      style={{ paddingLeft: marginLeft }}
      {...props}
    >
      <div className="group/table relative w-fit">
        <table className="mr-0 ml-px table h-px table-fixed border-collapse">
          <tbody className="min-w-full">{children}</tbody>
        </table>
      </div>
    </SlateElement>
  );
};

export function TableRowElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  return (
    <SlateElement as="tr" className={cn(className, 'h-full')} {...props}>
      {children}
    </SlateElement>
  );
}

export function TableCellElementStatic({
  children,
  className,
  isHeader,
  style,
  ...props
}: SlateElementProps<TTableCellElement> & {
  isHeader?: boolean;
}) {
  const { editor, element } = props;
  const { api } = editor.getPlugin(BaseTablePlugin);

  const { minHeight, width } = api.table.getCellSize({ element });
  const borders = api.table.getCellBorders({ element });

  return (
    <SlateElement
      as={isHeader ? 'th' : 'td'}
      className={cn(
        className,
        'h-full overflow-visible border-none bg-[#0f1217] p-0',
        element.background ? 'bg-(--cellBackground)' : 'bg-[#0f1217]',
        cn(
          isHeader && 'text-left font-normal *:m-0',
          'before:size-full',
          "before:absolute before:box-border before:content-[''] before:select-none",
          borders &&
            cn(
              borders.bottom?.size && `before:border-b-border before:border-b`,
              borders.right?.size && `before:border-r-border before:border-r`,
              borders.left?.size && `before:border-l-border before:border-l`,
              borders.top?.size && `before:border-t-border before:border-t`
            )
        )
      )}
      style={
        {
          '--cellBackground': element.background,
          maxWidth: width || 240,
          minWidth: width || 120,
          ...style,
        } as React.CSSProperties
      }
      {...{
        colSpan: api.table.getColSpan(element),
        rowSpan: api.table.getRowSpan(element),
      }}
      {...props}
    >
      <div
        className="relative z-20 box-border h-full px-8 pt-6 pb-0.25 flex justify-center whitespace-pre-wrap flex-col [&>*]:not-last:mb-1!"
        style={{ minHeight }}
      >
        {children}
      </div>
    </SlateElement>
  );
}

export function TableCellHeaderStaticElement(props: SlateElementProps) {
  return <TableCellElementStatic {...props} isHeader />;
}
