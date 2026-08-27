import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
function Dashboardlayout() {
  const navigate = useNavigate();

  return (
    <>
    <h1>Dashboardlayout</h1>
    <Navbar/>
    <Sidebar/>
    <Outlet />
    </>
  );
}

export default Dashboardlayout;