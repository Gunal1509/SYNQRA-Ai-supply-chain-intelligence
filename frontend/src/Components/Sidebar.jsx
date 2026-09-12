import { useNavigate,NavLink  } from "react-router-dom";

function Sidebtn() {
  const navigate = useNavigate();

  return (
    <>
    <aside className="sidebar">
   <NavLink className="sd-btn"
  to="/orders"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Orders
</NavLink>

<><NavLink className="sd-btn"
  to="/AiAssisstant"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  AiAssisstnt
</NavLink></>

<NavLink className="sd-btn"
  to="/Shipments"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Shipments
</NavLink>

<NavLink className="sd-btn"
  to="/Suppliers"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Suppliers
</NavLink>

<NavLink className="sd-btn"
  to="/Dashboard"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Dashboard
</NavLink>
</aside>

    </>
  );
}

export default Sidebtn;