
import React, { useState, useEffect, useRef } from "react";
import "../styles/Dashboardlayout.css";

import {
    updates,
    submit,
    remove,
    getSuppliers,
    getOrdersPaged
} from "../Services/service";

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [orderform, setOrder] = useState({
        id: "",
        order: "",
        supplierId: "",
        status: ""
    });

    const update = useRef({
        id: "",
        order: "",
        supplierId: "",
        supplier: "",
        status: ""
    });

    const [editId, setEditId] = useState(null);
    const [editSupplierId, setEditSupplierId] = useState("");
    const [isup, setup] = useState(false);

    // Pagination and filtering state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    // LOAD SUPPLIERS
    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const data = await getSuppliers();
                if (data) {
                    setSuppliers(data);
                }
            } catch (err) {
                console.error("Error loading suppliers:", err);
            }
        };

        loadSuppliers();
    }, []);

    // LOAD PAGINATED ORDERS
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getOrdersPaged({
                    page,
                    size,
                    search,
                    status: statusFilter,
                    sortBy,
                    direction
                });

                if (cancelled) return;

                setOrders(data.content || []);
                setTotalElements(data.totalElements || 0);
                setTotalPages(data.totalPages || 0);
            } catch (err) {
                if (!cancelled) {
                    console.error("Error loading orders:", err);
                    setError(
                        err.response?.data?.message ||
                        "Failed to load orders."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [
        page,
        size,
        search,
        statusFilter,
        sortBy,
        direction,
        refreshKey
    ]);

    // RESET ORDER FORM
    const resetOrderForm = () => {
        setOrder({
            id: "",
            order: "",
            supplierId: "",
            status: ""
        });
    };

    // ADD ORDER
    const handlesubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            if (!orderform.supplierId) {
                setError("Please select a supplier.");
                return;
            }

            const newOrder = {
                ...orderform,
                supplierId: Number(orderform.supplierId),
                status: "INCOMPLETE"
            };

            const result = await submit(newOrder);

            if (result) {
                resetOrderForm();
                setPage(0);
                setRefreshKey((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Error adding order:", err);
            setError(
                err.response?.data?.message ||
                "Failed to add order."
            );
        }
    };

    // DELETE ORDER
    const handleDelete = async (order) => {
        setError("");

        try {
            const result = await remove(order.id);

            if (result !== false && result !== null) {
                setRefreshKey((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Error deleting order:", err);
            setError(
                err.response?.data?.message ||
                "Unable to delete order. It may be linked to a shipment."
            );
        }
    };

    // OPEN EDIT FORM
    const handleedit = (item) => {
        update.current = {
            id: item.id,
            order: item.order || "",
            supplierId: item.supplier?.id || "",
            supplier: item.supplier || "",
            status: item.status || ""
        };

        setEditSupplierId(String(item.supplier?.id || ""));
        setEditId(item.id);
        setup(false);
        setError("");
    };

    // UPDATE ORDER
    const handleupdate = async (event) => {
        event.preventDefault();
        setError("");

        try {
            if (!editSupplierId) {
                setError("Please select a supplier.");
                return;
            }

            const updatedOrder = {
                ...update.current,
                supplierId: Number(editSupplierId)
            };

            const result = await updates(updatedOrder);

            if (result !== null && result !== false) {
                setEditId(null);
                setEditSupplierId("");
                setup(true);
                setRefreshKey((prev) => prev + 1);

                // Hide success message after the next render cycle
                setTimeout(() => setup(false), 3000);
            }
        } catch (err) {
            console.error("Error updating order:", err);
            setError(
                err.response?.data?.message ||
                "Failed to update order."
            );
        }
    };

    const handleCancel = () => {
        setEditId(null);
        setEditSupplierId("");
        setError("");
    };

    const displayStatus = (status) => {
        switch ((status || "").toUpperCase()) {
            case "DELIVERED":
                return "Delivered";
            case "IN_TRANSIT":
                return "In Transit";
            case "DELAYED":
                return "Delayed";
            case "CANCELLED":
                return "Cancelled";
            case "INCOMPLETE":
                return "Incomplete";
            case "COMPLETE":
                return "Complete";
            default:
                return status || "Pending";
        }
    };

    return (
        <>
            <h1>Orders</h1>

            {/* SEARCH, FILTER AND SORT */}
            <div className="input-search">
                <input
                    type="text"
                    placeholder="Search order name or ID"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(0);
                    }}
                />

                <select
                    value={statusFilter}
                    onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setPage(0);
                    }}
                >
                    <option value="ALL">All statuses</option>
                    <option value="INCOMPLETE">Incomplete</option>
                    <option value="COMPLETE">Complete</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELAYED">Delayed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>

                <label>
                    Rows:
                    <select
                        value={size}
                        onChange={(event) => {
                            setSize(Number(event.target.value));
                            setPage(0);
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>

                <label>
                    Sort by:
                    <select
                        value={sortBy}
                        onChange={(event) => {
                            setSortBy(event.target.value);
                            setPage(0);
                        }}
                    >
                        <option value="id">Order ID</option>
                        <option value="order">Order Name</option>
                        <option value="status">Status</option>
                    </select>
                </label>

                <button
                    type="button"
                    onClick={() =>
                        setDirection((current) =>
                            current === "asc" ? "desc" : "asc"
                        )
                    }
                >
                    {direction === "asc" ? "Ascending ↑" : "Descending ↓"}
                </button>
            </div>

            <p>Total orders: {totalElements}</p>

            {error && (
                <p className="supplier-error" role="alert">
                    {error}
                </p>
            )}

            {isup && <p>Order updated successfully!</p>}

            {/* ORDERS TABLE */}
            <div className="table-container">
                <table className="tables">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order</th>
                            <th>Supplier ID</th>
                            <th>Supplier Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">Loading orders...</td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="6">No orders found</td>
                            </tr>
                        ) : (
                            orders.map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.order}</td>
                                        <td>
                                            {item.supplier?.id || "No Supplier"}
                                        </td>
                                        <td>
                                            {item.supplier?.name || "No Supplier"}
                                        </td>
                                        <td>{displayStatus(item.status)}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => handleedit(item)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                    {/* EDIT FORM */}
                                    {editId === item.id && (
                                        <tr>
                                            <td colSpan="6">
                                                <form onSubmit={handleupdate}>
                                                    <input
                                                        name="order"
                                                        value={update.current.order}
                                                        onChange={(event) => {
                                                            update.current = {
                                                                ...update.current,
                                                                order: event.target.value
                                                            };
                                                        }}
                                                        placeholder="Order name"
                                                        required
                                                    />

                                                    <select
                                                        value={editSupplierId}
                                                        onChange={(event) => {
                                                            setEditSupplierId(
                                                                event.target.value
                                                            );
                                                        }}
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Supplier
                                                        </option>

                                                        {suppliers
                                                            .filter(
                                                                (supplier) =>
                                                                    supplier.status === "Active" ||
                                                                    String(supplier.id) === editSupplierId
                                                            )
                                                            .map((supplier) => (
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
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="orders-pagination">
                <button
                    type="button"
                    disabled={loading || page === 0}
                    onClick={() =>
                        setPage((current) => Math.max(0, current - 1))
                    }
                >
                    Previous
                </button>

                <span>
                    Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                </span>

                <button
                    type="button"
                    disabled={
                        loading ||
                        totalPages === 0 ||
                        page >= totalPages - 1
                    }
                    onClick={() => setPage((current) => current + 1)}
                >
                    Next
                </button>
            </div>

            {/* ADD ORDER FORM */}
            <div className="form-container">
                <h2>Add Order</h2>

                <form onSubmit={handlesubmit}>
                    <input
                        name="order"
                        type="text"
                        placeholder="Order name"
                        value={orderform.order}
                        onChange={(event) =>
                            setOrder({
                                ...orderform,
                                [event.target.name]: event.target.value
                            })
                        }
                        required
                    />

                    <select
                        name="supplierId"
                        value={orderform.supplierId}
                        onChange={(event) =>
                            setOrder({
                                ...orderform,
                                supplierId: event.target.value
                            })
                        }
                        required
                    >
                        <option value="">Select Supplier</option>

                        {suppliers
                            .filter(
                                (supplier) => supplier.status === "Active"
                            )
                            .map((supplier) => (
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
        </>
    );
};

export default OrdersTable;
