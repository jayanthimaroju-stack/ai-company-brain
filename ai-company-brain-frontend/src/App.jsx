import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatHistory from "./pages/ChatHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import UploadDocument from "./pages/UploadDocument";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/ask-ai"
                    element={<AskAI />}
                />
                <Route
                    path="/chat-history"
                    element={<ChatHistory />}
                />

                <Route
                    path="/upload"
                    element={<UploadDocument />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;