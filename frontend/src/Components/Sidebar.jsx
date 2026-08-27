import { useNavigate,NavLink  } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <>2
   <NavLink
  to="/orders"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Orders
</NavLink>

<NavLink
  to="/AiAssisstant"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  AiAssisstnt
</NavLink>

<NavLink
  to="/Shipments"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Shipments
</NavLink>

<NavLink
  to="/Suppliers"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Suppliers
</NavLink>

<NavLink
  to="/Dashboard"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Dashboard
</NavLink>

    </>
  );
}

export default Sidebar;