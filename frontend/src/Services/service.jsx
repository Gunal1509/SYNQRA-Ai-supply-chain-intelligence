import axios from "axios";
import axiosInstance from "./AxiosInstance";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

// Automatically attach JWT to every request
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const loadorder = async () => {

    try {

        const response = await API.get("/api/gunal");

        console.log("Orders loaded");

        return response.data;

    } catch (error) {

        console.error(
            "Load orders failed:",
            error.response?.status,
            error.response?.data
        );

        return [];
    }
};


export const submit = async (orderform) => {

    try {

        const response = await API.post(
            `/api/gunal?supplierId=${orderform.supplierId}`,
            {
                id: Number(orderform.id),
                order: orderform.order,
                status: orderform.status
            }
        );

        console.log("Order created:", response.data);

        return response.data;

    } catch (error) {

        console.error(
            "Create order failed:",
            error.response?.status,
            error.response?.data
        );

        return null;
    }
};


export const remove = async (id) => {

    try {

        await API.delete(`/api/gunal/${id}`);

        return true;

    } catch (error) {

        if (error.response?.status === 409) {

            alert(
                "Cannot delete this order because it is currently in shipment."
            );

            return false;
        }

        console.error(
            "Delete failed:",
            error.response?.status,
            error.response?.data
        );

        alert("Failed to delete order.");

        return false;
    }
};


export const updates = async (order) => {

    try {

        const response = await API.put(
            `/api/orders/${order.id}`,
            {
                order: order.order,
                supplierId: order.supplierId
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Update order failed:",
            error.response?.status,
            error.response?.data
        );

        return null;
    }
};


const SUPPLIER_API = "/api/suppliers";


export const getSuppliers = async () => {

    const response = await API.get(SUPPLIER_API);

    return response.data;
};


export const getSupplierById = async (id) => {

    const response = await API.get(
        `${SUPPLIER_API}/${id}`
    );

    return response.data;
};


export const createSupplier = async (supplier) => {

    const response = await API.post(
        SUPPLIER_API,
        supplier
    );

    return response.data;
};


export const updateSupplier = async (id, supplier) => {

    const response = await API.put(
        `${SUPPLIER_API}/${id}`,
        supplier
    );

    return response.data;
};


export const deleteSupplier = async (id) => {

    const response = await API.delete(
        `${SUPPLIER_API}/${id}`
    );

    return response.data;
};


const SHIPMENT_API = "/api/shipments";


export const getShipments = async () => {

    const response = await API.get(SHIPMENT_API);

    return response.data;
};


export const createShipment = async (shipment) => {

    const response = await API.post(
        SHIPMENT_API,
        shipment
    );

    return response.data;
};


export const updateShipment = async (id, shipment) => {

    const response = await API.put(
        `${SHIPMENT_API}/${id}`,
        shipment
    );

    return response.data;
};


export const deleteShipment = async (id) => {

    const response = await API.delete(
        `${SHIPMENT_API}/${id}`
    );

    return response.data;
};
const ADMIN_USERS_URL =
    "http://localhost:8080/api/admin/users";
export const getUsers = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        ADMIN_USERS_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const updateUserStatus = async (
    id,
    active
) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${ADMIN_USERS_URL}/${id}/status?active=${active}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const deleteUser = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${ADMIN_USERS_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const getSuppliersPaged = async (params) => {
    const response = await axiosInstance.get("/api/suppliers/page", {
        params
    });

    return response.data;
};
export const getOrdersPaged = async (params) => {
    const response = await axiosInstance.get("/api/gunal/page", {
        params
    });

    return response.data;
};