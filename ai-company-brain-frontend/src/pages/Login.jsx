
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const data = await loginUser(email, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            setErrorMessage(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* LEFT SIDE */}
            <div className="login-left">

                {/* Brand */}
                <div className="brand">

                    <div className="brand-logo">
                        ✦
                    </div>

                    <div>
                        <h1>AI Company Brain</h1>
                        <p>Intelligent Knowledge Assistant</p>
                    </div>

                </div>


                {/* Hero */}
                <div className="hero">

                    <h2>
                        Your company's knowledge.
                        <br />
                        <span>Powered by AI.</span>
                    </h2>

                    <p>
                        Upload company documents, ask questions,
                        and get intelligent answers instantly.
                    </p>


                    {/* Features */}
                    <div className="features">

                        <div className="feature">

                            <div className="feature-icon">
                                📄
                            </div>

                            <div>
                                <h3>Smart Documents</h3>

                                <p>
                                    Search your company knowledge effortlessly.
                                </p>
                            </div>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                🧠
                            </div>

                            <div>
                                <h3>AI Powered</h3>

                                <p>
                                    Get answers using your own company data.
                                </p>
                            </div>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                🔒
                            </div>

                            <div>
                                <h3>Secure Access</h3>

                                <p>
                                    Your company information stays protected.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="login-right">

                <div className="login-card">

                    {/* Mobile Brand */}
                    <div className="mobile-brand">

                        <div className="brand-logo">
                            ✦
                        </div>

                        <h1>AI Company Brain</h1>

                    </div>


                    <h2>Welcome back</h2>

                    <p className="subtitle">
                        Sign in to continue to your AI workspace
                    </p>

                    {errorMessage && (
                        <div style={{
                            padding: "12px",
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "8px",
                            color: "#dc2626",
                            fontSize: "14px",
                            marginBottom: "16px",
                            lineHeight: "1.4"
                        }}>
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="input-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>


                        {/* Password */}
                        <div className="input-group">

                            <div className="password-header">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                        </div>


                        {/* Remember Me */}
                        <div className="remember">

                            <label>
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>

                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                            <span>→</span>
                        </button>

                    </form>


                    {/* Divider */}
                    <div className="divider">
                        <span>OR</span>
                    </div>


                    {/* Register */}
                    <p className="register-text">

                        Don't have an account?{" "}

                        <Link to="/register">
                            Create an account
                        </Link>

                    </p>

                </div>


                <p className="copyright">
                    © 2026 AI Company Brain. All rights reserved.
                </p>

            </div>

        </div>
    );
}
export default Login;

