import { Component, For } from 'solid-js';

import { createTable, createTableInstance, getCoreRowModel } from '@tanstack/solid-table';
import { Table, Tbody, Td, Th, Thead, Tr } from '@hope-ui/solid';

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
                                            {header.isPlaceholder ? null : header.renderHeader()}
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
