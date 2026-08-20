function ChatMessage({ type, text }) {

    const isUser = type === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "24px",
                gap: "12px"
            }}
        >

            {!isUser && (
                <div style={styles.aiAvatar}>
                    ✦
                </div>
            )}

            <div
                style={
                    isUser
                        ? styles.userMessage
                        : styles.aiMessage
                }
            >
                {text}
            </div>

            {isUser && (
                <div style={styles.userAvatar}>
                    👤
                </div>
            )}

        </div>
    );
}

const styles = {

    aiAvatar: {
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
    },

    userAvatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#2563eb",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
    },

    userMessage: {
        maxWidth: "70%",
        background: "#2563eb",
        color: "white",
        padding: "13px 17px",
        borderRadius: "18px 18px 4px 18px",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap"
    },

    aiMessage: {
        maxWidth: "75%",
        background: "white",
        color: "#1f2937",
        padding: "13px 17px",
        borderRadius: "4px 18px 18px 18px",
        lineHeight: "1.7",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        whiteSpace: "pre-wrap"
    }
};

export default ChatMessage;