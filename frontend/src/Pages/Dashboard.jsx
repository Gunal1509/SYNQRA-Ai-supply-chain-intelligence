import Kpicards from "../Components/Kpicards";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [stats, setStats] = useState({
        totalOrders: 0,
        activeShipments: 0,
        suppliers: 0,
        delayedOrders: 0
    });

    useEffect(() => {

        const getDashboardStats = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8080/dashboard"
                );

                setStats(response.data);

            } catch (error) {

                console.error(
                    "Error loading dashboard:",
                    error
                );

            }

        };

        getDashboardStats();

    }, []);


    return (

        <>
            <h1 style={{ color: "red" }}>
                Dashboard
            </h1>

            <div className="kpi-container">

                <Kpicards
                    totalOrders={stats.totalOrders}
                    activeShipments={stats.activeShipments}
                    suppliers={stats.suppliers}
                    delayedOrders={stats.delayedOrders}
                />

            </div>

        </>

    );
}

export default Dashboard;