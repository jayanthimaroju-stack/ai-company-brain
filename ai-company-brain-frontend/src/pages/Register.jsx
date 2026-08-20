
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Register.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser(name, email, password);

            alert("Registration successful!");
            navigate("/");

        } catch (error) {
            console.error(error);
            alert(error.message || "Registration failed");
        }
    };

    return (
        <div className="register-page">

            {/* LEFT SIDE */}
            <div className="register-left">

                {/* Brand */}
                <div className="register-brand">

                    <div className="register-logo">
                        ✦
                    </div>

                    <div>
                        <h1>AI Company Brain</h1>
                        <p>Intelligent Knowledge Assistant</p>
                    </div>

                </div>


                {/* Hero */}
                <div className="register-hero">

                    <h2>
                        Build your company's
                        <br />
                        <span>AI knowledge base.</span>
                    </h2>

                    <p>
                        Create your account and start turning
                        company documents into intelligent,
                        searchable knowledge.
                    </p>


                    {/* Features */}
                    <div className="register-features">

                        <div className="register-feature">

                            <div className="register-feature-icon">
                                📚
                            </div>

                            <div>
                                <h3>Centralized Knowledge</h3>

                                <p>
                                    Keep important company information in one place.
                                </p>
                            </div>

                        </div>


                        <div className="register-feature">

                            <div className="register-feature-icon">
                                ⚡
                            </div>

                            <div>
                                <h3>Instant Answers</h3>

                                <p>
                                    Ask questions and find information quickly.
                                </p>
                            </div>

                        </div>


                        <div className="register-feature">

                            <div className="register-feature-icon">
                                🔒
                            </div>

                            <div>
                                <h3>Secure Workspace</h3>

                                <p>
                                    Access your company's knowledge securely.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="register-right">

                <div className="register-card">

                    {/* Mobile Brand */}
                    <div className="register-mobile-brand">

                        <div className="register-logo">
                            ✦
                        </div>

                        <h1>AI Company Brain</h1>

                    </div>


                    <h2>Create your account</h2>

                    <p className="register-subtitle">
                        Start building your AI-powered company brain
                    </p>


                    <form onSubmit={handleRegister}>

                        {/* NAME */}
                        <div className="register-input-group">

                            <label htmlFor="name">
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>


                        {/* EMAIL */}
                        <div className="register-input-group">

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


                        {/* PASSWORD */}
                        <div className="register-input-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                        </div>


                        {/* REGISTER BUTTON */}
                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create account
                            <span>→</span>
                        </button>

                    </form>


                    {/* LOGIN */}
                    <p className="login-text">

                        Already have an account?{" "}

                        <a href="/login">
                            Sign in
                        </a>

                    </p>

                </div>


                <p className="register-copyright">
                    © 2026 AI Company Brain. All rights reserved.
                </p>

            </div>

        </div>
    );
}
export default Register;
