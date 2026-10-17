import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
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
                "http://localhost:8080/auth/signup",
                form
            );

            console.log("Signup successful:", response.data);

            alert("Account created successfully");

            navigate("/Login");

        } catch (error) {

            console.error(
                "Signup failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    return (
        <div>

            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

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
                    Signup
                </button>

            </form>

            <button
                type="button"
                onClick={() => navigate("/Login")}
            >
                Already have an account? Login
            </button>

        </div>
    );
}

export default Signup;