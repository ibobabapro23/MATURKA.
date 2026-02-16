// ===== Gemini API Service =====

import { API_CONFIG } from '../config/api';
import type { Message, GeminiContent, GeminiResponse } from '../types';

export async function sendToGemini(messages: Message[]): Promise<string> {
    const url = `${API_CONFIG.API_URL}?key=${API_CONFIG.API_KEY}`;

    // Build conversation history
    const contents: GeminiContent[] = [];

    // Add system instruction
    contents.push({
        role: 'user',
        parts: [{ text: API_CONFIG.SYSTEM_PROMPT }]
    });
    contents.push({
        role: 'model',
        parts: [{ text: 'Anladım! Ben MATURKA, matematik ağırlıklı sorularınıza yardımcı olmak için buradayım. Size nasıl yardımcı olabilirim?' }]
    });

    // Add conversation history
    messages.forEach(msg => {
        contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        });
    });

    const requestBody = {
        contents,
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const error: GeminiResponse = await response.json();
        throw new Error(error.error?.message || 'API isteği başarısız oldu');
    }

    const data: GeminiResponse = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Geçersiz API yanıtı');
}
