// ===== Header Component =====

import type { FC } from 'react';
import './Header.css';

interface HeaderProps {
    onToggleSidebar: () => void;
    onToggleTheme: () => void;
    theme: 'dark' | 'light';
}

export const Header: FC<HeaderProps> = ({ onToggleSidebar, onToggleTheme, theme }) => {
    return (
        <header className="header">
            <button className="menu-toggle" onClick={onToggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
            </button>

            <div className="logo">
                <div className="logo-icon">
                    <svg viewBox="0 0 200 200" className="logo-svg">
                        <defs>
                            <path id="curveTop" d="M 30,100 A 70,70 0 0,1 170,100" />
                            <path id="curveBottom" d="M 160,100 A 60,60 0 0,1 40,100" />
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4f46e5" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                        <circle cx="100" cy="100" r="95" fill="#111" stroke="#3b82f6" strokeWidth="4" />
                        <circle cx="100" cy="100" r="85" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                        <rect x="10" y="85" width="25" height="25" fill="#3b82f6" rx="4" opacity="0.3" />
                        <text x="22.5" y="102" fontSize="18" fill="#93c5fd" textAnchor="middle" fontWeight="bold">π</text>
                        <rect x="165" y="85" width="25" height="25" fill="#3b82f6" rx="4" opacity="0.3" />
                        <text x="177.5" y="102" fontSize="18" fill="#93c5fd" textAnchor="middle" fontWeight="bold">π</text>
                        <text>
                            <textPath href="#curveTop" startOffset="50%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" letterSpacing="2px">MATURKA</textPath>
                        </text>
                        <text>
                            <textPath href="#curveBottom" startOffset="50%" textAnchor="middle" fill="#60a5fa" fontSize="12" letterSpacing="1px">AKILLI MATEMATİK</textPath>
                        </text>
                        <circle cx="100" cy="100" r="40" fill="url(#blueGradient)" opacity="0.9" />
                        <path d="M100,70 Q125,70 125,100 T100,130 L100,120 Q115,120 115,100 T100,80 Z" fill="#fff" opacity="0.4" />
                    </svg>
                </div>    <h1 className="logo-text">MATURKA</h1>
            </div>

            <div className="header-actions">
                <button className="theme-toggle" onClick={onToggleTheme} title="Tema Değiştir">
                    {theme === 'dark' ? (
                        <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                    ) : (
                        <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
};
