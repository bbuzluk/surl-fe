import React from 'react';

interface AuthLayoutProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode; 
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
    return (
        <div className="container">
            <div className="card">
                {(title || subtitle) && (
                    <div className="header-section" style={{ marginBottom: '24px' }}>
                        {title && <h1 className="title">{title}</h1>}
                        {subtitle && <p className="subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="content-section">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;