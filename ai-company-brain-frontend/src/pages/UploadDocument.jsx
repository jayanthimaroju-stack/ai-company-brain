import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../services/api";

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

        setLoading(true);
        setMessage("");

        try {
            const data = await uploadDocument(file);
            setMessage(data || "Document uploaded successfully!");
            setFile(null);

        } catch (error) {

            console.error(error);
            setMessage("Upload failed: " + (error.message || "Cannot connect to backend."));

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