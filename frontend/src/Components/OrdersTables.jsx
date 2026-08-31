import { useState,useEffect } from "react";
import"../styles/Dashboardlayout.css"

const OrdersTable=()=>{
     const [orders, setOrders] = useState([]);
     const[orderform,setorder]=useState({
       order:"",
           supplier:"",
           status:""
     });
     let patchid;
      useEffect(()=>{
        const loadorder=async()=>{
          try{
          const data=await fetch("http://localhost:5000/orders");
          const response=await data.json();
          setOrders(response);
          console.log("accepting");
          }
          catch{
            console.log("error");
          }
        };
        loadorder();
      },[]);
     const handlesubmit=async (event)=>{
             event.preventDefault();
             const data=await fetch("http://localhost:5000/orders", {
                             method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                                       },
                                body: JSON.stringify(orderform)
                                  });
              const res=await data.json()

             setOrders(res);
      }
      const handledelete=(event)=>{
               event.preventDefault()
               const newar=orders.filter((item,index)=>index!==orders.length-1)
               setOrders(newar);
      }
      const handleupdate=async()=>{
        const updateorder={
            id:2,
            order:"milkybar",
            supplier:"dairy",
            status:"delivery"
            
        }
        try{
          const data=await fetch(`http://localhost:5000/orders/${updateorder.id}`, {
                             method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                                       },
                                       body:JSON.stringify(updateorder)
                                  });
               const res= await data.json();
               setOrders(res);                   
        }
        catch{
          console.log(error);
        }
      }
     return(<>
  <h1>OrdersTable</h1>
  <div class="table-container">
  <table class="tables">
  <thead>
    <tr>
      <th>Id</th>
      <th>Order</th>
      <th>Supplier</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
     {orders.map((i,index)=>(
      <tr key={index}>
      <td>{index+1}</td>
      <td>{i.order}</td>
      <td>{i.supplier}</td>
      <td>{i.status=="delivery"?"delivered":"pending"}
      {i.status==="pending" && <p>Your Order is Pending</p>}
      </td>

    </tr> 
     ))}
  </tbody>
</table>
</div>
<div class="form-container">
    <form onSubmit={handlesubmit}> 
      <input name="order" type='text'placeholder="ordername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
       <input name="supplier" type='text'placeholder="suppliername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <input name="status" type='text'placeholder="status" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <button type="submit">Add Order</button>
    </form>
    <button onClick={handledelete}style={{color:"blue"}}>delete</button>
    <button onClick={handleupdate}>update</button>
    </div>
     </>)
}
export default OrdersTable;