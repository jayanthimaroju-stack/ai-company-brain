import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

import { askAI, uploadDocument } from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [conversations, setConversations] = useState([]);


    // =========================
    // NEW CHAT
    // =========================

    const handleNewChat = () => {

        setMessages([]);
        setQuestion("");

    };


    // =========================
    // ASK AI
    // =========================

    const handleAsk = async (e) => {

        e.preventDefault();

        if (!question.trim() || loading) {
            return;
        }

        const currentQuestion = question.trim();

        // Show user message

        setMessages((prev) => [
            ...prev,
            {
                type: "user",
                text: currentQuestion
            }
        ]);

        setQuestion("");
        setLoading(true);

        try {

            const answer = await askAI(currentQuestion);

            // Show AI answer

            setMessages((prev) => [
                ...prev,
                {
                    type: "ai",
                    text: answer
                }
            ]);

            // Add conversation

            setConversations((prev) => [

                {
                    id: Date.now(),
                    title: currentQuestion
                },

                ...prev

            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    type: "ai",
                    text:
                        "Sorry, I couldn't connect to the AI."
                }
            ]);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // UPLOAD DOCUMENT
    // =========================

    const handleUpload = async (file) => {

        if (!file || uploading) {
            return;
        }

        setUploading(true);

        try {

            await uploadDocument(file);

            setMessages((prev) => [

                ...prev,

                {
                    type: "ai",
                    text:
                        `📄 ${file.name} uploaded successfully.\n\n` +
                        "The document has been processed and added to the company knowledge base."
                }

            ]);

        } catch (error) {

             console.error("AI ERROR:", error);

             alert("AI ERROR: " + error.message);


            setMessages((prev) => [

                ...prev,

                {
                    type: "ai",
                    text:
                        `❌ Upload failed.\n\n${error.message}`
                }

            ]);

        } finally {

            setUploading(false);

        }

    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    // =========================
    // DOCUMENTS
    // =========================

    const handleDocuments = () => {

        alert(
            "You can upload documents using the 📎 button below."
        );

    };


    // =========================
    // HISTORY
    // =========================

    const handleHistory = () => {
        navigate("/chat-history");
    };


    // =========================
    // SELECT CONVERSATION
    // =========================

    const handleSelectConversation = (conversation) => {

        console.log(
            "Selected conversation:",
            conversation
        );

    };


    // =========================
    // UI
    // =========================

    return (

        <div style={styles.app}>

            {/* ================= SIDEBAR ================= */}

            <Sidebar

                onNewChat={handleNewChat}

                onUpload={handleDocuments}

                onHistory={handleHistory}

                onLogout={handleLogout}

            />


            {/* ================= MAIN ================= */}

            <main style={styles.main}>

                {/* HEADER */}

                <ChatHeader />


                {/* CHAT AREA */}

                <section style={styles.chatArea}>

                    {messages.length === 0 ? (

                        /* ================= WELCOME ================= */

                        <div style={styles.welcome}>

                            <div style={styles.welcomeIcon}>
                                ✦
                            </div>

                            <h1 style={styles.welcomeTitle}>
                                How can I help you?
                            </h1>

                            <p style={styles.welcomeText}>
                                Ask questions about your company,
                                employees, policies and documents.
                            </p>


                            {/* SUGGESTIONS */}

                            <div style={styles.cards}>

                                <button

                                    style={styles.card}

                                    onClick={() =>
                                        setQuestion(
                                            "Who works in Java?"
                                        )
                                    }

                                >

                                    <span style={styles.cardEmoji}>
                                        👥
                                    </span>

                                    <div>

                                        <strong>
                                            Employee information
                                        </strong>

                                        <p style={styles.cardDescription}>
                                            Find employees by department
                                        </p>

                                    </div>

                                </button>


                                <button

                                    style={styles.card}

                                    onClick={() =>
                                        setQuestion(
                                            "What information is available in the company documents?"
                                        )
                                    }

                                >

                                    <span style={styles.cardEmoji}>
                                        📄
                                    </span>

                                    <div>

                                        <strong>
                                            Search documents
                                        </strong>

                                        <p style={styles.cardDescription}>
                                            Ask about uploaded company files
                                        </p>

                                    </div>

                                </button>

                            </div>

                        </div>

                    ) : (

                        /* ================= MESSAGES ================= */

                        <div style={styles.messages}>

                            {messages.map(
                                (message, index) => (

                                    <ChatMessage

                                        key={index}

                                        type={message.type}

                                        text={message.text}

                                    />

                                )
                            )}


                            {/* AI THINKING */}

                            {loading && (

                                <div style={styles.loading}>

                                    <div style={styles.loadingIcon}>
                                        ✦
                                    </div>

                                    <span>
                                        AI is thinking...
                                    </span>

                                </div>

                            )}


                            {/* DOCUMENT UPLOADING */}

                            {uploading && (

                                <div style={styles.uploading}>

                                    📄 Processing document...

                                </div>

                            )}

                        </div>

                    )}

                </section>


                {/* ================= CHAT INPUT ================= */}

                <ChatInput

                    question={question}

                    setQuestion={setQuestion}

                    onSubmit={handleAsk}

                    onUpload={handleUpload}

                    loading={
                        loading || uploading
                    }

                />

            </main>

        </div>

    );

}


// =====================================================
// STYLES
// =====================================================

const styles = {

    app: {
        height: "100vh",
        display: "flex",
        background: "#f8fafc",
        overflow: "hidden",
        fontFamily:
            "Arial, Helvetica, sans-serif"
    },


    main: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
    },


    chatArea: {
        flex: 1,
        overflowY: "auto",
        padding: "30px"
    },


    welcome: {
        maxWidth: "850px",
        height: "100%",
        margin: "0 auto",

        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",

        textAlign: "center"
    },


    welcomeIcon: {
        width: "70px",
        height: "70px",

        borderRadius: "20px",

        background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",

        color: "white",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "34px",

        marginBottom: "20px",

        boxShadow:
            "0 10px 30px rgba(37,99,235,0.25)"
    },


    welcomeTitle: {
        margin: 0,

        color: "#111827",

        fontSize: "31px",

        fontWeight: "700"
    },


    welcomeText: {
        color: "#64748b",

        maxWidth: "550px",

        lineHeight: "1.6",

        fontSize: "15px",

        marginTop: "10px"
    },


    cards: {
        display: "flex",

        gap: "12px",

        marginTop: "25px",

        flexWrap: "wrap",

        justifyContent: "center"
    },


    card: {
        display: "flex",

        alignItems: "flex-start",

        gap: "12px",

        textAlign: "left",

        width: "270px",

        padding: "16px",

        background: "white",

        border:
            "1px solid #e2e8f0",

        borderRadius: "12px",

        cursor: "pointer",

        color: "#334155",

        fontSize: "13px"
    },


    cardEmoji: {
        fontSize: "22px"
    },


    cardDescription: {
        margin: "5px 0 0",

        color: "#94a3b8",

        fontSize: "12px"
    },


    messages: {
        maxWidth: "850px",

        margin: "0 auto",

        paddingBottom: "20px"
    },


    loading: {
        display: "flex",

        alignItems: "center",

        gap: "10px",

        color: "#64748b",

        fontSize: "13px",

        marginBottom: "20px"
    },


    loadingIcon: {
        width: "34px",
        height: "34px",

        borderRadius: "10px",

        background: "#111827",

        color: "white",

        display: "flex",

        alignItems: "center",

        justifyContent: "center"
    },


    uploading: {
        padding: "12px 15px",

        background: "#eff6ff",

        color: "#2563eb",

        borderRadius: "10px",

        marginBottom: "15px",

        fontSize: "13px"
    }

};


export default Dashboard;