function ConversationList({
    conversations = [],
    activeConversation,
    onSelectConversation
}) {

    return (
        <div style={styles.container}>

            <div style={styles.heading}>
                RECENT CHATS
            </div>


            {conversations.length === 0 ? (

                <div style={styles.empty}>
                    <div style={styles.emptyIcon}>
                        💬
                    </div>

                    <div>
                        No conversations yet
                    </div>

                    <small>
                        Start a new chat
                    </small>
                </div>

            ) : (

                conversations.map(
                    (conversation, index) => (

                        <button
                            key={
                                conversation.id ||
                                index
                            }

                            onClick={() =>
                                onSelectConversation(
                                    conversation
                                )
                            }

                            style={{
                                ...styles.conversation,

                                ...(activeConversation ===
                                conversation.id
                                    ? styles.active
                                    : {})
                            }}
                        >

                            <span style={styles.chatIcon}>
                                💬
                            </span>

                            <span style={styles.text}>
                                {
                                    conversation.title ||
                                    conversation.question ||
                                    "New conversation"
                                }
                            </span>

                        </button>

                    )
                )

            )}

        </div>
    );
}


const styles = {

    container: {
        marginTop: "20px"
    },

    heading: {
        color: "#64748b",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1px",
        padding: "0 9px",
        marginBottom: "8px"
    },

    conversation: {
        width: "100%",
        border: "none",
        background: "transparent",
        color: "#cbd5e1",
        padding: "10px 9px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "9px",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "13px",
        marginBottom: "2px"
    },

    active: {
        background: "#1e293b",
        color: "white"
    },

    chatIcon: {
        fontSize: "13px",
        flexShrink: 0
    },

    text: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },

    empty: {
        padding: "18px 10px",
        color: "#64748b",
        fontSize: "12px",
        textAlign: "center",
        lineHeight: "1.8"
    },

    emptyIcon: {
        fontSize: "20px",
        marginBottom: "4px"
    }

};

export default ConversationList;