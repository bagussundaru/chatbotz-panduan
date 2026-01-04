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
 