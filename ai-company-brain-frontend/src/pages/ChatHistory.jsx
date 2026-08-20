
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatHistory } from "../services/api";
import "./ChatHistory.css";

function ChatHistory() {

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const data = await getChatHistory();
            setChats(data);

        } catch (error) {

            console.error(error);
            setError(error.message || "Cannot load chat history.");

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="history-page">

            {/* TOP NAVBAR */}
            <nav className="history-navbar">

                <div
                    className="history-brand"
                    onClick={() => navigate("/dashboard")}
                >

                    <div className="history-logo">
                        ✦
                    </div>

                    <div>
                        <h1>AI Company Brain</h1>
                        <span>Knowledge Assistant</span>
                    </div>

                </div>


                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </nav>


            {/* MAIN CONTENT */}
            <main className="history-container">

                <div className="history-heading">

                    <div>
                        <h2>Chat History</h2>

                        <p>
                            View your recent conversations with AI Company Brain.
                        </p>
                    </div>

                    <div className="history-count">
                        {chats.length} conversations
                    </div>

                </div>


                {/* LOADING */}
                {loading && (

                    <div className="history-message">

                        <div className="loader"></div>

                        <p>
                            Loading chat history...
                        </p>

                    </div>

                )}


                {/* ERROR */}
                {!loading && error && (

                    <div className="history-error">

                        <div className="error-icon">
                            !
                        </div>

                        <h3>
                            Unable to load history
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={fetchChatHistory}
                        >
                            Try again
                        </button>

                    </div>

                )}


                {/* EMPTY */}
                {!loading && !error && chats.length === 0 && (

                    <div className="empty-history">

                        <div className="empty-icon">
                            💬
                        </div>

                        <h3>
                            No conversations yet
                        </h3>

                        <p>
                            Start asking questions about your company
                            documents and your conversations will appear here.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                        >
                            Start a conversation
                        </button>

                    </div>

                )}


                {/* CHAT LIST */}
                {!loading && !error && chats.length > 0 && (

                    <div className="chat-list">

                        {chats.map((chat, index) => (

                            <div
                                className="chat-card"
                                key={chat.id}
                            >

                                {/* CARD HEADER */}
                                <div className="chat-card-header">

                                    <div className="chat-number">
                                        {index + 1}
                                    </div>

                                    <div className="chat-time">

                                        {chat.createdAt
                                            ? new Date(
                                                chat.createdAt
                                            ).toLocaleString()
                                            : "Unknown time"
                                        }

                                    </div>

                                </div>


                                {/* QUESTION */}
                                <div className="chat-section">

                                    <div className="section-label question-label">
                                        <span>?</span>
                                        Question
                                    </div>

                                    <p className="question-text">
                                        {chat.question}
                                    </p>

                                </div>


                                {/* ANSWER */}
                                <div className="chat-section answer-section">

                                    <div className="section-label answer-label">
                                        <span>✦</span>
                                        AI Answer
                                    </div>

                                    <p className="answer-text">
                                        {chat.answer}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default ChatHistory;
