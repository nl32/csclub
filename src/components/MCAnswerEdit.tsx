import {
  CellContext,
  createColumnHelper,
  flexRender,
  RowData,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { JSONContent } from "@tiptap/core";
import { useEffect, useMemo, useState } from "react";
import TipTap from "./TipTap";

type Answer = {
  content: JSONContent;
  correct: boolean;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateCorrect: (
      rowIndex: number,
      columnnId: string,
      value: boolean
    ) => void;
    addData: (answer: Answer) => void;
    deleteRow: (rowIndex: number) => void;
  }
}

const columnHelper = createColumnHelper<Answer>();

const MCAnswerEdit = ({
  value,
  onChange,
}: {
  value: Answer[];
  onChange: (value: Answer[]) => void;
}) => {
  const [data, setData] = useState<Answer[]>(value);
  const [correct, setCorrect] = useState(-1);
  useEffect(() => {
    onChange(data);
  }, [data, onChange]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("content", {
        header: () => <span className="">Answer</span>,
        cell: (info) => {
          return <AnswerContentBox info={info} />;
        },
      }),
      columnHelper.accessor("correct", {
        header: () => <div className="text-center">Correct</div>,
        cell: (info) => <AnswerCorrect info={info} />,
      }),
      columnHelper.display({
        id: "Remove",
        header: (info) => {
          const onClick = () => {
            info.table.options.meta?.addData({ content: {}, correct: false });
          };
          return (
            <button
              type="button"
              className="rounded-md bg-red-500 p-1 hover:bg-red-400"
              onClick={onClick}
            >
              add
            </button>
          );
        },
        cell: (props) => {
          props.row;
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                props.table.options.meta?.deleteRow(props.row.index);
              }}
            >
              Remove
            </div>
          );
        },
      }),
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      updateCorrect: (rowIndex: number, columnId: string, value: boolean) => {
        setData((old) =>
          old.map((row, index) => {
            if (value && index === correct) {
              return {
                ...old[index]!,
                [columnId]: false,
              };
            }
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
        if (rowIndex == correct && !value) {
          setCorrect(-1);
        }
        if (value) {
          setCorrect(rowIndex);
        }
      },
      addData: (answer: Answer) => {
        setData((old) => {
          return [...old, answer];
        });
      },
      deleteRow: (rowIndex: number) => {
        setData((old) => {
          old.splice(rowIndex, 1);
          return [...old];
        });
        if (rowIndex == correct) setCorrect(-1);
      },
    },
  });

  return (
    <>
      <div className="mr-auto ml-0 rounded-md bg-blue-500 p-1">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  );
};

const AnswerContentBox = ({
  info,
}: {
  info: CellContext<Answer, JSONContent>;
}) => {
  const initialValue = info.getValue();
  const [content, setContent] = useState(initialValue);
  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);
  useEffect(() => {
    info.table.options.meta?.updateData(
      info.row.index,
      info.column.id,
      content
    );
  }, [content]);
  return <TipTap content={content} stateCallback={setContent} />;
};
const AnswerCorrect = ({ info }: { info: CellContext<Answer, boolean> }) => {
  const initialValue = info.getValue();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onClick = () => {
    info.table.options.meta?.updateCorrect(
      info.row.index,
      info.column.id,
      !value
    );
  };
  return (
    <div
      onClick={onClick}
      className="container mx-auto flex w-min justify-center"
    >
      <span>{value ? "✅" : "❌"}</span>
    </div>
  );
};

export default MCAnswerEdit;
