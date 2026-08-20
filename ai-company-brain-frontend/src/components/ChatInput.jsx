import { useRef } from "react";

function ChatInput({
    question,
    setQuestion,
    onSubmit,
    onUpload,
    loading
}) {

    const fileInputRef = useRef(null);

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            onSubmit(e);
        }
    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            onUpload(file);
        }

        e.target.value = "";
    };

    return (

        <div style={styles.container}>

            <form
                onSubmit={onSubmit}
                style={styles.form}
            >

                <button
                    type="button"
                    style={styles.iconButton}
                    onClick={() =>
                        fileInputRef.current.click()
                    }
                    title="Upload document"
                >
                    ＋
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.md,.json,.csv"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

                <textarea
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about your company..."
                    rows="1"
                    style={styles.textarea}
                />

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !question.trim()
                    }
                    style={
                        loading || !question.trim()
                            ? styles.disabledButton
                            : styles.sendButton
                    }
                >
                    ↑
                </button>

            </form>

            <p style={styles.disclaimer}>
                AI Company Brain may make mistakes. Verify important information.
            </p>

        </div>
    );
}

const styles = {

    container: {
        padding: "12px 25px 18px",
        background: "#f8fafc"
    },

    form: {
        maxWidth: "850px",
        margin: "0 auto",
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        background: "white",
        border: "1px solid #dbe1ea",
        borderRadius: "16px",
        padding: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
    },

    iconButton: {
        width: "40px",
        height: "40px",
        border: "none",
        background: "transparent",
        fontSize: "24px",
        color: "#64748b",
        cursor: "pointer"
    },

    textarea: {
        flex: 1,
        border: "none",
        outline: "none",
        resize: "none",
        fontSize: "15px",
        padding: "11px 5px",
        fontFamily: "Arial, sans-serif",
        maxHeight: "140px"
    },

    sendButton: {
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        border: "none",
        background: "#111827",
        color: "white",
        fontSize: "22px",
        cursor: "pointer"
    },

    disabledButton: {
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        border: "none",
        background: "#d1d5db",
        color: "white",
        fontSize: "22px"
    },

    disclaimer: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "11px",
        margin: "8px 0 0"
    }
};

export default ChatInput;

