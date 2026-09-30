import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, X, Sparkles, MessageSquare, Code2, HelpCircle } from 'lucide-react';

export const AIHelper = ({ currentTopic = 'Programming Fundamentals', courseContext = 'Python' }) => {
  const { isAiOpen, setIsAiOpen, aiInitialPrompt, setAiInitialPrompt } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am your UpSkillX AI Tutor 🤖. How can I help you master ${courseContext} today?`
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (aiInitialPrompt && isAiOpen) {
      handleSendMessage(aiInitialPrompt);
      setAiInitialPrompt('');
    }
  }, [aiInitialPrompt, isAiOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isAiOpen) return null;

  const generateMockReply = (query) => {
    const q = query.toLowerCase();
    if (q.includes('explain') || q.includes('topic')) {
      return `Sure! In ${courseContext}, **${currentTopic}** is a core building block. It allows your program to structure data cleanly and control logic execution flow step-by-step!`;
    }
    if (q.includes('example')) {
      return `Here is a clean code example for ${currentTopic}:\n\n\`\`\`${courseContext.toLowerCase()}\n# Example for ${currentTopic}\nval = 42\nprint(f"Data: {val}")\n\`\`\``;
    }
    if (q.includes('hint')) {
      return `💡 **Pro Tip:** Make sure you double-check syntax like colons, parentheses, and variable names. In ${courseContext}, accuracy is key!`;
    }
    if (q.includes('wrong') || q.includes('error')) {
      return `Common mistakes in ${currentTopic} usually stem from missing semicolons (in C) or incorrect indentation (in Python). Check your syntax around line 2!`;
    }
    return `That's a great question about **${currentTopic}**! As an AI Tutor, I recommend breaking down your code into smaller steps and verifying each statement line by line.`;
  };

  const handleSendMessage = (textToSend = input) => {
    const messageText = textToSend.trim();
    if (!messageText) return;

    const userMsg = { id: Date.now(), sender: 'user', text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate realistic response delay
    setTimeout(() => {
      const botReplyText = generateMockReply(messageText);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botReplyText };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestedPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 380,
        height: 540,
        maxHeight: 'calc(100vh - 48px)',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: 6, borderRadius: '50%' }}>
            <Bot size={20} color="#ffffff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>AI Tutor Helper</h4>
            <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Topic: {currentTopic}</span>
          </div>
        </div>
        <button
          onClick={() => setIsAiOpen(false)}
          style={{ color: '#ffffff', opacity: 0.8, padding: 4 }}
          aria-label="Close AI Helper"
        >
          <X size={20} />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div
        style={{
          padding: '10px 14px',
          background: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          gap: 6,
          overflowX: 'auto'
        }}
      >
        <button
          onClick={() => handleSuggestedPrompt('Explain this topic')}
          style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: 12,
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-dark)'
          }}
        >
          💡 Explain topic
        </button>
        <button
          onClick={() => handleSuggestedPrompt('Give me an example')}
          style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: 12,
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-dark)'
          }}
        >
          💻 Code example
        </button>
        <button
          onClick={() => handleSuggestedPrompt('Give me a hint')}
          style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: 12,
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-dark)'
          }}
        >
          🔍 Hint
        </button>
      </div>

      {/* Message List */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)',
              color: msg.sender === 'user' ? '#ffffff' : 'var(--text-dark)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
              fontSize: '0.88rem',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '8px 14px',
              borderRadius: 16,
              background: 'var(--bg-main)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}
          >
            AI is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: '12px 14px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: 8,
          background: '#ffffff'
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Tutor anything..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            outline: 'none',
            fontSize: '0.88rem'
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: 40, height: 40, padding: 0, borderRadius: '50%' }}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
