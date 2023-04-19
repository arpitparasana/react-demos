import CoinFlip from "./coinflip";

function ReactTable(props) {

    return(
        <div className='container'>
            <h1>React table demo</h1>
            <p>Headless component demo using CoinFlip as an example</p>
            <CoinFlip>
                {({ flip, isHeads }) => (
                    <>
                        <button onClick={flip}>Flip</button><br/>
                        {isHeads ? (<>Heads</>):(<>Tails</>)}
                    </>
                )}
            </CoinFlip>
        </div>
    );
}

export default ReactTable;