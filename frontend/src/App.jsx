import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Shipments from './Pages/Shipments';
import Suppliers from './Pages/Suppliers';
import Dashboardlayout from './Layouts/Dashboardlayout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import AiAssisstant from './Pages/AiAssisstant';
import UserManagement from "./Pages/UserManagement";

import ProtectedRoute from './Components/ProtectedRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={<Signup />}
                />

                <Route
                    path="/Login"
                    element={<Login />}
                />

                {/* PROTECTED */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        element={<Dashboardlayout />}
                    >

                        <Route
                            path="/Dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/Orders"
                            element={<Orders />}
                        />

                        <Route
                            path="/Suppliers"
                            element={<Suppliers />}
                        />

                        <Route
                            path="/Shipments"
                            element={<Shipments />}
                        />

                        <Route
                            path="/AiAssisstant"
                            element={<AiAssisstant />}
                        />
                        <Route
    path="/Users"
    element={<UserManagement />}
/>

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;