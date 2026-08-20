function ChatHeader() {

    return (
        <header style={styles.header}>

            <div>

                <h2 style={styles.title}>
                    AI Company Brain
                </h2>

                <div style={styles.status}>
                    <span style={styles.dot}></span>
                    AI Assistant
                </div>

            </div>

            <div style={styles.right}>

                <span style={styles.badge}>
                    RAG Enabled
                </span>

                <span style={styles.icon}>
                    ⋮
                </span>

            </div>

        </header>
    );
}

const styles = {

    header: {
        height: "68px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        boxSizing: "border-box"
    },

    title: {
        margin: 0,
        fontSize: "17px",
        color: "#111827"
    },

    status: {
        marginTop: "4px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#64748b",
        fontSize: "11px"
    },

    dot: {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "#22c55e"
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: "15px"
    },

    badge: {
        background: "#eff6ff",
        color: "#2563eb",
        padding: "6px 10px",
        borderRadius: "7px",
        fontSize: "11px",
        fontWeight: "600"
    },

    icon: {
        fontSize: "22px",
        color: "#64748b",
        cursor: "pointer"
    }

};

export default ChatHeader;