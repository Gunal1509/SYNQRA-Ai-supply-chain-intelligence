
import axios from "axios";
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
export const submit = async (orderform) => {
    try {
        const data = await fetch(
            `http://localhost:8080/api/gunal?supplierId=${orderform.supplierId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: Number(orderform.id),
                    order: orderform.order,
                    status: orderform.status
                })
            }
        );

        const text = await data.text();

        console.log("Status:", data.status);
        console.log("Backend response:", text);

        if (!data.ok) {
            throw new Error(text || "Failed to create order");
        }

        return JSON.parse(text);

    } catch (error) {
        console.error("Error submitting order:", error);
    }
};
export const remove = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/gunal/${id}`,
            {
                method: "DELETE"
            }
        );

        if (response.status === 409) {
            alert("Cannot delete this order because it is currently in shipment.");
            return false;
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Delete failed:", errorText);
            alert("Failed to delete order.");
            return false;
        }

        return true;

    } catch (error) {
        console.error("Delete error:", error);
        alert("Unable to connect to server.");
        return false;
    }
};
export const updates = async (order) => {

    const response = await axios.put(
        `http://localhost:8080/api/orders/${order.id}`,
        {
            order: order.order,
            supplierId: order.supplierId
        }
    );

    return response.data;
};

const API_URL = "http://localhost:8080/api/suppliers";

export const getSuppliers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getSupplierById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createSupplier = async (supplier) => {
    const response = await axios.post(API_URL, supplier);
    return response.data;
};

export const updateSupplier = async (id, supplier) => {
    const response = await axios.put(`${API_URL}/${id}`, supplier);
    return response.data;
};

export const deleteSupplier = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const API_URLs = "http://localhost:8080/api/shipments";
export const getShipments = async () => {
    const response = await axios.get(API_URLs);
    return response.data;
};

export const createShipment = async (shipment) => {
    const response = await axios.post(API_URLs, shipment);
    return response.data;
};

export const updateShipment = async (id, shipment) => {
    const response = await axios.put(`${API_URLs}/${id}`, shipment);
    return response.data;
};

export const deleteShipment = async (id) => {
    const response = await axios.delete(`${API_URLs}/${id}`);
    return response.data;
};