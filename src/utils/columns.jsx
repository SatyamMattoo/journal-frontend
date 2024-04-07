import { FaArrowAltCircleRight } from "react-icons/fa";

export const archivesColumns = [
  {
    accessorKey: "title",
    header: () => "Title",
  },
  {
    accessorKey: "description",
    header: () => "Description",
    cell: (info) =>
      info.getValue().length > 50
        ? info.getValue().substring(0, 47) + "..."
        : info.getValue(),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: () => "Author Name",
    cell: (info) => info.row.original.author.name || "",
  },
  {
    accessorKey: "email",
    header: () => "Author Email",
    cell: (info) => info.row.original.author.email || "",
  },
  {
    accessorKey: "createdAt",
    header: "Published On",
    cell: (info) => {
      const date = new Date(info.getValue());
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    },
  },
  {
    accessorKey: "pdfFile",
    header: "PDF",
    enableColumnFilter: false,
    cell: (info) => {
      return (
        <a
          rel="stylesheet"
          referrerPolicy="no-referrer"
          href={info.getValue()}
          target="_blank"
          className="flex items-center gap-2 text-primary"
        >
          View <FaArrowAltCircleRight />
        </a>
      );
    },
  },
];

export const editorsColumns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
];