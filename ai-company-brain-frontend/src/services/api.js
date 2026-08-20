export const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "";

const getToken = () => {
    return localStorage.getItem("token");
};

// =========================
// AUTH
// =========================

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const text = await response.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
        data = { message: text };
    }

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role: "USER" })
    });

    const text = await response.text();
    let data = {};
    try {
        data = JSON.parse(text);
    } catch {
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