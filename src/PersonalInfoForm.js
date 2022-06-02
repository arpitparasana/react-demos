import { useEffect, useState } from "react";

const PersonalInfoForm = (props) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    useEffect(()=>{
        console.log('Handling PersonalInfoForm effects');
        props.setFirstName(firstName);
        props.setLastName(lastName);
        props.setAge(age);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[firstName, lastName, age]);

    return (
        <>
            First Name: <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input><br/>
            Last Name: <input value={lastName} onChange={(e)=>setLastName(e.target.value)}></input><br/>
            Age: <input value={age} onChange={(e)=>setAge(e.target.value)}></input><br/>
        </>
    );
}

export default PersonalInfoForm;