// flowise-chat.js

document.addEventListener('DOMContentLoaded', function () {

  class FlowiseChatbot {

    constructor(config) {
      this.chatflowid = config.chatflowid;
      this.apiHost = config.apiHost;
      this.theme = config.theme || {};
      this.chatbotConfig = config.chatbotConfig || {};

      this.init();
    }

    init() {
      this.createChatbotContainer();
      this.loadFlowiseScript();
    }

    createChatbotContainer() {

      if (document.getElementById('flowise-chatbot-container')) {
        return;
      }

      const container = document.createElement('div');

      container.id = 'flowise-chatbot-container';

      document.body.appendChild(container);
    }

    loadFlowiseScript() {

      if (window.FlowiseChatbotLoaded) return;

      const script = document.createElement('script');

      script.type = 'module';

      script.textContent = `
        import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"

        Chatbot.init({

          chatflowid: "${this.chatflowid}",

          apiHost: "${this.apiHost}",

          theme: ${JSON.stringify(this.theme)},

          chatbotConfig: ${JSON.stringify(this.chatbotConfig)}

        })
      `;

      document.head.appendChild(script);

      window.FlowiseChatbotLoaded = true;
    }
  }

  /* ─────────────────────────────
     GOLDIE CHATBOT DESIGN
  ───────────────────────────── */

  const chatbot = new FlowiseChatbot({

    chatflowid: "4f392983-01fa-4b5e-bdfc-13eda6b93e52",

    apiHost: "https://flowise-goldie.onrender.com",

    theme: {

      button: {
        backgroundColor: "#c45c2e",
        right: 24,
        bottom: 24,
        size: "medium",
        iconColor: "#ffffff",

        customIconSrc:
          "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
      },

      tooltip: {
        showTooltip: true,
        tooltipMessage: "Chat with Goldie 👋",
        tooltipBackgroundColor: "#1a1410",
        tooltipTextColor: "#ffffff",
        tooltipFontSize: 13
      },

      chatWindow: {

        showTitle: true,

        title: "Goldie's Assistant",

        titleAvatarSrc:
          "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",

        welcomeMessage:
          "Hi! I'm Goldie's assistant. Ask me about experience, skills, or availability.",

        errorMessage:
          "Sorry, I couldn't connect right now.",

        backgroundColor: "#f5f0e8",

        height: 650,

        width: 380,

        fontSize: 14,

        starterPrompts: [
          "What is Goldie's experience?",
          "What skills does she have?",
          "Is she available for hire?"
        ],

        starterPromptFontSize: 13,

        clearChatOnReload: false,

        botMessage: {
          backgroundColor: "#ede8df",
          textColor: "#1a1410",
          showAvatar: true,

          avatarSrc:
            "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
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
          sendButtonColor: "#c45c2e",
          maxChars: 500
        },

        footer: {
          textColor: "#7a6e62",
          text: "Powered by Flowise"
        }
      }
    },

    chatbotConfig: {

      /* Optional additional configs */

    }
  });

});
