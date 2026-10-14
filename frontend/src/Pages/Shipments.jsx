import React, { useEffect, useState } from "react";

import {
    getShipments,
    loadorder,
    createShipment,
    updateShipment,
    deleteShipment
} from "../Services/service";

function Shipments() {

    const [shipments, setShipments] = useState([]);

    const [orders, setOrders] = useState([]);

    const [form, setForm] = useState({
        trackingNumber: "",
        carrier: "",
        status: "",
        expectedDelivery: "",
        orderId: ""
    });

    const [editId, setEditId] = useState(null);


    // LOAD SHIPMENTS
    const loadShipments = async () => {

        try {

            const data = await getShipments();

            setShipments(data);

        } catch (error) {

            console.error("Error loading shipments:", error);

        }
    };


    // LOAD ORDERS
    const loadOrders = async () => {

        try {

            const data = await loadorder();

            setOrders(data);

        } catch (error) {

            console.error("Error loading orders:", error);

        }
    };


    // LOAD DATA
    useEffect(() => {

        loadShipments();

        loadOrders();

    }, []);


    // HANDLE FORM CHANGE
    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };


    // RESET FORM
    const resetForm = () => {

        setForm({
            trackingNumber: "",
            carrier: "",
            status: "",
            expectedDelivery: "",
            orderId: ""
        });

    };


    // CREATE SHIPMENT
    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const shipment = {

                trackingNumber: form.trackingNumber,

                carrier: form.carrier,

                status: form.status,

                expectedDelivery: form.expectedDelivery,

                order: {
                    id: Number(form.orderId)
                }

            };


            await createShipment(shipment);


            resetForm();


            await loadShipments();


        } catch (error) {

            console.error("Error creating shipment:", error);

        }

    };


    // EDIT SHIPMENT
    const handleEdit = (shipment) => {

        setEditId(shipment.id);

        setForm({

            trackingNumber: shipment.trackingNumber || "",

            carrier: shipment.carrier || "",

            status: shipment.status || "",

            expectedDelivery: shipment.expectedDelivery || "",

            orderId: shipment.order?.id || ""

        });

    };


    // UPDATE SHIPMENT
    const handleUpdate = async (event) => {

        event.preventDefault();

        try {

            const shipment = {

                trackingNumber: form.trackingNumber,

                carrier: form.carrier,

                status: form.status,

                expectedDelivery: form.expectedDelivery,

                order: {
                    id: Number(form.orderId)
                }

            };


            await updateShipment(editId, shipment);


            setEditId(null);


            resetForm();


            await loadShipments();


        } catch (error) {

            console.error("Error updating shipment:", error);

        }

    };


    // DELETE SHIPMENT
    const handleDelete = async (id) => {

        try {

            await deleteShipment(id);

            await loadShipments();

        } catch (error) {

            console.error("Error deleting shipment:", error);

        }

    };


    // CANCEL EDIT
    const handleCancel = () => {

        setEditId(null);

        resetForm();

    };


    // DISPLAY STATUS
    const getStatusText = (status) => {

        switch (status?.toUpperCase()) {

            case "PENDING":
                return "Pending";

            case "IN_TRANSIT":
                return "In Transit";

            case "OUT_FOR_DELIVERY":
                return "Out for Delivery";

            case "DELIVERED":
                return "Delivered";

            case "DELAYED":
                return "Delayed";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;

        }

    };


    return (

        <div>

            <h1>Shipment Management</h1>


            {/* SHIPMENT FORM */}

            <form
                onSubmit={
                    editId === null
                        ? handleSubmit
                        : handleUpdate
                }
            >


                {/* TRACKING NUMBER */}

                <input
                    type="text"
                    name="trackingNumber"
                    placeholder="Tracking Number"
                    value={form.trackingNumber}
                    onChange={handleChange}
                />


                {/* CARRIER */}

                <input
                    type="text"
                    name="carrier"
                    placeholder="Carrier"
                    value={form.carrier}
                    onChange={handleChange}
                />


                {/* STATUS */}

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Status
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="IN_TRANSIT">
                        In Transit
                    </option>

                    <option value="OUT_FOR_DELIVERY">
                        Out for Delivery
                    </option>

                    <option value="DELIVERED">
                        Delivered
                    </option>

                    <option value="DELAYED">
                        Delayed
                    </option>

                    <option value="CANCELLED">
                        Cancelled
                    </option>

                </select>


                {/* EXPECTED DELIVERY */}

                <input
                    type="date"
                    name="expectedDelivery"
                    value={form.expectedDelivery}
                    onChange={handleChange}
                />


                {/* ORDER DROPDOWN */}

                <select
                    name="orderId"
                    value={form.orderId}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Order
                    </option>


                    {orders.map((order) => (

                        <option
                            key={order.id}
                            value={order.id}
                        >

                            {order.id} - {order.order}

                        </option>

                    ))}

                </select>


                {/* SUBMIT BUTTON */}

                <button type="submit">

                    {editId === null
                        ? "Add Shipment"
                        : "Update Shipment"}

                </button>


                {/* CANCEL BUTTON */}

                {editId !== null && (

                    <button
                        type="button"
                        onClick={handleCancel}
                    >

                        Cancel

                    </button>

                )}

            </form>


            {/* SHIPMENT TABLE */}

            <table>

                <thead>

                    <tr>

                        <th>
                            Tracking Number
                        </th>

                        <th>
                            Order ID
                        </th>

                        <th>
                            Order Name
                        </th>

                        <th>
                            Carrier
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Expected Delivery
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>


                    {shipments.length === 0 ? (

                        <tr>

                            <td colSpan="7">
                                No shipments found
                            </td>

                        </tr>

                    ) : (

                        shipments.map((shipment) => (

                            <tr key={shipment.id}>


                                {/* TRACKING */}

                                <td>
                                    {shipment.trackingNumber}
                                </td>


                                {/* ORDER ID */}

                                <td>
                                    {shipment.order?.id}
                                </td>


                                {/* ORDER NAME */}

                                <td>
                                    {shipment.order?.order}
                                </td>


                                {/* CARRIER */}

                                <td>
                                    {shipment.carrier}
                                </td>


                                {/* STATUS */}

                                <td>
                                    {getStatusText(
                                        shipment.status
                                    )}
                                </td>


                                {/* EXPECTED DELIVERY */}

                                <td>
                                    {shipment.expectedDelivery}
                                </td>


                                {/* ACTIONS */}

                                <td>

                                    <button
                                        onClick={() =>
                                            handleEdit(shipment)
                                        }
                                    >

                                        Edit

                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                shipment.id
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                </td>


                            </tr>

                        ))

                    )}


                </tbody>

            </table>

        </div>

    );

}

export default Shipments;