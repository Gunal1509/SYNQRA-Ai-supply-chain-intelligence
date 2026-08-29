import { useState } from "react";

const OrdersTable=(props)=>{
     const [orders, setOrders] = useState(props.order);
     const[orderform,setorder]=useState({
           order:"",
           supplier:"",
           status:""
     });
     const handlesubmit=(event)=>{
             event.preventDefault();
             setOrders([...orders,orderform]);
      }
      const handledelete=(event)=>{
               event.preventDefault()
               const newar=orders.filter((item,index)=>index!==orders.length-1)
               setOrders(newar);
      }
     return(<>
     <h1>OrdersTable</h1>
             <table style={{border:"10px solid black"}}>
  <thead>
    <tr>
      <th>Order</th>
      <th>Supplier</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody style={{border:"10px solid black"}}>
     {orders.map((i,index)=>(
      <tr key={index}>
      <td>{i.order}</td>
      <td>{i.supplier}</td>
      <td>{i.status=="delivery"?"delivered":"pending"}
      {i.status==="pending" && <p>Your Order is Pending</p>}
      </td>
    </tr> 
     ))}
  </tbody>
</table>
    <form onSubmit={handlesubmit}> 
      <input name="order" type='text'placeholder="ordername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
       <input name="supplier" type='text'placeholder="suppliername" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <input name="status" type='text'placeholder="status" onChange={(event)=>{setorder({...orderform,[event.target.name]:event.target.value})}}></input>
        <button type="submit">Add Order</button>
    </form>
    <span>line space</span>
    <button onClick={handledelete}style={{color:"blue"}}>delete</button>
     </>)
}
export default OrdersTable;