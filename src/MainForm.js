import {useState } from "react"
import PersonalInfoForm from './PersonalInfoForm';

/** 
 * Demo of Bottom Up data flow in react
 * by passing callback of state methods to child component, 
 * you are giving child component power to update the data in parent component
 * 
 **/ 
const MainForm = () => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();

    return (
        <div>
            <PersonalInfoForm firstName={firstName} setFirstName={setFirstName}
                        lastName={lastName} setLastName={setLastName}
                        age={age} setAge={setAge}/>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Age: {age}</p>
        </div>
    );
}

export default MainForm;