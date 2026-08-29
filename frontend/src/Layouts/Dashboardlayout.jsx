import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
function Dashboardlayout(props) {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <Outlet />
    </>
  );
}

export default Dashboardlayout;