'use client';
import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';
type TableColumn<T> = Readonly<{
  label: string;
  key: string;
  renderCell: (entry: T) => React.ReactNode;
  sortingFn: (a: T, b: T, sortDirection: SortDirection) => number;
}>;
export type Columns<T> = ReadonlyArray<TableColumn<T>>;

function applySorting<T>(
  entries: Array<T>,
  columns: Columns<T>,
  field: string | null,
  direction: SortDirection
) {
  const entriesCopy = entries.slice();
  const sortFn = columns.find(col => col.key === field)?.sortingFn;

  if (sortFn == null) {
    return entriesCopy;
  }

  return entriesCopy.sort((a, b) => sortFn(a, b, direction));
}

export default function DataTable<T extends { id: string | number }>({
  entries,
  columns,
  onRowClick,
  onRowHover,
  onRowLeave,
  selectedId,
  containerClassName = '',
  headerTextSize = 'xs',
  bodyTextSize = 'sm',
  headerClassName = '',
}: Readonly<{
  entries: Array<T>;
  columns: Columns<T>;
  onRowClick?: (entry: T) => void;
  onRowHover?: (entry: T) => void;
  onRowLeave?: () => void;
  selectedId?: string | number;
  containerClassName?: string;
  headerClassName?: string;
  headerTextSize?: 'xs' | 'sm' | 'base' | 'xxs';
  bodyTextSize?: 'xs' | 'sm' | 'base' | 'xxs';
}>) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedEntries = applySorting(entries, columns, sortField, sortDirection);
  const textSizes = {
    xxs: 'text-xxs',
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  };

  return (
    <div className={`bg-white rounded-lg p-3 w-full ${containerClassName}`}>
      <table className=" min-w-full divide-y">
        <thead className={`w-full border-0 ${headerClassName}`}>
          <tr>
            {columns.map(({ label, key }, index) => {
              const headerTextAlign =
                columns.length > 2 && index >= columns.length - 2 ? 'text-right' : 'text-left';
              return (
                <th
                  key={key}
                  className={`border-b-1 border-gray-200 p-2 text-left ${headerTextAlign} ${textSizes[headerTextSize]} font-medium text-gray-500 uppercase tracking-wider bg-transparent`}
                >
                  <button
                    className={`space-x-1 hover:text-gray-700`}
                    onClick={() => {
                      if (sortField !== key) {
                        setSortField(key);
                        setSortDirection('asc');
                      } else {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      }
                    }}
                  >
                    {label}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedEntries.map((entry, index) => (
            <tr
              key={entry.id}
              onClick={() => onRowClick?.(entry)}
              onMouseEnter={() => onRowHover?.(entry)}
              onMouseLeave={() => onRowLeave?.()}
              className={`cursor-pointer transition-colors duration-150 ${
                entry.id === selectedId ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              {columns.map(({ key, renderCell }, index) => {
                const bodyTextAlign =
                  columns.length > 2 && index >= columns.length - 2 ? 'text-right' : 'text-left';
                return (
                  <td
                    key={key}
                    className={`p-2 whitespace-nowrap ${bodyTextAlign} ${textSizes[bodyTextSize]} text-gray-900`}
                  >
                    {renderCell(entry)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
