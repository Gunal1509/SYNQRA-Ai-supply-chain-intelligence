import { orders,dashboard } from "../Utils/Mockdata.js";
import express from "express";
import cors from "cors"


const app = express();
app.use(cors());


app.use(express.json());

app.get("/orders",(req,res)=>{
    const data=orders;
    return res.json(data);
});
app.post("/orders",(req,res)=>{
    const data=req.body;
    data.id = Math.max(...orders.map(item => item.id), 0) + 1;;
    orders.push(data);
    return res.json(orders)
});
app.put("/orders",(req,res)=>{
    const data=req.body;
   const dat=orders.find((item)=>item.order==data.order);
   if(dat.supplier!==data.supplier)
   {
       dat.supplier=data.supplier;
   }
   else if(dat.status!==data.status)
   {
    dat.status=data.status;
   }
   else{
    console.log('nothing to update');
    return null;
   }
   console.log("update sucessfull");
   return res.json(orders);

});
app.delete("/orders",async(req,res)=>{
  const data=req.body;
  const d=orders.filter((item)=>{
    return item.order!=data.order;
  });
  return res.json(d);
  if(!d)
  {
    console.log("no item to delete");
  }
});
app.get("/dashboard",(req,res)=>{
  const data=dashboard;
  return res.json(data);
})
app.listen(5000,()=>{
    console.log("running sucessfully");
});