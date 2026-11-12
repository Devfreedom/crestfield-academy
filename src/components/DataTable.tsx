'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';

export type Column<T> = {
  key: keyof T & string;
  label: string;
  render?: (item: T) => ReactNode;
  format?: (value: T[keyof T], item: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
};

export type TableFilter<T> = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  /** When provided, rows are narrowed to those matching the selected value. */
  matches?: (item: T, value: string) => boolean;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  searchableKeys?: (keyof T & string)[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  caption: string;
  rowActions?: (item: T) => ReactNode;
  filters?: TableFilter<T>[];
  getRowKey?: (item: T, index: number) => string;
};

const ALIGN = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const;

export default function DataTable<T>({
  columns,
  data,
  searchableKeys,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No records found.',
  caption,
  rowActions,
  filters,
  getRowKey,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const searchId = useId();
  const filterIds = useId();

  const filteredData = useMemo(() => {
    let rows = data;

    for (const filter of filters ?? []) {
      // An empty value or the conventional "all" option means "no narrowing".
      if (!filter.matches || !filter.value || filter.value === 'all') continue;
      rows = rows.filter((item) => filter.matches!(item, filter.value));
    }

    const term = search.trim().toLowerCase();
    if (!term) return rows;

    const keys = searchableKeys ?? (Object.keys(data[0] ?? {}) as (keyof T & string)[]);
    return rows.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(term);
      }),
    );
  }, [data, search, searchableKeys, filters]);

  const keyFor = (item: T, index: number) => {
    if (getRowKey) return getRowKey(item, index);
    const id = (item as { id?: unknown }).id;
    return typeof id === 'string' ? id : `row-${index}`;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {(searchableKeys || filters) && (
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-end lg:justify-between">
          {searchableKeys ? (
            <search className="w-full lg:max-w-xs">
              <label htmlFor={searchId} className="sr-only">
                {searchPlaceholder}
              </label>
              <div className="relative">
                <Search
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id={searchId}
                  name="q"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>
            </search>
          ) : (
            <div />
          )}

          {filters && filters.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {filters.map((filter, index) => {
                const id = `${filterIds}-${index}`;
                return (
                  <div key={filter.id} className="flex flex-col gap-1">
                    <label htmlFor={id} className="text-xs font-semibold text-slate-500">
                      {filter.label}
                    </label>
                    <select
                      id={id}
                      name={filter.id}
                      value={filter.value}
                      onChange={(event) => filter.onChange(event.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* The table scrolls horizontally on narrow screens (per AGENTS.md), so
          the scroll container needs to be reachable and scrollable with the
          keyboard alone: a focusable region with an accessible name. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${caption} (scrollable table)`}
        className="overflow-x-auto"
      >
        <table className="w-full text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 ${ALIGN[column.align ?? 'left']}`}
                >
                  {column.label}
                </th>
              ))}
              {rowActions && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (rowActions ? 1 : 0)}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={keyFor(item, index)} className="transition-colors hover:bg-slate-50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-sm text-slate-600 ${ALIGN[column.align ?? 'left']}`}
                    >
                      {column.render
                        ? column.render(item)
                        : column.format
                          ? column.format(item[column.key], item)
                          : String(item[column.key] ?? '')}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">{rowActions(item)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && data.length > 0 && (
        <p className="border-t border-slate-100 px-6 py-4 text-center text-sm text-slate-500">
          No records match your search or filter.
        </p>
      )}
    </div>
  );
}
