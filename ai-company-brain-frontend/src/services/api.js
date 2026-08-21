export const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const getToken = () => {
    return localStorage.getItem("token");
};

const checkBackendConfigured = () => {
    if (!API_URL && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        console.warn("Backend API_URL is not set. Requests are falling back to relative URLs.");
    }
};

// =========================
// AUTH
// =========================

export const loginUser = async (email, password) => {
    checkBackendConfigured();
    let response;
    try {
        response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
    } catch (err) {
        throw new Error(
            !API_URL && window.location.hostname !== "localhost"
                ? "Backend API URL is not configured. Please set VITE_API_URL in Vercel environment variables."
                : "Unable to connect to backend server. Please make sure the server is running."
        );
    }

    const text = await response.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
        if (text.includes("<!doctype html>") || text.includes("<html")) {
            throw new Error("Backend server not reached. Please configure VITE_API_URL in your deployment settings.");
        }
        data = { message: text };
    }

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const registerUser = async (name, email, password) => {
    checkBackendConfigured();
    let response;
    try {
        response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, role: "USER" })
        });
    } catch (err) {
        throw new Error(
            !API_URL && window.location.hostname !== "localhost"
                ? "Backend API URL is not configured. Please set VITE_API_URL in Vercel environment variables."
                : "Unable to connect to backend server. Please make sure the server is running."
        );
    }

    const text = await response.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
        if (text.includes("<!doctype html>") || text.includes("<html")) {
            throw new Error("Backend server not reached. Please configure VITE_API_URL in your deployment settings.");
        }
        data = { message: text };
    }

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};

export const askAI = async (question) => {

    const response = await fetch(
        `${API_URL}/ai/ask`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                question: question
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to get AI response"
        );
    }

    return data.answer;
};


// =========================
// UPLOAD DOCUMENT
// =========================

export const uploadDocument = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${API_URL}/documents/upload`,
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${getToken()}`
            },

            body: formData
        }
    );

    const data = await response.text();

    if (!response.ok) {
        throw new Error(
            data || "Upload failed"
        );
    }

    return data;
};


// =========================
// CHAT HISTORY
// =========================

export const getChatHistory = async () => {

    const response = await fetch(
        `${API_URL}/chat-history`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load chat history"
        );
    }

    return await response.json();
};