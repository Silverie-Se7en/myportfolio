document.addEventListener("DOMContentLoaded", async () => {

  if (window.FlowiseChatLoaded) return;
  window.FlowiseChatLoaded = true;

  // remove duplicates if any
  document.getElementById("flowise-chatbot-container")?.remove();

  // create container (Flowise needs a mount point)
  const container = document.createElement("div");
  container.id = "flowise-chatbot-container";
  document.body.appendChild(container);

  try {
    // ✅ Proper ES module import
    const { Chatbot } = await import(
      "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    );

    Chatbot.init({
      chatflowid: "4f392983-01fa-4b5e-bdfc-13eda6b93e52",
      apiHost: "https://cloud.flowiseai.com",

      theme: {
        button: {
          backgroundColor: "#c45c2e", // matches your portfolio accent
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
          title: "Goldie Assistant",

          welcomeMessage:
            "Hi! I'm your assistant. Ask me about experience, skills, or availability.",

          backgroundColor: "#f5f0e8",
          height: 560,
          width: 380,
          fontSize: 14,

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
    });

  } catch (err) {
    console.error("Flowise failed to load:", err);
  }
});
