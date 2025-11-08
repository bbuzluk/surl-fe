import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1 className="title">404</h1>
        <p className="subtitle">Page not found</p>

        <p style={{ color: "var(--muted)", marginTop: 12 }}>
          The page you are looking for does not exist or has been moved.
        </p>

        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => navigate(-1)}>Go Back</button>
          <Link to="/" className="btn-secondary" style={{ textDecoration: "none", padding: "10px 14px", borderRadius: 8 }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}