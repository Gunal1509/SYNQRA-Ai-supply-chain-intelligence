import "../styles/Dashboardlayout.css";
import { useNavigate } from "react-router-dom";

const Navbar=()=>{
    const navigate=useNavigate();
    return(
        <>
        <div className="navbar">
        <div><h1>SYNQRA</h1></div>
        <div>
                <select>
                    <option>admin</option>
                    <option>user</option>
                </select>
                <button onClick={()=>navigate("/Login")}>Logout</button>
        </div>
        </div>
        </>
    );
}
export default Navbar;