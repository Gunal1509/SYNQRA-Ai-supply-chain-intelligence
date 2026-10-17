import { useEffect, useState } from "react";

import {
    getUsers,
    updateUserStatus,
    deleteUser
} from "../Services/service";

import "../styles/UserManagement.css";

function UserManagement() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getUsers();

            setUsers(data);

        } catch (error) {

            console.error(
                "Error loading users:",
                error
            );

            if (error.response?.status === 403) {

                setError(
                    "You do not have administrator permission."
                );

            } else {

                setError(
                    "Failed to load users."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        loadUsers();

    }, []);

    const handleStatusChange = async (
        id,
        currentStatus
    ) => {

        try {

            await updateUserStatus(
                id,
                !currentStatus
            );

            setUsers(
                users.map(user =>
                    user.id === id
                        ? {
                            ...user,
                            active: !currentStatus
                        }
                        : user
                )
            );

        } catch (error) {

            console.error(
                "Status update failed:",
                error
            );

            alert(
                "Failed to update user status."
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteUser(id);

            setUsers(
                users.filter(
                    user => user.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );

            alert(
                "Failed to delete user."
            );
        }
    };

    if (loading) {

        return (
            <div className="users-page">

                <h1>User Management</h1>

                <p>Loading users...</p>

            </div>
        );
    }

    return (

        <div className="users-page">

            <div className="users-header">

                <div>
                    <h1>User Management</h1>

                    <p>
                        Manage registered SYNQRA users
                    </p>
                </div>

                <div className="user-count">

                    <span>
                        Total Users
                    </span>

                    <strong>
                        {users.length}
                    </strong>

                </div>

            </div>


            {error && (

                <div className="users-error">
                    {error}
                </div>

            )}


            {!error && (

                <div className="users-table-container">

                    <table className="users-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>User</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Last Login</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty-users"
                                    >
                                        No users found
                                    </td>

                                </tr>

                            ) : (

                                users.map(user => (

                                    <tr key={user.id}>

                                        <td>
                                            {user.id}
                                        </td>


                                        <td>

                                            <div className="user-info">

                                                <div className="user-avatar">

                                                    {user.username
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ||
                                                        "U"}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {user.username}
                                                    </strong>

                                                </div>

                                            </div>

                                        </td>


                                        <td>
                                            {user.email}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    user.role === "ADMIN"
                                                        ? "role admin"
                                                        : "role user"
                                                }
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        <td>

                                            {user.lastLogin
                                                ? new Date(
                                                    user.lastLogin
                                                ).toLocaleString()
                                                : "Never"}

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    user.active
                                                        ? "status active"
                                                        : "status inactive"
                                                }
                                            >

                                                {user.active
                                                    ? "Active"
                                                    : "Inactive"}

                                            </span>

                                        </td>


                                        <td>

                                            <div className="user-actions">

                                                <button
                                                    className="status-button"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            user.id,
                                                            user.active
                                                        )
                                                    }
                                                >

                                                    {user.active
                                                        ? "Deactivate"
                                                        : "Activate"}

                                                </button>


                                                {user.role !== "ADMIN" && (

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default UserManagement;