import AdminHome from "./AdminHome";
import { testExport, intList, stringList, food } from "./DataRepo";
import FoodNavigator from "./FoodNavigator";
import MyButton from "./MyButton";
import PublicHome from "./PublicHome";
import './styles.css';

export default function MyApp() {
    let loggedIn = false;

    return (
        <div className='container'>
            <h1>Welcome to main concept page</h1>
            <hr/>
            <MyButton styleClass='p-blue' label={'Blue Button'} /> <br />
            <MyButton styleClass='p-red' label="Red Button" />
            <hr/>
            <p className="p-blue">{testExport}</p>
            <hr/>
            {loggedIn ? <AdminHome /> : <PublicHome />}
            <hr/>
            <MyButton styleClass={loggedIn ? 'p-blue' : 'p-red'}
                label={loggedIn ? 'Logout' : 'Login'} />
            <hr/>
            <p>Rendering buttons using Map on Array list of String</p>
            {food.map((item) => {
                return <li key={item.id} className={item.type === '1' ? 'veg' : 'fruit'}>{item.name}</li>
            })}
            <hr/>
            <FoodNavigator/>
        </div>
    );
}