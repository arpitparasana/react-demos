import React from "react";
// import CoinFlip from "./coinflip";
import { useTable } from "react-table";
import { countriesPopulation } from "../DataRepo";

function ReactTable(props) {
    
    const data = React.useMemo(() => dataPrep(),[]);
    const columns = React.useMemo(() => columnPrep(),[]);
    const tableInstance = useTable({columns,data});

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

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

        </div>
    );
}

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
            Header: 'Population',
            accessor: 'population'
        },
        {
            Header: 'Area',
            accessor: 'area'
        }
    ]
}

export default ReactTable;