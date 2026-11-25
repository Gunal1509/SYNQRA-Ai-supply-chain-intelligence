
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        const logoutMessage =
            localStorage.getItem("logoutMessage");

        if (logoutMessage) {
            setMessage(logoutMessage);
            localStorage.removeItem("logoutMessage");
        }
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/auth/login",
                form
            );

            console.log("LOGIN RESPONSE:", response.data);

            const token = response.data.token;
            const userId = response.data.userId;
            const role = response.data.role;

            if (!userId) {
                setMessage("User ID missing from login response.");
                return;
            }

            // Decode JWT
            const decoded = jwtDecode(token);

            console.log("JWT:", decoded);
            console.log("Email:", decoded.sub);
            console.log("Role:", decoded.role);

            // Check token expiration
            if (decoded.exp * 1000 < Date.now()) {
                setMessage(
                    "Login session has expired. Please try again."
                );
                return;
            }
            console.log("LOGIN RESPONSE:", response.data);

            // Store login details
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", userId);

            console.log(
                "SAVED USER ID:",
                localStorage.getItem("userId")
            );

            // Navigate to dashboard
            navigate("/Dashboard");

        } catch (error) {

            console.error("Login failed:", error);

            if (error.response) {
                setMessage(
                    error.response.data?.message ||
                    "Invalid email or password."
                );
            } else {
                setMessage("Unable to connect to server.");
            }
        }
    };

    return (
        <div>

            <h1>Login</h1>

            {message && (
                <p style={{ color: "red" }}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                Signup user
            </button>

        </div>
    );
}

export default Login;
