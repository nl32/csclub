import { Permission } from "@prisma/client";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Permission>()

const defaultColumns = [
    columnHelper.accessor(row=>row.slug,{
        header:"Permission",
        cell: info => (<span className="text-yellow-300">{info.getValue()}</span>)
    }),
    columnHelper.display({
        header:"Actions"
    })
]

export const PermissionTable = ({permissions}:{permissions:Permission[]}) => {
    const table = useReactTable({data:permissions,columns:defaultColumns,getCoreRowModel:getCoreRowModel()})
    return <div className="bg-blue-800">
        <table className="rounded-md">
            <thead className="border-slate-800 border-b-2">
                {table.getHeaderGroups().map(headerGroup=>(
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (<td>
                            {flexRender(cell.column.columnDef.cell,cell.getContext())}
                        </td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
