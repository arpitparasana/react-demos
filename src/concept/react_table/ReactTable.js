import React, {useMemo } from "react";
import { useRowSelect, useSortBy, useTable } from "react-table";
import { countriesPopulation } from "../DataRepo";

function ReactTable(props) {
    
    const dataPrep = () => {
        return countriesPopulation;
    }
    
    const columnPrep = () => {
        return [
            {
                id: 'selection',
                Header: ({getToggleAllRowsSelectedProps}) => (
                    <div>
                        Select All <Checkbox {...getToggleAllRowsSelectedProps()}/>
                    </div>
                ),
                Cell: ({row}) => (
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
                Header: ()=>(<>Flag &nbsp;&nbsp;</>),
                accessor: 'flag',
                disableSortBy: true
            }
        ]
    }
    

    const data = useMemo(dataPrep,[]);
    const columns = useMemo(columnPrep,[]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data
        },
        useSortBy,
        useRowSelect);

    const sortItems = (prev, curr, columnId) => {
        if (prev.original[columnId].toLowerCase() > curr.original[columnId].toLowerCase()) {
            return 1;
        } else if (prev.original[columnId].toLowerCase() < curr.original[columnId].toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    };
    
    return(
        <div className='container'>
            <h1>React table demo</h1>
            <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                        style={{
                                            background: 'aliceblue',
                                            color: 'black',
                                            fontWeight: 'bold',
                                            border: 'solid 1px gray'
                                          }}>
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
                        rows.map(row => {
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
            <br />
            <br />
         
            Selected Rows: <br />
            {selectedFlatRows.map(m=>{
                return <p key={m.original.id}>{m.original.country} {m.original.population} {m.original.area}</p>
            })}
            
        </div>
    );
}

const Checkbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        {console.log(rest)}
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export default ReactTable;