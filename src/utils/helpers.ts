// ===== Utility Functions =====

// Generate unique ID
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Simple markdown parser
export function parseMarkdown(text: string): string {
    if (!text) return '';

    // Escape HTML
    let result = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Code blocks
    result = result.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Headers
    result = result.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    result = result.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    result = result.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Lists
    result = result.replace(/^\* (.*$)/gim, '<li>$1</li>');
    result = result.replace(/^- (.*$)/gim, '<li>$1</li>');
    result = result.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Wrap consecutive li elements
    result = result.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Line breaks
    result = result.replace(/\n\n/g, '</p><p>');
    result = result.replace(/\n/g, '<br>');

    // Wrap in paragraph if not wrapped
    if (!result.startsWith('<')) {
        result = '<p>' + result + '</p>';
    }

    return result;
}

// Storage helpers
export const storage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: <T>(key: string, value: T): void => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
