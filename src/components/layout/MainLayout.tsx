import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../commons/AuthContext';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="main-layout">
            <header className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">Short URL</Link>

                    <nav className="navbar-menu">
                        <span className="user-welcome">Hello, {user?.username}</span>
                        <button onClick={handleLogout} className="btn-secondary btn-sm">
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;