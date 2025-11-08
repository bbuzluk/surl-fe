import { type FormEvent, useState } from "react";
import { useAuth } from "../commons/AuthContext";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }
        setLoading(true);
        try {
            await login(username, password);
        } catch (error) {
            alert(error || "Login failed.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Login</h1>
                <p className="subtitle">Sign in to your account.</p>

                {error && <div className="alert">{error}</div>}

                <form onSubmit={handleSubmit} className="form">
                    <label className="label">
                        <span>Username</span>
                        <input
                            type="text"
                            className="input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </label>

                    <label className="label">
                        <span>Password</span>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                        />
                    </label>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}