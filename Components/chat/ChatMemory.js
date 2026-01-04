/**
 * Chat Memory Manager
 * Manages conversation history with context window limit
 */

const MAX_HISTORY_LENGTH = 20; // Maximum messages to keep
const MAX_TOKENS_ESTIMATE = 8000; // Rough token limit for context window

export class ChatMemory {
  constructor(userId = 'default') {
    this.userId = userId;
    this.storageKey = `chat_memory_${userId}`;
    this.history = this.loadHistory();
  }

  /**
   * Load history from localStorage
   */
  loadHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.slice(-MAX_HISTORY_LENGTH); // Keep only recent messages
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    return [];
  }

  /**
   * Save history to localStorage
   */
  saveHistory() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  /**
   * Add a message to history
   * @param {string} role - 'user' or 'assistant'
   * @param {string} content - Message text
   */
  addMessage(role, content) {
    const newMessage = {
      role,
      content,
      timestamp: Date.now()
    };

    this.history.push(newMessage);

    // Enforce limits
    if (this.history.length > MAX_HISTORY_LENGTH) {
      this.history = this.history.slice(-MAX_HISTORY_LENGTH);
    }

    this.saveHistory();
  }

  /**
   * Get messages formatted for API
   */
  getMessagesForAPI() {
    return this.history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Clear history
   */
  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  /**
   * Get length of history
   */
  getLength() {
    return this.history.length;
  }
}

// Singleton instance
let chatMemoryInstance = null;

export const getChatMemory = (userId = 'default') => {
  if (!chatMemoryInstance) {
    chatMemoryInstance = new ChatMemory(userId);
  }
  return chatMemoryInstance;
};