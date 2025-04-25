import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import Paginator from '@/shared/pagination/Paginator';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { PagedList } from '@/shared/types/models';
import { Dispatch, SetStateAction, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Skeleton from '../Skeleton/Skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Omit<PagedList<any>, 'content'>;
  setPagination?: Dispatch<SetStateAction<PaginationRequestDTO>>;
  loading: boolean;
  onRowClick?: (row: TData) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

export function SortableHeader({ column, header }: { column: Column<any, unknown>; header: string }) {
  return (
    <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting()}>
      {header}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp />
      ) : !!column.getIsSorted() ? (
        <ArrowDown />
      ) : (
        <ArrowUpDown className="text-gray-300" />
      )}
    </Button>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setPagination,
  loading,
  onRowClick,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange,
    manualSorting: true,
    state: {
      sorting,
    },
  });

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(data[index])}
                  className={onRowClick && 'hover:cursor-pointer hover:bg-accent'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-center mt-3">
          <Paginator
            currentPage={pagination.pageable.pageNumber + 1}
            totalPages={pagination.totalPages}
            onPageChange={(pageNumber) => setPagination?.({ page: pageNumber - 1, size: 10 })}
            showPreviousNext
          />
        </div>
      )}
    </div>
  );
}
