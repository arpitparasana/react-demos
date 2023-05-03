import React, { useEffect, useMemo, useState } from "react";
// import CoinFlip from "./coinflip";
import { useRowSelect, useTable } from "react-table";
import { countriesPopulation } from "../DataRepo";
import { Link } from "react-router-dom";

function ReactTable(props) {
    
    const [temp, setTemp] = useState(0);
    const [arr, setArr] = useState([]);
    const dataPrep = () => {
        return countriesPopulation;
    }
    
    const columnPrep = () => {
        return [
            {
                Header: 'Country',
                accessor: 'country'
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
                Header: 'Action',
                Cell: ({row}) => {
                    return <Link to={'/reacttable/'+row.original.country}>View More</Link>
                }
            },
            {
                Header: 'Flag',
                accessor: 'flag'
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
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => {
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()}/>
                        </div>
                    },
                    Cell: ({row}) => (
                     <div>
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                     </div>   
                    )
                },
                ...columns,
            ])
        });

    useEffect(()=>{
        const arr = [{name:'arpit'},{name: 'akruti'}];
        setArr(arr);
    },[])

    const handleClick = e => {
        setTemp(() => temp + 1);
        console.log("Temp: " + temp);
        //arr.map(a=>console.log(a.name));
        console.log(arr);
    }
    
    return(
        <div className='container'>
            <h1>React table demo</h1>
            {/* <p>Headless component demo using CoinFlip as an example</p>
            <CoinFlip>
                {({ flip, isHeads }) => (
                    <>
                        <button onClick={flip}>Flip</button><br/>
                        {isHeads ? (<>Heads</>):(<>Tails</>)}
                    </>
                )}
            </CoinFlip> */}
            
            Filter By Flag:  
            <select>
                <option value='Y'>Y</option>
                <option value='N'>N</option>
            </select>
            <br />
            <br />
            <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}
                                        style={{
                                            background: 'aliceblue',
                                            color: 'black',
                                            fontWeight: 'bold',
                                            border: 'solid 1px gray'
                                          }}>
                                            {
                                                column.render('Header')
                                            }
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

const IndeterminateCheckbox = React.forwardRef(
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