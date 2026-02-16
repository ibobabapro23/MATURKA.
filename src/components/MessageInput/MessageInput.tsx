// ===== Message Input Component =====

import { FC, useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import './MessageInput.css';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled: boolean;
}

export const MessageInput: FC<MessageInputProps> = ({ onSend, disabled }) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        autoResize();
    };

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    };

    const handleSend = () => {
        const trimmed = value.trim();
        if (trimmed && !disabled) {
            onSend(trimmed);
            setValue('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const hasContent = value.trim().length > 0;

    return (
        <div className="input-area">
            <div className="input-container">
                <div className={`input-wrapper ${hasContent ? 'has-content' : ''}`}>
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Bir soru sorun..."
                        rows={1}
                        disabled={disabled}
                    />
                    <button
                        className={`send-btn ${hasContent && !disabled ? 'active' : ''}`}
                        onClick={handleSend}
                        disabled={!hasContent || disabled}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        <div className="send-btn-glow"></div>
                    </button>
                </div>
                <p className="disclaimer">MATURKA hata yapabilir. Kritik konularda doğrulamayı unutmayın.</p>
            </div>
        </div>
    );
};
