import express from 'express';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', (req, res) => {
  const { message, currentTopic = 'Programming', courseContext = 'Python' } = req.body;
  const q = (message || '').toLowerCase();

  let botReply = `That is a great question about **${currentTopic}**! In ${courseContext}, breaking code into small logical steps helps you trace variables accurately.`;

  if (q.includes('explain') || q.includes('topic')) {
    botReply = `Sure! In **${courseContext}**, **${currentTopic}** is a core building block. It allows your program to structure data cleanly and control logic execution flow step-by-step!`;
  } else if (q.includes('example')) {
    botReply = `Here is a clean code example for **${currentTopic}**:\n\n\`\`\`${courseContext.toLowerCase()}\n# Example for ${currentTopic}\nval = 42\nprint(f"Data: {val}")\n\`\`\``;
  } else if (q.includes('hint')) {
    botReply = `💡 **Pro Tip:** Make sure you double-check syntax like colons, parentheses, and variable names. In ${courseContext}, precision is key!`;
  } else if (q.includes('wrong') || q.includes('error')) {
    botReply = `Common mistakes in **${currentTopic}** usually stem from missing semicolons (in C) or incorrect indentation (in Python). Check your syntax around line 2!`;
  }

  return res.json({ reply: botReply, topic: currentTopic, course: courseContext });
});

export default router;
