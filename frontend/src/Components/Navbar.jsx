
import "../styles/Dashboardlayout.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyNotifications } from "../Services/service";

const Navbar = () => {
    const navigate = useNavigate();

    const [unreadCount, setUnreadCount] = useState(0);

    const userId = localStorage.getItem("userId");

    const loadUnreadCount = async () => {
        if (!userId) return;

        try {
            const data = await getMyNotifications(userId);

            const unread = data.filter(
                (item) => !item.read
            ).length;

            setUnreadCount(unread);
        } catch (error) {
            console.error("Notification error:", error);
        }
    };

    useEffect(() => {
        loadUnreadCount();

        const interval = setInterval(loadUnreadCount, 30000);

        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div className="navbar">

            <div>
                <h1>SYNQRA</h1>
            </div>

            <div className="navbar-right">

                <button
                    className="notification-btn"
                    onClick={() => navigate("/notifications")}
                >
                    🔔
                    {unreadCount > 0 && (
                        <span className="notification-count">
                            {unreadCount}
                        </span>
                    )}
                </button>

                <select>
                    <option>admin</option>
                    <option>user</option>
                </select>

                <button onClick={() => navigate("/Login")}>
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Navbar;
