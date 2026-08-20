function Sidebar({
    onNewChat,
    onUpload,
    onHistory,
    onLogout
}) {

    return (
        <aside style={styles.sidebar}>

            <div>

                <div style={styles.logo}>
                    <div style={styles.logoIcon}>
                        ✦
                    </div>

                    <div>
                        <div style={styles.logoTitle}>
                            AI Company Brain
                        </div>

                        <div style={styles.logoSubtitle}>
                            AI Knowledge Assistant
                        </div>
                    </div>
                </div>


                <button
                    style={styles.newChat}
                    onClick={onNewChat}
                >
                    ＋ New chat
                </button>


                <div style={styles.sectionTitle}>
                    WORKSPACE
                </div>


                <button
                    style={styles.menuItem}
                    onClick={onHistory}
                >
                    <span>◷</span>
                    Chat history
                </button>


                <button
                    style={styles.menuItem}
                    onClick={onUpload}
                >
                    <span>▣</span>
                    Documents
                </button>


                <div style={styles.sectionTitle}>
                    TOOLS
                </div>


                <button style={styles.menuItem}>
                    <span>♙</span>
                    Employees
                </button>


                <button style={styles.menuItem}>
                    <span>⚙</span>
                    Settings
                </button>

            </div>


            <div style={styles.bottom}>

                <div style={styles.userBox}>

                    <div style={styles.avatar}>
                        J
                    </div>

                    <div style={{ flex: 1 }}>

                        <div style={styles.userName}>
                            Jayanthi
                        </div>

                        <div style={styles.userRole}>
                            USER
                        </div>

                    </div>

                </div>


                <button
                    style={styles.logout}
                    onClick={onLogout}
                >
                    ↪ Logout
                </button>

            </div>

        </aside>
    );
}

const styles = {

    sidebar: {
        width: "270px",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "22px 16px",
        boxSizing: "border-box",
        flexShrink: 0
    },

    logo: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "4px 8px 25px"
    },

    logoIcon: {
        width: "38px",
        height: "38px",
        borderRadius: "11px",
        background: "#2563eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "21px"
    },

    logoTitle: {
        fontWeight: "700",
        fontSize: "17px"
    },

    logoSubtitle: {
        color: "#94a3b8",
        fontSize: "10px",
        marginTop: "2px"
    },

    newChat: {
        width: "100%",
        padding: "12px",
        borderRadius: "9px",
        border: "1px solid #334155",
        background: "#1e293b",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        textAlign: "left"
    },

    sectionTitle: {
        color: "#64748b",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1px",
        margin: "27px 9px 9px"
    },

    menuItem: {
        width: "100%",
        padding: "11px 10px",
        border: "none",
        borderRadius: "8px",
        background: "transparent",
        color: "#cbd5e1",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        textAlign: "left",
        fontSize: "14px",
        marginBottom: "3px"
    },

    bottom: {
        borderTop: "1px solid #1e293b",
        paddingTop: "15px"
    },

    userBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px"
    },

    avatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#2563eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    },

    userName: {
        fontSize: "13px",
        fontWeight: "600"
    },

    userRole: {
        fontSize: "9px",
        color: "#64748b",
        marginTop: "2px"
    },

    logout: {
        width: "100%",
        padding: "9px",
        marginTop: "8px",
        background: "transparent",
        border: "none",
        color: "#94a3b8",
        textAlign: "left",
        cursor: "pointer"
    }
};

export default Sidebar;