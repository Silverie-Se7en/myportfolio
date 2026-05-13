const FLOWISE_API =
'https://flowise-goldie.onrender.com/api/v1/prediction/4f392983-01fa-4b5e-bdfc-13eda6b93e52';

const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatTrigger = document.getElementById('chat-trigger');
const iconChat = document.getElementById('icon-chat');
const iconClose = document.getElementById('icon-close');
const starterWrap = document.getElementById('starter-prompts');

let chatOpen = false;
let isLoading = false;

/* Welcome Message */
function addWelcome() {
  addMessage(
    'bot',
    "Hi! I'm Goldie's assistant. Ask me about experience, skills, or availability."
  );
}

/* Open / Close Chat */
chatTrigger.addEventListener('click', () => {
  chatOpen = !chatOpen;

  chatWindow.classList.toggle('open', chatOpen);

  iconChat.style.display = chatOpen ? 'none' : '';
  iconClose.style.display = chatOpen ? '' : 'none';

  if (chatOpen && chatMessages.children.length === 0) {
    addWelcome();
  }
});

/* Starter Prompts */
document.querySelectorAll('.starter-prompt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.dataset.prompt;

    starterWrap.style.display = 'none';

    sendMessage(prompt);
  });
});

/* Auto Resize Textarea */
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';

  chatInput.style.height =
    Math.min(chatInput.scrollHeight, 90) + 'px';
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

/* Add Chat Bubble */
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
}

/* Typing Indicator */
function showTyping() {
  const wrap = document.createElement('div');

  wrap.className = 'msg bot';
  wrap.id = 'typing-wrap';

  const avatar = document.createElement('div');

  avatar.className = 'msg-avatar';
  avatar.textContent = 'G';

  const indicator = document.createElement('div');

  indicator.className = 'typing-indicator';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');

    dot.className = 'typing-dot';

    indicator.appendChild(dot);
  }

  wrap.appendChild(avatar);
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

/* Send Message to Flowise */
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
      'No response received.';

    addMessage('bot', reply);

  } catch (error) {
    hideTyping();

    addMessage(
      'bot',
      'Sorry, I could not connect to the chatbot server.'
    );

    console.error('Flowise Error:', error);

  } finally {
    isLoading = false;

    sendBtn.disabled = false;

    chatInput.focus();
  }
}
