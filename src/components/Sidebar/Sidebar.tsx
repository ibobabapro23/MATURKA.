// ===== Sidebar Component =====

import type { FC } from 'react';
import type { Chat } from '../../types';
import './Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    chats: Chat[];
    currentChatId: string | null;
    onNewChat: () => void;
    onSelectChat: (id: string) => void;
    onDeleteChat: (e: React.MouseEvent, id: string) => void;
    onClearHistory: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, onClearHistory }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-glow"></div>

            <div className="sidebar-header">
                <button className="new-chat-btn" onClick={onNewChat}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    <span>Yeni Sohbet</span>
                    <div className="btn-shine"></div>
                </button>
            </div>

            <div className="chat-history">
                {chats.length === 0 ? (
                    <div className="empty-history">
                        <p>Henüz sohbet yok</p>
                    </div>
                ) : (
                    <>
                        <div className="history-list">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
                                    onClick={() => onSelectChat(chat.id)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="chat-icon">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span>{chat.title}</span>
                                    <button
                                        className="delete-chat-btn"
                                        onClick={(e) => onDeleteChat(e, chat.id)}
                                        title="Sohbeti Sil"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="clear-history-btn" onClick={onClearHistory}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Tüm Geçmişi Temizle</span>
                        </button>
                    </>
                )}
            </div>

            <div className="sidebar-footer">
                <div className="model-badge">
                    <div className="model-indicator"></div>
                    <span>Maturka V 4.2</span>
                </div>
                <div className="sidebar-credit">
                    <p>Yapımcı: Hasan Günbeyi</p>
                    <span>9/D Sınıfı</span>
                </div>
            </div>
        </aside>
    );
};
