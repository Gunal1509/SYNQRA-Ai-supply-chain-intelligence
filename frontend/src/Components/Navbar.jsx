import "../styles/Dashboardlayout.css";
const Navbar=()=>{
    return(
        <>
        <div className="navbar">
        <div><h1>SYNQRA</h1></div>
        <div>
                <select>
                    <option>admin</option>
                    <option>user</option>
                </select>
        </div>
        </div>
        </>
    );
}
export default Navbar;