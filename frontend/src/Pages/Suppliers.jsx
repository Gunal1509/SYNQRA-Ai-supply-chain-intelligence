
import React, { useEffect, useState } from "react";

import {
    createSupplier,
    updateSupplier,
    getSuppliersPaged
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

    // Pagination, search and sorting state
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

    // LOAD SUPPLIERS WITH PAGINATION
    useEffect(() => {
        let cancelled = false;

        const loadSuppliers = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getSuppliersPaged({
                    page,
                    size,
                    search,
                    status: statusFilter,
                    sortBy,
                    direction
                });

                if (cancelled) return;

                setSuppliers(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Failed to load suppliers."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadSuppliers();

        return () => {
            cancelled = true;
        };
    }, [page, size, search, statusFilter, sortBy, direction]);

    // RESET FORM
    const resetForm = () => {
        setSupplierForm({
            name: "",
            contact: "",
            location: "",
            reliabilityScore: "",
            status: ""
        });
    };

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
                ...supplierForm,
                reliabilityScore:
                    supplierForm.reliabilityScore === ""
                        ? null
                        : Number(supplierForm.reliabilityScore)
            };

            const response = await createSupplier(newSupplier);

            if (response) {
                resetForm();
                setPage(0);

                // Reload the current result set after adding
                const data = await getSuppliersPaged({
                    page: 0,
                    size,
                    search,
                    status: statusFilter,
                    sortBy,
                    direction
                });

                setSuppliers(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
            }
        } catch (err) {
            console.error("Error adding supplier:", err);
            setError("Failed to add supplier.");
        }
    };

    // EDIT SUPPLIER
    const handleEdit = (supplier) => {
        setEditId(supplier.id);

        setSupplierForm({
            name: supplier.name || "",
            contact: supplier.contact || "",
            location: supplier.location || "",
            reliabilityScore: supplier.reliabilityScore ?? "",
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
                        : Number(supplierForm.reliabilityScore)
            };

            await updateSupplier(editId, updatedSupplier);

            setEditId(null);
            resetForm();

            // Refresh the currently selected page
            const data = await getSuppliersPaged({
                page,
                size,
                search,
                status: statusFilter,
                sortBy,
                direction
            });

            setSuppliers(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error updating supplier:", err);
            setError("Failed to update supplier.");
        }
    };

    // CANCEL EDIT
    const handleCancel = () => {
        setEditId(null);
        resetForm();
    };

    return (
        <div className="suppliers-page">
            <h1>Suppliers</h1>

            {/* ADD SUPPLIER FORM */}
            {editId === null && (
                <div className="supplier-add-form">
                    <h2>Add Supplier</h2>

                    <form onSubmit={handleAdd}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Supplier Name"
                            value={supplierForm.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact Number"
                            value={supplierForm.contact}
                            onChange={handleChange}
                            required
                        />

                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={supplierForm.location}
                            onChange={handleChange}
                            required
                        />

                        <label>Reliability Score</label>
                        <input
                            type="number"
                            name="reliabilityScore"
                            placeholder="Reliability Score"
                            value={supplierForm.reliabilityScore}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.1"
                            required
                        />

                        <label>Status</label>
                        <select
                            name="status"
                            value={supplierForm.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button type="submit">Add Supplier</button>
                    </form>
                </div>
            )}

            {/* SEARCH, FILTER AND PAGINATION OPTIONS */}
            <div className="supplier-toolbar">
                <input
                    type="text"
                    placeholder="Search name or location..."
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="location">Location</option>
                        <option value="status">Status</option>
                        <option value="reliabilityScore">
                            Reliability Score
                        </option>
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

            <p>Total suppliers: {totalElements}</p>

            {error && <p className="supplier-error">{error}</p>}

            {/* SUPPLIER LIST */}
            {loading ? (
                <p>Loading suppliers...</p>
            ) : (
                <div className="kpi-container">
                    {suppliers.length > 0 ? (
                        suppliers.map((supplier) => (
                            <div
                                className="kpidata-container"
                                key={supplier.id}
                            >
                                <p>ID: {supplier.id}</p>
                                <p>Name: {supplier.name}</p>
                                <p>Contact: {supplier.contact}</p>
                                <p>Location: {supplier.location}</p>
                                <p>
                                    Reliability Score:{" "}
                                    {supplier.reliabilityScore}
                                </p>
                                <p>Status: {supplier.status}</p>

                                <button
                                    type="button"
                                    onClick={() => handleEdit(supplier)}
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No suppliers found.</p>
                    )}
                </div>
            )}

            {/* EDIT SUPPLIER FORM */}
            {editId !== null && (
                <div className="supplier-edit-form">
                    <h2>Edit Supplier</h2>

                    <form onSubmit={handleUpdate}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={supplierForm.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={supplierForm.contact}
                            onChange={handleChange}
                            required
                        />

                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={supplierForm.location}
                            onChange={handleChange}
                            required
                        />

                        <label>Reliability Score</label>
                        <input
                            type="number"
                            name="reliabilityScore"
                            value={supplierForm.reliabilityScore}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.1"
                            required
                        />

                        <label>Status</label>
                        <select
                            name="status"
                            value={supplierForm.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button type="submit">Update Supplier</button>

                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* PAGINATION CONTROLS */}
            <div className="pagination">
                <button
                    type="button"
                    disabled={loading || page === 0}
                    onClick={() => setPage((current) => current - 1)}
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
        </div>
    );
};

export default Suppliers;
