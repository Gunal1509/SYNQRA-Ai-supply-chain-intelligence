import { NavLink } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    return (
        <aside className="sidebar">

            <h2>SYNQRA</h2>

            {/* USER */}
            {role !== "ADMIN" && (
                <>
                    <NavLink
                        className="sd-btn"
                        to="/Dashboard"
                        style={({ isActive }) => ({
                            color: isActive ? "red" : "black",
                        })}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        className="sd-btn"
                        to="/Orders"
                        style={({ isActive }) => ({
                            color: isActive ? "red" : "black",
                        })}
                    >
                        Orders
                    </NavLink>

                    <NavLink
                        className="sd-btn"
                        to="/Shipments"
                        style={({ isActive }) => ({
                            color: isActive ? "red" : "black",
                        })}
                    >
                        Shipments
                    </NavLink>
                </>
            )}

            {/* SUPPLIERS - ADMIN + USER */}
            <NavLink
                className="sd-btn"
                to="/Suppliers"
                style={({ isActive }) => ({
                    color: isActive ? "red" : "black",
                })}
            >
                Suppliers
            </NavLink>

            {/* ADMIN ONLY */}
            {role === "ADMIN" && (
                <NavLink
                    className="sd-btn"
                    to="/Users"
                    style={({ isActive }) => ({
                        color: isActive ? "red" : "black",
                    })}
                >
                    Users
                </NavLink>
            )}

        </aside>
    );
}

export default Sidebar;