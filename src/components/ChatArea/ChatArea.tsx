// ===== Chat Area Component =====

import { FC, useEffect, useRef } from 'react';
import type { Message } from '../../types';
import { parseMarkdown } from '../../utils/helpers';
import './ChatArea.css';

interface ChatAreaProps {
    messages: Message[];
    isLoading: boolean;
}

export const ChatArea: FC<ChatAreaProps> = ({ messages, isLoading }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="chat-area" ref={containerRef}>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`message ${msg.role}`} style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="message-avatar">
                            {msg.role === 'user' ? '👤' : '∫'}
                        </div>
                        <div className="message-content-wrapper">
                            <div
                                className="message-content"
                                dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                            />
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message assistant loading">
                        <div className="message-avatar">∫</div>
                        <div className="message-content-wrapper">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
