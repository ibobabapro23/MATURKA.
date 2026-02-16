// ===== Welcome Screen Component =====

import { FC } from 'react';
import './WelcomeScreen.css';

interface SuggestionCard {
    icon: string;
    label: string;
    prompt: string;
}

interface WelcomeScreenProps {
    onSuggestionClick: (prompt: string) => void;
}

const suggestions: SuggestionCard[] = [
    { icon: '📐', label: 'İntegral hesaplama', prompt: 'İntegral nasıl çözülür? Basit bir örnek göster.' },
    { icon: '📈', label: 'Türev kuralları', prompt: 'Türev kurallarını açıkla ve örnekler ver.' },
    { icon: '∞', label: 'Limit hesaplama', prompt: 'Limit kavramını ve hesaplama yöntemlerini açıkla.' },
    { icon: '🔢', label: 'Denklem çözümü', prompt: 'İkinci derece denklem çözümünü adım adım göster.' },
];

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
    return (
        <div className="welcome-screen">
            {/* Animated background elements */}
            <div className="welcome-bg-effects">
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="welcome-content">
                <div className="welcome-logo">
                    <div className="welcome-icon-container square-wheel-anim">
                        <svg viewBox="0 0 200 200" className="welcome-logo-svg">
                            <defs>
                                <path id="curveTopW" d="M 30,100 A 70,70 0 0,1 170,100" />
                                <path id="curveBottomW" d="M 160,100 A 60,60 0 0,1 40,100" />
                                <linearGradient id="blueGradientW" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4f46e5" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                            </defs>

                            {/* Main Background - Rounded Square for "Square Wheel" look */}
                            <rect x="5" y="5" width="190" height="190" rx="40" fill="#111" stroke="#3b82f6" strokeWidth="4" />
                            <rect x="15" y="15" width="170" height="170" rx="30" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.5" />

                            {/* Inner Circle Badge */}
                            <circle cx="100" cy="100" r="85" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />

                            {/* Tech Head Center */}
                            <circle cx="100" cy="100" r="40" fill="url(#blueGradientW)" opacity="0.9" />
                            <path d="M100,70 Q125,70 125,100 T100,130 L100,120 Q115,120 115,100 T100,80 Z" fill="#fff" opacity="0.4" />

                            {/* Side Pi Tabs */}
                            <path d="M 15,100 L 40,85 L 40,115 Z" fill="#3b82f6" opacity="0.3" transform="translate(-10, 0)" />
                            <path d="M 185,100 L 160,85 L 160,115 Z" fill="#3b82f6" opacity="0.3" transform="translate(10, 0)" />
                            <text x="25" y="106" fontSize="20" fill="#60a5fa" textAnchor="middle" fontWeight="bold">π</text>
                            <text x="175" y="106" fontSize="20" fill="#60a5fa" textAnchor="middle" fontWeight="bold">π</text>

                            {/* Text */}
                            <text>
                                <textPath href="#curveTopW" startOffset="50%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" letterSpacing="2px">MATURKA</textPath>
                            </text>
                            <text>
                                <textPath href="#curveBottomW" startOffset="50%" textAnchor="middle" fill="#60a5fa" fontSize="12" letterSpacing="1px">AKILLI MATEMATİK</textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                <h2 className="welcome-title">
                    Merhaba, Ben <span className="gradient-text">MATURKA</span>
                </h2>

                <p className="welcome-description">
                    Matematik ağırlıklı yapay zeka asistanınız. Tüm sorularınıza akıllı cevaplar.
                </p>

                <div className="suggestion-cards">
                    {suggestions.map((card, index) => (
                        <div
                            key={index}
                            className="suggestion-card"
                            onClick={() => onSuggestionClick(card.prompt)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-icon">{card.icon}</div>
                            <span>{card.label}</span>
                            <div className="card-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
