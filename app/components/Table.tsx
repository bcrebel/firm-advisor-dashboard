'use client'
import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';
type TableColumn<T> = Readonly<{
  label: string;
  key: string;
  renderCell: (entry: T) => React.ReactNode;
  sortingFn: (
    a: T,
    b: T,
    sortDirection: SortDirection,
  ) => number;
}>;
export type Columns<T> = ReadonlyArray<TableColumn<T>>;

function applySorting<T>(
  entries: Array<T>,
  columns: Columns<T>,
  field: string | null,
  direction: SortDirection,
) {
  const entriesCopy = entries.slice();
  const sortFn = columns.find(
    (col) => col.key === field,
  )?.sortingFn;

  if (sortFn == null) {
    return entriesCopy;
  }

  return entriesCopy.sort((a, b) =>
    sortFn(a, b, direction),
  );
}

export default function DataTable<
  T extends { id: string | number },
>({
  entries,
  columns,
  onRowClick,
  onRowHover,
  onRowLeave,
  selectedId,
}: Readonly<{
  entries: Array<T>;
  columns: Columns<T>;
  onRowClick?: (entry: T) => void;
  onRowHover?: (entry: T) => void;
  onRowLeave?: () => void;
  selectedId?: string | number;
}>) {
  const [sortField, setSortField] = useState<string | null>(
    null,
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('asc');

  const sortedEntries = applySorting(
    entries,
    columns,
    sortField,
    sortDirection,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (sortField !== key) {
                      setSortField(key);
                      setSortDirection('asc');
                    } else {
                      setSortDirection(
                        sortDirection === 'asc'
                          ? 'desc'
                          : 'asc',
                      );
                    }
                  }}>
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry) => (
            <tr 
              key={entry.id}
              onClick={() => onRowClick?.(entry)}
              onMouseEnter={() => onRowHover?.(entry)}
              onMouseLeave={() => onRowLeave?.()}
              className={`cursor-pointer ${
                entry.id === selectedId 
                  ? 'bg-gray-100 dark:bg-gray-700' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {columns.map(({ key, renderCell }) => (
                <td key={key}>{renderCell(entry)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
}
