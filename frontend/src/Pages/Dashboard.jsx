import Kpicards from "../Components/Kpicards";
import {kpis} from "../Utils/Mockdata";
import { orders } from "../Utils/Mockdata";
import OrdersTable from "../Components/OrdersTables";

function Dashboard() {
 
  return (<><h1  style={{ color: "red" }}>Dashboard</h1>
              <div className="kpi-container">
              {kpis.map((kpi,index)=>(
                     <Kpicards key={index} title={kpi.title} value={kpi.data}/>
              ))}
          </div>
             
  </>);
}

export default Dashboard;