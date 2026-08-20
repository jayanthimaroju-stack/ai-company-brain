import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskAI() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAsk = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            alert("Please enter a question.");
            return;
        }

        const token = localStorage.getItem("token");

        setLoading(true);
        setAnswer("");

        try {

            const response = await fetch(
                "/ai/ask",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        question: question
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setAnswer(data.answer);
            } else {
                setAnswer("Failed to get answer: " + (data.message || "Unknown error"));
            }

        } catch (error) {

            console.error(error);
            setAnswer("Cannot connect to backend.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <h1>🤖 AI Company Brain</h1>

            <h2>Ask AI</h2>

            <form onSubmit={handleAsk}>

                <textarea
                    rows="5"
                    cols="60"
                    placeholder="Ask something about the company..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <br />
                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Thinking..." : "Ask AI"}
                </button>

            </form>

            <br />

            {answer && (
                <div>
                    <h3>AI Answer:</h3>

                    <p>{answer}</p>
                </div>
            )}

            <br />

            <button onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

        </div>
    );
}

export default AskAI;