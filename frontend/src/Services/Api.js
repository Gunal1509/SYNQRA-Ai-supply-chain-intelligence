import { orders } from "../Utils/Mockdata.js";
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
    orders.push(data);
    return res.json(orders)
});
app.put("/orders/:id",(req,res)=>{
    const id=Number(req.params.id);
     const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  orders[index] = req.body;
  return res.json(orders);

})
app.listen(5000,()=>{
    console.log("running sucessfully");
});