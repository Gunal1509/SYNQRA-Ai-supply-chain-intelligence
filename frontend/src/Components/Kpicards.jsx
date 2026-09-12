import "../styles/Dashboardlayout.css";
const Kpicards=(props)=>{
    return(
        <>
        <div className="kpidata-container">
        <div><h4>TotalOrders: {props.totalOrders}</h4></div>
        <div><h4>ActiveShipments: {props.activeShipments}</h4></div>
        <div><h4>Suppliers: {props.suppliers}</h4></div>
        <div><h4>DelayedOrders: {props.delayedOrders}</h4></div>
        </div>
        </>
    )
}
export default Kpicards;