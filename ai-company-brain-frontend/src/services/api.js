const API_URL = "";

const getToken = () => {
    return localStorage.getItem("token");
};


// =========================
// ASK AI
// =========================

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