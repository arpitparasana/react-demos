import React, { useMemo } from "react";
import { useResizeColumns, useRowSelect, useSortBy, useTable, usePagination } from "react-table";
import { countriesPopulation } from "../DataRepo";
import './../styles.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ReactTable(props) {

    const dataPrep = () => {
        return countriesPopulation;
    }

    const columnPrep = () => {
        return [
            {
                id: 'selection',
                Header: ({ getToggleAllPageRowsSelectedProps }) => (
                    <div>
                        Select All <Checkbox id="selectAll" {...getToggleAllPageRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({ row }) => (
                    <div>
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
                disableSortBy: true
            },
            {
                Header: 'Country',
                accessor: 'country',
                sortType: (prev, curr, columnId) => {
                    return sortItems(prev, curr, columnId)
                }
            },
            {
                id: 'population',
                Header: 'Population',
                accessor: row => {
                    return row.population > 100 ? row.population : '< 100';
                },
            },
            {
                Header: 'Area',
                accessor: 'area'
            },
            {
                Header: () => (<>Flag &nbsp;&nbsp;</>),
                accessor: 'flag',
                disableSortBy: true
            }
        ]
    }


    const data = useMemo(dataPrep, []);
    const columns = useMemo(columnPrep, []);
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 400
        }),
        []
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: {pageIndex, pageSize, sortBy},
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        selectedFlatRows,
        toggleAllRowsSelected
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 5},
            defaultColumn
        },
        useSortBy,
        usePagination,
        useRowSelect,
        useResizeColumns
    );
    console.log(headerGroups[0].headers[0].getResizerProps());

    const sortItems = (prev, curr, columnId) => {
        if (prev.original[columnId].toLowerCase() > curr.original[columnId].toLowerCase()) {
            return 1;
        } else if (prev.original[columnId].toLowerCase() < curr.original[columnId].toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        toggleAllRowsSelected(false);
    },[pageIndex, sortBy]);

    useEffect(() => {
        const table = document.getElementById('resizeMe');
        const cols = table.querySelectorAll('th');
        [].forEach.call(cols, function (col) {
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');
            resizer.style.height = `${table.offsetHeight}px`;
            col.appendChild(resizer);
            createResizableColumn(col, resizer);
        });
    }, []);

    const createResizableColumn = function (col, resizer) {
        let x = 0;
        let w = 0;
        const mouseDownHandler = function (e) {
            x = e.clientX;
            const styles = window.getComputedStyle(col);
            w = parseInt(styles.width, 10);
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

        };
        const mouseMoveHandler = function (e) {
            const dx = e.clientX - x;
            col.style.width = `${w + dx}px`;
        };
        const mouseUpHandler = function () {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        resizer.addEventListener('mousedown', mouseDownHandler);
    };

    return (
        <div className='container'>
            <Link to='/'>Back to Main Page</Link>
            <h1>React table demo</h1>
            <table {...getTableProps()} style={{ border: 'solid 1px black' }} id="resizeMe" className="table">
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}

                                            style={{
                                                background: 'aliceblue',
                                                color: 'black',
                                                fontWeight: 'bold',
                                                border: 'solid 1px gray',
                                            }}
                                        >
                                            {
                                                column.render('Header')
                                            }
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : column.canSort ? '🔽🔼' : ''}

                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}
                                                    style={{
                                                        padding: '10px',
                                                        border: 'solid 1px gray'
                                                    }}>
                                                    {
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
                </button>
                <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
                </button>
            </div>

            <br />
            <br />

            Selected Rows: {selectedFlatRows.length} <br />
            {selectedFlatRows.map(m => {
                return <p key={m.original.id}>{m.original.country} {m.original.population} {m.original.area}</p>
            })}
        </div>
    );
}

// Do not overuse refs. You should only use refs for imperative behaviors that you can’t express as props: 
// for example, scrolling to a node, focusing a node, triggering an animation, selecting text, and so on

const Checkbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

export default ReactTable;