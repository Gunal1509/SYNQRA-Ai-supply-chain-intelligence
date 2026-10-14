import React,{ useState,useEffect,useRef} from "react";
import"../styles/Dashboardlayout.css"
import {loadorder,updates,submit,remove,getSuppliers } from "../Services/service";

const OrdersTable=()=>{
     const [orders, setOrders] = useState([]);
     const [orderform, setorder] = useState({
  id: "",
  order: "",
  supplierId: "",
  status: ""
});
     const update = useRef({
  id:0,
  order: "",
  supplierId:"",
  supplier: "",
  status: ""
});
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [suppliers, setSuppliers] = useState([]);
 const filteredOrders = orders.filter((item) => {

    const searchText = search.toLowerCase();

    const searchMatch =
        (item.order || "").toLowerCase().includes(searchText) ||
        (item.supplier?.name || "").toLowerCase().includes(searchText);

    const statusMatch =
        statusFilter === "All" ||
        item.status === statusFilter;

    return searchMatch && statusMatch;
});
useEffect(() => {
  const loadSuppliers = async () => {
    const data = await getSuppliers();

    if (data) {
      setSuppliers(data);
    }
  };

  loadSuppliers();
}, []);
const load = async () => {
    const res = await loadorder();
  if (res) {
        setOrders(res);
    }
  };
      useEffect(()=>{
  load();
      },[]);
    const handlesubmit = async (event) => {
    event.preventDefault();

    const newOrder = {
        ...orderform,
        status: "INCOMPLETE"
    };

    const res = await submit(newOrder);

    if (res) {
        setOrders((prevOrders) => [...prevOrders, res]);
    }
};
      const [isup,setup]=useState(false);
     
  
             const handleDelete = async (i) => {

    const result = await remove(i.id);

    if (result) {
        await load();
    }
};

          
          const handleupdate = async (event) => {
    event.preventDefault();

    try {
        const upd = await updates(update.current);

        if (upd == null) {
            console.log("No update");
            return;
        }

        setup(true);
        console.log("Updated successfully");

        await load();

    } catch (error) {
        console.error("Error updating order:", error);
    }
};
       const [editId, setEditId] = useState(null);
       const  handleedit=(i)=>{
        update.current = {
     id:i.id,     
    order: i.order,
    supplierId:i.supplier?.name,
    supplier: i.supplier,
    status: i.status
  };
  setEditId(i.id);
       }

     return(<>
  <h1>OrdersTable</h1>
  <div className="input-search">
  <input
  type="text"
  placeholder="Search order or supplier"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
/>
<select
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value)}
>
  <option value="All">All</option>
  <option value="pending">Pending</option>
  <option value="delivery">Delivery</option>
</select>
</div>
  <div className="table-container">
  <table className="tables">
  <thead>
    <tr>
      <th>Id</th>
      <th>Order</th>
      <th>Supplier_id</th>
      <th>Supplier_name</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {filteredOrders.length === 0 ? (
  <tr>
    <td colSpan="5">No orders found</td>
  </tr>
):(
  filteredOrders.map((i, index) => (
    <React.Fragment key={i.id}>
      <tr>
        <td>{i.id}</td>
        <td>{i.order}</td>
         <td>{i.supplier?.id || "No Supplier"}</td>

      <td>{i.supplier?.name || "No Supplier"}</td>
        <td>
  {i.status === "delivered" || i.status === "DELIVERED"
    ? "Delivered"
    : i.status === "in_transit" || i.status === "IN_TRANSIT"
    ? "In Transit"
    : i.status === "delayed" || i.status === "DELAYED"
    ? "Delayed"
    : i.status === "cancelled" || i.status === "CANCELLED"
    ? "Cancelled"
    : "Pending"}
</td>
        <td>
          <button onClick={() => handleedit(i)}>
            Edit
          </button>

          <button onClick={() => handleDelete(i)}>
            Delete
          </button>
        </td>
      </tr>
      {editId === i.id && (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleupdate}>

               <input
                name="id"
                defaultValue={i.id}
                  onChange={(event) => {
            update.current = {
              ...update.current,
              [event.target.name]: event.target.value
            };
          }}/>
              
              
              <input
                name="order"
                defaultValue={i.order}
                  onChange={(event) => {
            update.current = {
              ...update.current,
              [event.target.name]: event.target.value
            };
          }}
              />

              <select
  name="supplierId"
  value={orderform.supplierId}
  onChange={(event) =>
    setorder({
      ...orderform,
      supplierId: event.target.value
    })
  }
>
  <option value="">Select Supplier</option>

  {suppliers.map((supplier) => (
    <option
      key={supplier.id}
      value={supplier.id}
    >
      {supplier.name}
    </option>
  ))}
</select>

              <button type="submit">
                Update
              </button>

              <button
                type="button"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            </form>
          </td>
        </tr>
      )}

    </React.Fragment>
  )))}
</tbody>
</table>
</div>
<div className="form-container">
    <form onSubmit={handlesubmit}> 
      <input name="id" type='number'placeholder="order_id" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
      <input name="order" type='text'placeholder="ordername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
      <select
  name="supplierId"
  value={orderform.supplierId}
  onChange={(event) =>
    setorder({
      ...orderform,
      supplierId: event.target.value
    })
  }
>
  <option value="">Select Supplier</option>

  {suppliers.filter((supplier) => supplier.status === "Active").map((supplier) => (
    <option
      key={supplier.id}
      value={supplier.id}
    >
      {supplier.name}
    </option>
  ))}
</select>
        <button type="submit">Add Order</button>
    </form>

    </div>
      <div>  {isup && <h3>updated sucessfully!</h3>}</div>
   
     </>)
}
export default OrdersTable;