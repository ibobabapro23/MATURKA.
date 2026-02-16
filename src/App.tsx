// ===== Main App Component =====

import { useState, useCallback, useEffect } from 'react';
import { Header, Sidebar, WelcomeScreen, ChatArea, MessageInput } from './components';
import { sendToGemini } from './services/gemini';
import { generateId, storage } from './utils/helpers';
import type { Message, Chat } from './types';
import './App.css';

function App() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Chat[]>(() =>
    storage.get<Chat[]>('maturka_chats', [])
  );
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    storage.get<'dark' | 'light'>('maturka_theme', 'dark')
  );
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set('maturka_theme', theme);
  }, [theme]);

  // Save chat history
  useEffect(() => {
    storage.set('maturka_chats', chatHistory);
  }, [chatHistory]);

  // Toggle handlers
  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(s => !s);
  }, []);

  // New chat
  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, []);

  // Select chat
  const handleSelectChat = useCallback((chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages([...chat.messages]);
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    }
  }, [chatHistory]);

  // Save current chat
  const saveChat = useCallback((msgs: Message[], chatId: string) => {
    const title = msgs[0]?.content.slice(0, 40) + (msgs[0]?.content.length > 40 ? '...' : '') || 'Yeni Sohbet';

    setChatHistory(prev => {
      const existingIndex = prev.findIndex(c => c.id === chatId);
      const chatData: Chat = {
        id: chatId,
        title,
        messages: msgs,
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = chatData;
        return updated;
      }
      return [chatData, ...prev].slice(0, 50);
    });
  }, []);

  // Send message
  const handleSend = useCallback(async (content: string) => {
    // Create new chat ID if needed
    const chatId = currentChatId || generateId();
    if (!currentChatId) {
      setCurrentChatId(chatId);
    }

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendToGemini(newMessages);

      // Add assistant message
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      saveChat(finalMessages, chatId);

    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Üzgünüm, bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}\n\nLütfen tekrar deneyin.`,
        timestamp: new Date().toISOString()
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentChatId, saveChat]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((prompt: string) => {
    handleSend(prompt);
  }, [handleSend]);

  // Delete chat
  const handleDeleteChat = useCallback((e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (window.confirm('Bu sohbeti silmek istediğinize emin misiniz?')) {
      setChatHistory(prev => prev.filter(c => c.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
    }
  }, [currentChatId]);

  // Clear all history
  const handleClearHistory = useCallback(() => {
    if (window.confirm('Tüm sohbet geçmişini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      setChatHistory([]);
      setCurrentChatId(null);
      setMessages([]);
    }
  }, []);

  const hasMessages = messages.length > 0;

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="app-bg">
        <div className="bg-gradient bg-1"></div>
        <div className="bg-gradient bg-2"></div>
        <div className="bg-gradient bg-3"></div>
        <div className="bg-noise"></div>

        {/* Game Style Background Animation */}
        <div className="game-scene">
          <div className="game-grid"></div>
          <div className="laser-beam beam-1"></div>
          <div className="laser-beam beam-2"></div>
          <div className="laser-beam beam-3"></div>
          <div className="laser-beam beam-4"></div>

          <div className="neon-bar bar-h"></div>
          <div className="neon-bar bar-v"></div>

          <div className="particle-system">
            <div className="collision-particle"></div>
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        chats={chatHistory}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onClearHistory={handleClearHistory}
      />

      <main className="main-content">
        <Header
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          theme={theme}
        />

        <div className="content-area">
          {hasMessages ? (
            <ChatArea messages={messages} isLoading={isLoading} />
          ) : (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          )}
        </div>

        <MessageInput onSend={handleSend} disabled={isLoading} />
      </main>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

export default App;
