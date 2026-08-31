import "../styles/Dashboardlayout.css";
const Kpicards=(props)=>{
    return(
        <>
        <div className="kpidata-container">
        <div><h4>Titles: {props.title}</h4></div>
        <div><h4>Data:{props.value}</h4></div>
        </div>
        </>
    )
}
export default Kpicards;