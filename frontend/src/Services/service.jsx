
export const loadorder=async()=>{
      try{
          const data=await fetch("http://localhost:8080/api/gunal");
          const response=await data.json();
          console.log("loaded");
          return response;
          }
          catch{
            console.log("error");
          }
        };
export const  submit=async(orderform)=>{
    try{
    const data=await fetch("http://localhost:8080/api/gunal", {
                             method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                                       },
                                body: JSON.stringify(orderform)
                                  });
              const res=await data.json()
              console.log(res);
              console.log("submited")
              return res;
        }
        catch{
            console.error();
        }
}
export const remove=async(update)=>{
    try{
        const data=await fetch(`http://localhost:5000/orders`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
                                       },
                 body: JSON.stringify(update)
            
        });
        console.log("suceesfull deleted returning");
        return data.json();
    }
    catch{
        console.log("unsucessful delete");
    }
}
export const updates=async(update)=>{
     try{
        const data=await fetch(`http://localhost:5000/orders`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
                                       },
                 body: JSON.stringify(update)
            
        });
        if(data==null)
        {
            console.log("nothing to update sucess");
            return false;
        }
        const response= await data.json();
        console.log("updating");
        console.log(response);
        return response;
}
catch{
      console.log("unsuccessful update");
}
}