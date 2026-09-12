import React,{ useState,useEffect,useRef} from "react";
import"../styles/Dashboardlayout.css"
import {loadorder,updates,submit,remove} from "../Services/service";

const OrdersTable=()=>{
     const [orders, setOrders] = useState([]);
     const[orderform,setorder]=useState({
       order:"",
           supplier:"",
           status:""
     });
     const update = useRef({
  id:0,
  order: "",
  supplier: "",
  status: ""
});
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
 const filteredOrders = orders.filter((item) => {
  const searchMatch =
    item.order.toLowerCase().includes(search.toLowerCase()) ||
    item.supplier.toLowerCase().includes(search.toLowerCase());

  const statusMatch =
    statusFilter === "All" || item.status === statusFilter;

  return searchMatch && statusMatch;
});
      useEffect(()=>{
        const load = async () => {
    const res = await loadorder();
    setOrders(res);
  };
  load();
      },[]);
     const handlesubmit=async (event)=>{
             event.preventDefault();
             const res=await submit(orderform);
              if (res) {
    setOrders((prevOrders) => [...prevOrders, res]);
  }
      }
      const [isup,setup]=useState(false);
     
  
             const handleDelete=async(i)=>{
              update.current = {
    id:i.id,            
    order: i.order,
    supplier: i.supplier,
    status: i.status
  };
  try{
      const del=await remove(update.current);
      setOrders(del);
      console.log("deleted")
  }
  catch{
    console.log("errorin delete");
  }

   }

          
          const handleupdate=async(event)=>{
            event.preventDefault();

               const upd=await updates(update.current);
               if(upd==null)
               {
                    console.log("no udpdate");
               }
               else{
                setup(true);
                console.log("updated");
                setOrders(upd);
                
               }
             }   
       const [editId, setEditId] = useState(null);
       const  handleedit=(i)=>{
        update.current = {
     id:i.id,     
    order: i.order,
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
      <th>Supplier</th>
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
        <td>{i.supplier}</td>
        <td>
          {i.status === "delivery" ? "Delivered" : "Pending"}
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

              <input
                name="supplier"
                defaultValue={i.supplier}
                  onChange={(event) => {
            update.current = {
              ...update.current,
              [event.target.name]: event.target.value
            };
          }}
              />

              <input
                name="status"
                defaultValue={i.status}
                onChange={(event) => {
            update.current = {
              ...update.current,
              [event.target.name]: event.target.value
            };
          }}
              />

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
       <input name="supplier" type='text'placeholder="suppliername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <input name="status" type='text'placeholder="status" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <button type="submit">Add Order</button>
    </form>

    </div>
      <div>  {isup && <h3>updated sucessfully!</h3>}</div>
   
     </>)
}
export default OrdersTable;