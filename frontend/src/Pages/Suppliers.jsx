import React, { useEffect, useState } from "react";

import {
    getSuppliers,
    createSupplier,
    updateSupplier
} from "../Services/service";

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState([]);

    const [editId, setEditId] = useState(null);

    const [supplierForm, setSupplierForm] = useState({
        name: "",
        contact: "",
        location: "",
        reliabilityScore: "",
        status: ""
    });


    // LOAD SUPPLIERS
    const loadSuppliers = async () => {

        try {

            const data = await getSuppliers();

            setSuppliers(data);

        } catch (error) {

            console.error(
                "Error loading suppliers:",
                error
            );

        }

    };


    useEffect(() => {

        loadSuppliers();

    }, []);


    // HANDLE FORM CHANGE
    const handleChange = (event) => {

        const { name, value } = event.target;

        setSupplierForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // ADD SUPPLIER
    const handleAdd = async (event) => {

        event.preventDefault();

        try {

            const newSupplier = {

                name: supplierForm.name,

                contact: supplierForm.contact,

                location: supplierForm.location,

                reliabilityScore:
                    supplierForm.reliabilityScore === ""
                        ? null
                        : Number(
                            supplierForm.reliabilityScore
                        ),

                status: supplierForm.status

            };


            const response =
                await createSupplier(newSupplier);


            if (response) {

                setSuppliers((prev) => [
                    ...prev,
                    response
                ]);


                setSupplierForm({

                    name: "",

                    contact: "",

                    location: "",

                    reliabilityScore: "",

                    status: ""

                });


                console.log(
                    "Supplier added successfully"
                );

            }

        } catch (error) {

            console.error(
                "Error adding supplier:",
                error
            );

        }

    };


    // EDIT SUPPLIER
    const handleEdit = (supplier) => {

        setEditId(supplier.id);

        setSupplierForm({

            name: supplier.name || "",

            contact: supplier.contact || "",

            location: supplier.location || "",

            reliabilityScore:
                supplier.reliabilityScore ?? "",

            status: supplier.status || ""

        });

    };


    // UPDATE SUPPLIER
    const handleUpdate = async (event) => {

        event.preventDefault();

        try {

            const updatedSupplier = {

                ...supplierForm,

                reliabilityScore:
                    supplierForm.reliabilityScore === ""
                        ? null
                        : Number(
                            supplierForm.reliabilityScore
                        )

            };


            const response = await updateSupplier(
                editId,
                updatedSupplier
            );


            if (response) {

                setSuppliers((prev) =>
                    prev.map((supplier) =>
                        supplier.id === editId
                            ? response
                            : supplier
                    )
                );


                setEditId(null);


                setSupplierForm({

                    name: "",

                    contact: "",

                    location: "",

                    reliabilityScore: "",

                    status: ""

                });


                console.log(
                    "Supplier updated successfully"
                );

            }

        } catch (error) {

            console.error(
                "Error updating supplier:",
                error
            );

        }

    };


    // CANCEL EDIT
    const handleCancel = () => {

        setEditId(null);

        setSupplierForm({

            name: "",

            contact: "",

            location: "",

            reliabilityScore: "",

            status: ""

        });

    };


    return (

        <div>

            <h1>Suppliers</h1>


            {/* ADD SUPPLIER FORM */}

            {editId === null && (

                <div className="supplier-add-form">

                    <h2>Add Supplier</h2>

                    <form onSubmit={handleAdd}>

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Supplier Name"
                            value={supplierForm.name}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Contact
                        </label>

                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact Number"
                            value={supplierForm.contact}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={supplierForm.location}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Reliability Score
                        </label>

                        <input
                            type="number"
                            name="reliabilityScore"
                            placeholder="Reliability Score"
                            value={
                                supplierForm.reliabilityScore
                            }
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.1"
                            required
                        />


                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={supplierForm.status}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>


                        <button type="submit">
                            Add Supplier
                        </button>

                    </form>

                </div>

            )}


            {/* SUPPLIER LIST */}

            <div className="kpi-container">

                {suppliers.map((supplier) => (

                    <div
                        className="kpidata-container"
                        key={supplier.id}
                    >

                        <p>
                            ID: {supplier.id}
                        </p>

                        <p>
                            Name: {supplier.name}
                        </p>

                        <p>
                            Contact: {supplier.contact}
                        </p>

                        <p>
                            Location: {supplier.location}
                        </p>

                        <p>
                            Reliability Score:{" "}
                            {supplier.reliabilityScore}
                        </p>

                        <p>
                            Status: {supplier.status}
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                handleEdit(supplier)
                            }
                        >
                            Edit
                        </button>

                    </div>

                ))}

            </div>


            {/* EDIT SUPPLIER FORM */}

            {editId !== null && (

                <div className="supplier-edit-form">

                    <h2>
                        Edit Supplier
                    </h2>


                    <form onSubmit={handleUpdate}>


                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={supplierForm.name}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Contact
                        </label>

                        <input
                            type="text"
                            name="contact"
                            value={supplierForm.contact}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={supplierForm.location}
                            onChange={handleChange}
                            required
                        />


                        <label>
                            Reliability Score
                        </label>

                        <input
                            type="number"
                            name="reliabilityScore"
                            value={
                                supplierForm.reliabilityScore
                            }
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.1"
                            required
                        />


                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={supplierForm.status}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>


                        <button type="submit">
                            Update Supplier
                        </button>


                        <button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            )}

        </div>

    );

};

export default Suppliers;