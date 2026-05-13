document.addEventListener("DOMContentLoaded", async () => {

  if (window.GoldieChatbotLoaded) return;
  window.GoldieChatbotLoaded = true;

  // remove old elements if any
  document.getElementById("chat-window")?.remove();
  document.getElementById("chat-trigger")?.remove();

  try {
    // load Flowise properly (NO innerHTML, NO module script injection)
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
    script.type = "module";

    script.onload = async () => {
      const { Chatbot } = await import("https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js");

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
              "Hi! I'm Goldie's assistant. Ask me anything.",

            backgroundColor: "#f5f0e8",
            height: 650,
            width: 380,

            starterPrompts: [
              "What is Goldie's experience?",
              "What skills does he have?",
              "Is he available for hire?"
            ],

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
              sendButtonColor: "#c45c2e"
            }
          }
        }
      });
    };

    script.onerror = () => {
      console.error("Failed to load Flowise script");
    };

    document.body.appendChild(script);

  } catch (err) {
    console.error("Chatbot error:", err);
  }
});
