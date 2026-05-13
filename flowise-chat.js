document.addEventListener('DOMContentLoaded', function() {
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
            if (document.getElementById('flowise-chatbot-container')) return;

            const container = document.createElement('div');
            container.id = 'flowise-chatbot-container';
            document.body.appendChild(container);
        }

        loadFlowiseScript() {
            if (window.FlowiseChatbotLoaded) return;

            const script = document.createElement('script');

            script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
            script.type = "module";

            script.onload = () => {
                import("https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js")
                    .then(({ Chatbot }) => {

                        Chatbot.init({
                            chatflowid: this.chatflowid,
                            apiHost: this.apiHost,
                            theme: this.theme,
                            chatbotConfig: this.chatbotConfig
                        });

                    })
                    .catch(err => console.error("Flowise load error:", err));
            };

            document.body.appendChild(script);
            window.FlowiseChatbotLoaded = true;
        }
    }

    const chatbot = new FlowiseChatbot({
        chatflowid: "4f392983-01fa-4b5e-bdfc-13eda6b93e52",

        apiHost: "https://cloud.flowiseai.com",

        theme: {
            button: {
                backgroundColor: "#c45c2e",   // matches your portfolio accent
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
                welcomeMessage: "Hi 👋 I'm Goldie's assistant. Ask me anything about experience, skills, or availability.",

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
        },

        chatbotConfig: {}
    });
});
