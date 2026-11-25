
import axiosInstance from "./AxiosInstance";

// ORDERS

export const loadorder = async () => {
    try {
        const response = await axiosInstance.get("/api/gunal");
        console.log("Orders loaded");
        return response.data;
    } catch (error) {
        console.error("Load orders failed:", error);
        return [];
    }
};

export const submit = async (orderform) => {
    try {
        const response = await axiosInstance.post(
            `/api/gunal?supplierId=${orderform.supplierId}`,
            {
                id: Number(orderform.id),
                order: orderform.order,
                status: orderform.status
            }
        );

        return response.data;
    } catch (error) {
        console.error("Create order failed:", error);
        return null;
    }
};

export const remove = async (id) => {
    try {
        await axiosInstance.delete(`/api/gunal/${id}`);
        return true;
    } catch (error) {
        console.error("Delete order failed:", error);
        return false;
    }
};

export const updates = async (order) => {
    try {
        const response = await axiosInstance.put(
            `/api/gunal/${order.id}`,
            {
                order: order.order,
                supplierId: order.supplierId
            }
        );

        return response.data;
    } catch (error) {
        console.error("Update order failed:", error);
        return null;
    }
};

// SUPPLIERS

const SUPPLIER_API = "/api/suppliers";

export const getSuppliers = async () => {
    const response = await axiosInstance.get(SUPPLIER_API);
    return response.data;
};

export const getSupplierById = async (id) => {
    const response = await axiosInstance.get(`${SUPPLIER_API}/${id}`);
    return response.data;
};

export const createSupplier = async (supplier) => {
    const response = await axiosInstance.post(SUPPLIER_API, supplier);
    return response.data;
};

export const updateSupplier = async (id, supplier) => {
    const response = await axiosInstance.put(
        `${SUPPLIER_API}/${id}`,
        supplier
    );
    return response.data;
};

export const deleteSupplier = async (id) => {
    const response = await axiosInstance.delete(
        `${SUPPLIER_API}/${id}`
    );
    return response.data;
};

// SHIPMENTS

const SHIPMENT_API = "/api/shipments";

export const getShipments = async () => {
    const response = await axiosInstance.get(SHIPMENT_API);
    return response.data;
};

export const createShipment = async (shipment) => {
    const response = await axiosInstance.post(
        SHIPMENT_API,
        shipment
    );
    return response.data;
};

export const updateShipment = async (id, shipment) => {
    const response = await axiosInstance.put(
        `${SHIPMENT_API}/${id}`,
        shipment
    );
    return response.data;
};

export const deleteShipment = async (id) => {
    const response = await axiosInstance.delete(
        `${SHIPMENT_API}/${id}`
    );
    return response.data;
};

// ADMIN USERS

const ADMIN_USERS_URL = "/api/admin/users";

export const getUsers = async () => {
    const response = await axiosInstance.get(ADMIN_USERS_URL);
    return response.data;
};

export const updateUserStatus = async (id, active) => {
    const response = await axiosInstance.put(
        `${ADMIN_USERS_URL}/${id}/status?active=${active}`,
        {}
    );
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(
        `${ADMIN_USERS_URL}/${id}`
    );
    return response.data;
};

// PAGINATION

export const getSuppliersPaged = async (params) => {
    const response = await axiosInstance.get(
        "/api/suppliers/page",
        { params }
    );

    return response.data;
};

export const getOrdersPaged = async (params) => {
    const response = await axiosInstance.get(
        "/api/gunal/page",
        { params }
    );

    return response.data;
};

// NOTIFICATIONS

export const getMyNotifications = async (userId) => {
    const response = await axiosInstance.get(
        `/api/notifications/user/${userId}`
    );

    return response.data;
};

export const markNotificationRead = async (id) => {
    const response = await axiosInstance.put(
        `/api/notifications/${id}/read`
    );

    return response.data;
};
