import { useAuth } from '../commons/AuthContext';
import MainLayout from '../components/layout/MainLayout';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome, {user?.username}</h1>
        <p className="subtitle">This is your home page. You can quickly access your actions below.</p>

        <div className="grid">
          <div className="panel">
            <h2 className="panel-title">Quick Actions</h2>
            <ul className="list">
              <li>Create short link</li>
              <li>View analytics</li>
              <li>Manage account</li>
            </ul>
          </div>

          <div className="panel">
            <h2 className="panel-title">Session</h2>
            <p className="text">You can log out to end your session securely.</p>
            <button className="btn-danger" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div></MainLayout>
  );
}