import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { useTable, useGlobalFilter } from 'react-table'
import GlobalFilter from './GlobalFilter';
import './table.scss';

const ReactTable = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state,
        preGlobalFilteredRows, setGlobalFilter, } = useTable({
            columns, data
        }, useGlobalFilter);
    const firstPageRows = rows.slice(0, 10)
    return (
        <Fragment>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <br />
            <div>Showing the first 10 results of {rows.length} rows</div>
            <br />
            <Table hover {...getTableProps()} style={{ border: 'solid 1px #efefef', boxShadow: '0 3px 6px 0 rgb(0 0 0 / 16%)' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            })}
                        </tr>
                    ))}
                </thead>
                {/* <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return cell && cell.value && cell.value.indexOf("http") == 0 ? <td key={cell}> <a href={cell.value} target="_blank">{cell.value}</a></td> : <td key={cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody> */}
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default ReactTable;




