import React from "react";
import {
  useReactTable,
  makeStateUpdater,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  flexRender,
  functionalUpdate,
} from "@tanstack/react-table";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export const DensityFeature = {
  // define the new feature's initial state
  getInitialState: (state) => {
    return {
      density: "md",
      ...state,
    };
  },

  // define the new feature's default options
  getDefaultOptions(table) {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater("density", table),
    };
  },
  createTable(table) {
    table.setDensity = (updater) => {
      const safeUpdater = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onDensityChange?.(safeUpdater);
    };
  },
};

function Table({
  children,
  tableData,
  columns,
  bottomView = true,
  emptyMessage = "No data to display",
}) {
  const [data, setData] = React.useState(tableData);
  const [density, setDensity] = React.useState("md");

  React.useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    _features: [DensityFeature], //pass our custom feature to the table to be instantiated upon creation
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: bottomView ? getPaginationRowModel() : undefined,
    state: {
      density, //passing the density state to the table, TS is still happy :)
    },
    onDensityChange: setDensity, //using the new onDensityChange option, TS is still happy :)
  });

  return (
    <div className="p-4 w-full rounded-lg overflow-scroll scroll-smooth no-scrollbar">
      <div className="h-2" />
      {children}
      <table className="w-full border-collapse rounded-lg">
        <thead className="bg-primary text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="p-2">
                    <div
                      {...{
                        className: `cursor-pointer select-none flex items-center text-lg gap-2 ${
                          header.column.getIsSorted()
                            ? "font-semibold"
                            : "font-normal"
                        }`,
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaArrowUp />,
                        desc: <FaArrowDown />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="self-start flex space-y-1">
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => {
              return (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } border-b`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          padding:
                            density === "sm"
                              ? "4px"
                              : density === "md"
                              ? "8px"
                              : "16px",
                          transition: "padding 0.2s",
                        }}
                        className="p-2 text-gray-700 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center font-medium text-lg text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="h-2" />
      {bottomView ? (
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-3 items-center">
            <button
              className="bg-primary text-white rounded py-1 px-2 disabled:opacity-50 cursor-pointer"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="bg-primary text-white rounded py-1 px-2 disabled:opacity-50 cursor-pointer"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="bg-primary text-white rounded py-1 px-2 disabled:opacity-50 cursor-pointer"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="bg-primary text-white rounded py-1 px-2 disabled:opacity-50 cursor-pointer"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
          <span className="flex items-center gap-1">
            Page
            <strong className="">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border p-1 rounded cursor-pointer"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="px-2 py-1 border shadow rounded text-sm font-light outline-none text-black"
    />
  );
}

export default Table;
