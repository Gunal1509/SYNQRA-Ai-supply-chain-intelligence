
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Global API error handling
axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;
        const requestUrl = error.config?.url || "";

        // Don't redirect when login itself fails
        const isLoginRequest = requestUrl.includes("/auth/login");

        if (status === 401 && !isLoginRequest) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");

            localStorage.setItem(
                "logoutMessage",
                "Your session has expired. Please login again."
            );

            window.location.href = "/Login";

            return Promise.reject(error);
        }

        let errorMessage;

        if (!error.response) {
            errorMessage =
                "Unable to connect to server. Please check your connection.";
        } else {
            switch (status) {
                case 400:
                    errorMessage = message || "Invalid request data.";
                    break;

                case 401:
                    errorMessage = message || "Invalid email or password.";
                    break;

                case 403:
                    errorMessage =
                        message || "You do not have permission.";
                    break;

                case 404:
                    errorMessage = message || "Requested resource not found.";
                    break;

                case 409:
                    errorMessage = message || "This operation conflicts with existing data.";
                    break;

                case 500:
                    errorMessage =
                        message || "Internal server error. Please try again later.";
                    break;

                default:
                    errorMessage = message || "Something went wrong.";
            }
        }

        // Show one centralized error message
        if (typeof window !== "undefined") {
            alert(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
