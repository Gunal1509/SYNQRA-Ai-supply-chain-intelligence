import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import "../styles/Dashboardlayout.css";
function Dashboardlayout(props) {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
      <div className="layout">
        <Sidebar />

        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Dashboardlayout;