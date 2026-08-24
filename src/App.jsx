import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import MainApp from "./MainApp";
import VerifyEmail from "./Auth/VerifyEmail";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/home" element={<MainApp />} />

                <Route path="/verify-email" element={<VerifyEmail />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;