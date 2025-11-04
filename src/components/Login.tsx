import { useState } from "react";
import "../assets/Login.css"
import { removeWhitespace } from "../utils/stringUtils";
import { login } from "../services/authService";
import type { IApiResponse } from "../types/common";


export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ username, password }).then((response: IApiResponse<string>) => {
            if (response.success) {
                localStorage.setItem('token', response.data!);
                onLoginSuccess();
            } else {
                alert(response.errorMessage || "Login failed.");
            }
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            onChange={(e) => {
                                e.target.value = removeWhitespace(e.target.value);
                                setUsername(e.target.value);
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
}

