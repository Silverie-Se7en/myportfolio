// flowise-chat.js

document.addEventListener("DOMContentLoaded", () => {

  // Prevent duplicate chatbot
  if (window.GoldieChatbotLoaded) return;

  window.GoldieChatbotLoaded = true;

  // Remove old chatbot if exists
  const oldChat = document.getElementById("chat-window");
  if (oldChat) oldChat.remove();

  const oldTrigger = document.getElementById("chat-trigger");
  if (oldTrigger) oldTrigger.remove();

  // Load Flowise Embed
  const script = document.createElement("script");

  script.type = "module";

  script.innerHTML = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"

    Chatbot.init({

      chatflowid: "4f392983-01fa-4b5e-bdfc-13eda6b93e52",

      apiHost: "https://flowise-goldie.onrender.com",

      theme: {

        button: {
          backgroundColor: "#c45c2e",
          right: 24,
          bottom: 24,
          size: "medium",
          iconColor: "#ffffff"
        },

        tooltip: {
          showTooltip: true,
          tooltipMessage: "Chat with Goldie 👋",
          tooltipBackgroundColor: "#1a1410",
          tooltipTextColor: "#ffffff"
        },

        chatWindow: {

          showTitle: true,

          title: "Goldie's Assistant",

          welcomeMessage:
            "Hi! I'm Goldie's assistant. Ask me about experience, skills, or availability.",

          backgroundColor: "#f5f0e8",

          height: 650,

          width: 380,

          fontSize: 14,

          starterPrompts: [
            "What is Goldie's experience?",
            "What skills does he have?",
            "Is he available for hire?"
          ],

          clearChatOnReload: false,

          botMessage: {
            backgroundColor: "#ede8df",
            textColor: "#1a1410",
            showAvatar: true
          },

          userMessage: {
            backgroundColor: "#c45c2e",
            textColor: "#ffffff",
            showAvatar: true
          },

          textInput: {
            placeholder: "Ask me anything…",
            backgroundColor: "#ffffff",
            textColor: "#1a1410",
            sendButtonColor: "#c45c2e"
          },

          footer: {
            textColor: "#7a6e62",
            text: "Powered by Flowise"
          }
        }
      }
    })
  `;

  document.body.appendChild(script);

});
