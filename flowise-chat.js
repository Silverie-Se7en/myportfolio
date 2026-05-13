// flowise-chat.js
// Dynamically imports the Flowise embed and initialises the chatbot.
// Must be loaded AFTER the DOM is ready (use defer on the <script> tag).

(function () {
  // Avoid double-initialisation if the script is somehow loaded twice.
  if (window.__flowiseChatbotInit) return;
  window.__flowiseChatbotInit = true;

  const CHATFLOW_ID = "4f392983-01fa-4b5e-bdfc-13eda6b93e52";
  const API_HOST    = "https://cloud.flowiseai.com";

  const THEME = {
    button: {
      backgroundColor: "#c45c2e",
      right: 24,
      bottom: 24,
      size: "medium",
      iconColor: "#ffffff",
      customIconSrc: "https://cdn-icons-png.flaticon.com/512/1036/1036745.png"
    },
    tooltip: {
      showTooltip: true,
      tooltipMessage: "Chat with Goldie 👋",
      tooltipBackgroundColor: "#1a1410",
      tooltipTextColor: "#ffffff"
    },
    chatWindow: {
      welcomeMessage: "Hi 👋 I'm Goldie's assistant. Ask me anything about her experience, skills, or availability.",
      backgroundColor: "#f5f0e8",
      height: 560,
      width: 380,
      fontSize: 14,
      botMessage: {
        backgroundColor: "#ede8df",
        textColor: "#1a1410",
        showAvatar: true,
        avatarSrc: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
      },
      userMessage: {
        backgroundColor: "#c45c2e",
        textColor: "#ffffff",
        showAvatar: true,
        avatarSrc: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      textInput: {
        placeholder: "Ask me anything…",
        backgroundColor: "#ffffff",
        textColor: "#1a1410",
        sendButtonColor: "#c45c2e"
      }
    }
  };

  // Flowise embed must be loaded as an ES module.
  // We inject a <script type="module"> so the browser handles the import correctly.
  const moduleScript = document.createElement("script");
  moduleScript.type = "module";
  moduleScript.textContent = `
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
    Chatbot.init({
      chatflowid: "${CHATFLOW_ID}",
      apiHost:    "${API_HOST}",
      theme: ${JSON.stringify(THEME)},
      chatbotConfig: {}
    });
  `;
  document.body.appendChild(moduleScript);
})();
