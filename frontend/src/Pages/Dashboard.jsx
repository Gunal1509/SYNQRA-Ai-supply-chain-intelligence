import Kpicards from "../Components/Kpicards";
import OrdersTable from "../Components/OrdersTables";
import { useEffect,useState } from "react";
import axios from "axios";

function Dashboard() {
  const[supplies,setsupp]=useState([]);
  useEffect(()=>{
      const getDashboardStats = async () => {
    const response = await axios.get("http://localhost:5000/dashboard");

    setsupp(response.data);
};
   getDashboardStats();
},[]);
       
 
  return (<><h1  style={{ color: "red" }}>Dashboard</h1>
              <div className="kpi-container">
              {supplies.map((kpi,index)=>(
                     <Kpicards key={index} totalOrders={kpi.totalOrders}
  activeShipments={kpi.activeShipments}
  suppliers={kpi.suppliers}
  delayedOrders={kpi.delayedOrders}/>
              ))}
          </div>
             </>);
}

export default Dashboard;