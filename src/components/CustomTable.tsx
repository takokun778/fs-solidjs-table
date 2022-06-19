import { Component, createSignal, For, Show } from 'solid-js';

import { Table, Tbody, Td, Th, Thead, Tr } from '@hope-ui/solid';
import {
    createTable,
    createTableInstance,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
} from '@tanstack/solid-table';

export type Person = {
    firstName: string;
    lastName: string;
    age: number;
};

const table = createTable().setRowType<Person>();

const columns = [
    table.createDataColumn('firstName', {
        id: 'firstName',
        cell: (info) => info.getValue(),
    }),
    table.createDataColumn('lastName', {
        id: 'lastName',
        cell: (info) => info.getValue(),
    }),
    table.createDataColumn('age', {
        id: 'age',
        cell: (info) => info.getValue(),
    }),
];

export const CustomTable: Component = () => {
    const [sorting, setSorting] = createSignal<SortingState>([]);

    const data: Person[] = [
        {
            firstName: 'rei',
            lastName: 'ozono',
            age: 22,
        },
        {
            firstName: 'rina',
            lastName: 'matsuda',
            age: 22,
        },
    ];

    const instance = createTableInstance(table, {
        data,
        getCoreRowModel: getCoreRowModel(),
        columns,
        state: {
            get sorting() {
                return sorting();
            },
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <>
            <Table>
                <Thead>
                    <For each={instance.getHeaderGroups()}>
                        {(headerGroup) => (
                            <Tr>
                                <For each={headerGroup.headers}>
                                    {(header) => (
                                        <Th colSpan={header.colSpan}>
                                            <Show when={!header.isPlaceholder}>
                                                <div
                                                    class={
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : undefined
                                                    }
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {header.renderHeader()}
                                                    {{
                                                        asc: '↑',
                                                        desc: '↓',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            </Show>
                                        </Th>
                                    )}
                                </For>
                            </Tr>
                        )}
                    </For>
                </Thead>
                <Tbody>
                    <For each={instance.getRowModel().rows}>
                        {(row) => (
                            <Tr>
                                <For each={row.getVisibleCells()}>{(cell) => <Td>{cell.renderCell()}</Td>}</For>
                            </Tr>
                        )}
                    </For>
                </Tbody>
            </Table>
        </>
    );
};
