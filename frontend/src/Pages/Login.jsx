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

    // Show logout/session-expired message
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

            const token = response.data.token;

            // Decode JWT
            const decoded = jwtDecode(token);

            console.log("JWT:", decoded);
            console.log("Email:", decoded.sub);
            console.log("Role:", decoded.role);

            // Check whether token is already expired
            if (decoded.exp * 1000 < Date.now()) {

                setMessage(
                    "Login session has expired. Please try again."
                );

                return;
            }

            // Save JWT
            localStorage.setItem(
                "token",
                token
            );

            // Save role
            localStorage.setItem(
                "role",
                decoded.role
            );

            // Go to dashboard
            navigate("/Dashboard");

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    "Invalid email or password."
                );

            } else {

                setMessage(
                    "Unable to connect to server."
                );
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