// ===== Type Definitions =====

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    updatedAt: string;
}

export interface AppState {
    messages: Message[];
    chatHistory: Chat[];
    currentChatId: string | null;
    isLoading: boolean;
    theme: 'dark' | 'light';
    sidebarOpen: boolean;
}

export interface GeminiContent {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: { text: string }[];
        };
    }[];
    error?: {
        message: string;
    };
}
