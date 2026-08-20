import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadDocument() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setMessage("");

        try {

            const response = await fetch(
                "/documents/upload",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.text();

            if (response.ok) {
                setMessage(
                    data || "Document uploaded successfully!"
                );
                setFile(null);
            } else {
                setMessage(
                    "Upload failed: " + data
                );
            }

        } catch (error) {

            console.error(error);
            setMessage("Cannot connect to backend.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <h1>📄 AI Company Brain</h1>

            <h2>Upload Document</h2>

            <form onSubmit={handleUpload}>

                <input
                    type="file"
                    accept=".pdf,.txt,.md,.json,.csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <br />
                <br />

                {file && (
                    <p>
                        Selected file: {file.name}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Uploading..."
                        : "Upload Document"}
                </button>

            </form>

            <br />

            {message && (
                <p>{message}</p>
            )}

            <br />

            <button
                onClick={() => navigate("/dashboard")}
            >
                ← Back to Dashboard
            </button>

        </div>
    );
}

export default UploadDocument;