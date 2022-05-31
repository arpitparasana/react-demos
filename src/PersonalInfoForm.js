import { useEffect, useState } from "react";

const PersonalInfoForm = (props) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    useEffect(()=>{
        props.setFirstName(firstName);
        props.setLastName(lastName);
    },[firstName, lastName]);

    return (
        <>
            First Name: <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input><br/>
            Last Name: <input value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
        </>
    );
}

export default PersonalInfoForm;