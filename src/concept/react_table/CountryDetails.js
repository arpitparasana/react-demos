import { useParams } from "react-router-dom";

function CountryDetails(props) {
    const country = useParams();

    return(
        <>
            <h1>{country}</h1>
        </>
    );
}

export default CountryDetails;