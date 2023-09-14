import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of data.
export interface person {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstLastName: string;
  note: string | null;
  height: string | null,
  shoeSize: string | null,
  size: string | null,
  waistSize: string | null,
  authorId: string;
  authorName: string | null;
}

// Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

export const columns: ColumnDef<person>[] = [
  {
    accessorKey: "firstLastName",
    header: () => <div className="text-xl">Imię i nazwisko</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={`/person/${row.original.id}`}
          className="block h-full w-full p-4"
        >
          {" "}
          <div>{row.getValue("Imię i nazwisko")}</div>{" "}
        </Link>
      );
    },
    id: "Imię i nazwisko",
  },
  {
    accessorKey: "note",
    header: () => <div className="text-xl">Uwagi</div>,
    cell: ({ row }) => {
      return (
        <Link
          href={`/person/${row.original.id}`}
          className="block h-full w-full p-4"
        >
          <div>{row.getValue("Uwagi")}</div>
        </Link>
      );
    },
    id: "Uwagi",
  },
];
