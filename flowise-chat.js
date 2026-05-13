/* flowise-chat.js */

/* ── Portfolio animations ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

/* ── Chat widget logic ── */
const FLOWISE_API = 'https://flowise-goldie.onrender.com/api/v1/prediction/4f392983-01fa-4b5e-bdfc-13eda6b93e52';

const chatWindow   = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput    = document.getElementById('chat-input');
const sendBtn      = document.getElementById('send-btn');
const chatTrigger  = document.getElementById('chat-trigger');
const iconChat     = document.getElementById('icon-chat');
const iconClose    = document.getElementById('icon-close');
const starterWrap  = document.getElementById('starter-prompts');

let chatOpen  = false;
let isLoading = false;

/* Welcome message */
function addWelcome() {
  addMessage(
    'bot',
    "Hi! I'm Goldie's virtual assistant. Ask me about her experience, skills, or whether she's available for your team. 👋"
  );
}

/* Toggle chat open/close */
chatTrigger.addEventListener('click', () => {
  chatOpen = !chatOpen;

  chatWindow.classList.toggle('open', chatOpen);
  chatTrigger.classList.toggle('open', chatOpen);

  iconChat.style.display = chatOpen ? 'none' : '';
  iconClose.style.display = chatOpen ? '' : 'none';

  chatTrigger.dataset.tip = chatOpen ? 'Close' : 'Chat with me';

  if (chatOpen && chatMessages.children.length === 0) {
    addWelcome();
  }

  if (chatOpen) {
    setTimeout(() => chatInput.focus(), 150);
  }
});

/* Starter prompts */
document.querySelectorAll('.starter-prompt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.dataset.prompt;

    starterWrap.style.display = 'none';
    sendMessage(prompt);
  });
});

/* Auto-resize textarea */
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 90) + 'px';
});

/* Send on Enter */
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    triggerSend();
  }
});

sendBtn.addEventListener('click', triggerSend);

function triggerSend() {
  const text = chatInput.value.trim();

  if (!text || isLoading) return;

  starterWrap.style.display = 'none';

  sendMessage(text);

  chatInput.value = '';
  chatInput.style.height = 'auto';
}

/* Add message bubble */
function addMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;

  if (role === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = 'G';
    wrap.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  wrap.appendChild(bubble);

  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return wrap;
}

/* Typing indicator */
function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.id = 'typing-wrap';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = 'G';

  wrap.appendChild(avatar);

  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-dot';
    indicator.appendChild(dot);
  }

  wrap.appendChild(indicator);

  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById('typing-wrap');

  if (typing) {
    typing.remove();
  }
}

/* Send message to Flowise */
async function sendMessage(text) {
  if (isLoading) return;

  isLoading = true;
  sendBtn.disabled = true;

  addMessage('user', text);
  showTyping();

  try {
    const response = await fetch(FLOWISE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: text
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    hideTyping();

    const reply =
      data.text ||
      data.answer ||
      data.message ||
      'Sorry, I didn’t get a response. Please try again.';

    addMessage('bot', reply);

  } catch (error) {
    hideTyping();

    addMessage(
      'bot',
      'Sorry, I couldn’t reach the server right now. Please try again in a moment.'
    );

    console.error('Flowise error:', error);

  } finally {
    isLoading = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }
}