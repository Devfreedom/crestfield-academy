'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

type DataTableProps<T> = {
  columns: { key: string; label: string; format?: (val: any) => string }[];
  data: T[];
  searchableKeys?: (keyof T)[];
  emptyMessage?: string;
  actions?: (item: T) => React.ReactNode;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchableKeys,
  emptyMessage = 'No records found.',
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !search ||
        (searchableKeys?.some((key) => {
          const val = item[key];
          return val != null && String(val).toLowerCase().includes(search.toLowerCase());
        }) ?? true);
      const matchesFilter =
        !filterValue ||
        Object.values(item).some((val) =>
          val != null && String(val).toLowerCase().includes(filterValue.toLowerCase())
        );
      return matchesSearch && matchesFilter;
    });
  }, [data, search, filterValue, searchableKeys]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-gold focus:outline-none"
            autoComplete="off"
          />
        </div>
        {actions && (
          <button className="ml-auto md:ml-0 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50"
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-slate-600">
                      {col.format ? col.format(item[col.key]) : String(item[col.key])}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && data.length > 0 && (
        <div className="p-6 text-center text-slate-500 text-sm">
          No records match your search or filter.
        </div>
      )}
    </div>
  );
}