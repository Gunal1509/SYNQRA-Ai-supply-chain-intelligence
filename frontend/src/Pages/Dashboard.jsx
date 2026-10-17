import Kpicards from "../Components/Kpicards";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [stats, setStats] = useState({
        totalOrders: 0,
        activeShipments: 0,
        suppliers: 0,
        pendingOrders: 0,
        incompleteOrders: 0,
        deliveredOrders: 0
    });

    useEffect(() => {

        const getDashboardStats = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Dashboard data:", response.data);

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
                    pendingOrders={stats.pendingOrders}
                    incompleteOrders={stats.incompleteOrders}
                    deliveredOrders={stats.deliveredOrders}
                />

            </div>

        </>

    );
}

export default Dashboard;