// created with https://ui.shadcn.com/docs/components/data-table
import * as React from "react";

import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  getSortedRowModel,
  type ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "~/components/Ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/Ui/table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="flex flex-col items-center py-4">
      <Input
        placeholder="Wyszukaj..."
        value={
          (table.getColumn("Imię i nazwisko")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("Imię i nazwisko")?.setFilterValue(event.target.value)
        }
        className="max-w-[500px]"
      />

      <div>
        <Table className="max-w-[500px]">
          <TableHeader className="border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex flex-row justify-between border-none"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="flex flex-row justify-stretch rounded border-solid border-slate-300 hover:bg-slate-400 hover:shadow-md"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Brak wyników
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button
          className="bg-slate-400 hover:bg-slate-500 disabled:cursor-not-allowed"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Wróć
        </Button>
        <Button
          className="bg-slate-400 hover:bg-slate-500 disabled:cursor-not-allowed"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Dalej
        </Button>
      </div>
    </div>
  );
}
