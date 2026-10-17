import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

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

            // Save JWT
            localStorage.setItem("token", token);

            // Read JWT
            const decoded = jwtDecode(token);

            console.log("JWT:", decoded);
            console.log("Role:", decoded.role);

            // Save role
            localStorage.setItem("role", decoded.role);

            navigate("/Dashboard");

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
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