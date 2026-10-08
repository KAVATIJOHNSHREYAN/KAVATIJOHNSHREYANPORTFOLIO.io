/**
 * Ask Aether AI - Interactive Portfolio AI Chat Widget
 * Author: Kavati John Shreyan
 * Description: Client-side NLP & Knowledge Engine powered by structured intent matching.
 */

(function () {
    "use strict";

    // Knowledge Base Data Structure
    const KNOWLEDGE_BASE = [
        {
            intents: ["hi", "hello", "hey", "who are you", "start", "greetings", "help", "ai"],
            response: `Hello! 👋 I'm **Ask Aether AI**, Shreyan's portfolio assistant. 

I can answer your questions about Shreyan's **projects**, **skills**, **SIH 2026 hackathon experience**, **Siemens internship**, or **how to contact him**. 

What would you like to explore?`,
            chips: ["⚡ Flagship AI Platform", "🏗️ AetherMind Genesis", "🏆 SIH 2026 Hackathon", "💼 Siemens Internship"]
        },
        {
            intents: ["project", "projects", "work", "apps", "portfolio", "code"],
            response: `Here are **Shreyan's featured engineering projects**:

1. ⚡ **AetherMind Multi-Modal AI** — Enterprise Multimodal AI platform with AI routing, Vision AI, OCR, voice interaction, RAG, and document intelligence.
2. 🏗️ **AetherMind Genesis** — AI software architecture platform generating production-ready software blueprints, flowcharts, APIs, and UI/UX specs.
3. 🗓️ **Smart Resource & Timetable Optimizer** — AI-assisted university timetable & resource optimization platform with RBAC & FastAPI backend.
4. 📊 **KL University Attendance Calculator** — Open-source responsive student attendance utility with modern UI/UX redesign.
5. 📚 **AetherMind EDU** — Comprehensive AI education platform delivering personalized tutoring, RAG study assistants, and career guidance.

Which project would you like to inspect?`,
            chips: ["⚡ AetherMind Multi-Modal AI", "🏗️ AetherMind Genesis", "🗓️ Timetable Optimizer", "📊 Attendance Calculator"]
        },
        {
            intents: ["aethermind multi-modal ai", "multimodal", "multimodal ai", "flagship", "aethermind multi modal", "samrat"],
            response: `⚡ **AetherMind Multi-Modal AI** (⭐ Flagship AI Platform):

• **Description:** Enterprise-grade multimodal AI platform unifying intelligent conversations, document understanding, OCR, Vision AI, image generation, voice interaction, Retrieval-Augmented Generation (RAG), secure workspaces, and AI routing.
• **Tech Stack:** Python, FastAPI, Streamlit, Firebase, Supabase, Qdrant Vector DB, Amazon Bedrock, JavaScript, HTML, CSS.
• **Key Capabilities:** Intelligent AI Routing, Multi-LLM Support, Chat Workspaces, Document Intelligence, OCR & PDF Analysis, Vision AI, Image Generation, Voice Assistant, Web Intelligence.
• **Live Demo:** [aethermind-multi-modal-ai-fwt8jmcqdbbmoahwveobze.streamlit.app](https://aethermind-multi-modal-ai-fwt8jmcqdbbmoahwveobze.streamlit.app/)`,
            chips: ["🏗️ AetherMind Genesis", "🗓️ Timetable Optimizer", "📜 Resume", "📬 Contact Shreyan"]
        },
        {
            intents: ["genesis", "aethermind genesis", "blueprint", "software architect", "architecture platform"],
            response: `🏗️ **AetherMind Genesis**:

• **Description:** AI-powered software architecture and product engineering platform that transforms raw ideas into production-ready software blueprints.
• **Tech Stack:** Python, FastAPI, React, TypeScript, AI Agents, LLMs, Prompt Engineering, Vector Search.
• **Key Features:** AI Software Architect, Blueprint Generator, System Design, UI/UX Planning, Database & API Architecture, Flowcharts, Documentation Generator.`,
            chips: ["⚡ AetherMind Multi-Modal AI", "📚 AetherMind EDU", "📜 Resume"]
        },
        {
            intents: ["timetable", "resource optimizer", "optimizer", "smart resource", "srto"],
            response: `🗓️ **Smart Resource & Timetable Optimizer**:

• **Description:** AI-assisted university resource & timetable optimization platform automating academic timetable generation, faculty allocation, and classroom management.
• **Tech Stack:** React, TypeScript, FastAPI, Python, SQLite, JWT Authentication.
• **Deployment:** Frontend on Vercel, Backend microservices on Render.`,
            chips: ["📊 Attendance Calculator", "🛠️ Tech Stack", "📜 Resume"]
        },
        {
            intents: ["attendance", "attendance calculator", "kl university attendance", "ltps"],
            response: `📊 **KL University Attendance Calculator**:

• **Description:** Modern open-source attendance calculator featuring a complete UI/UX redesign, responsive mobile layout, and intuitive student tracking.
• **Tech Stack:** React, Next.js, Tailwind CSS, JavaScript, UI/UX Design.
• **Live Demo:** [ltps-attendance-calculator.vercel.app](https://ltps-attendance-calculator.vercel.app)`,
            chips: ["⚡ AetherMind Multi-Modal AI", "🛠️ Tech Stack", "📜 Resume"]
        },
        {
            intents: ["edu", "aethermind edu", "education", "tutor"],
            response: `📚 **AetherMind EDU**:

• **Description:** Comprehensive AI-powered education platform delivering personalized learning, intelligent tutoring, adaptive assessments, document intelligence, and career guidance.
• **Tech Stack:** Next.js, React, FastAPI, Python, AI Agents, LLMs, RAG, SQLite.
• **Features:** AI Tutor, Personalized Learning Paths, Document Q&A, Career Advisory, Smart Assessments.`,
            chips: ["⚡ AetherMind Multi-Modal AI", "🏗️ AetherMind Genesis", "📜 Resume"]
        },
        {
            intents: ["hackathon", "sih", "smart india hackathon", "sih 2026", "aws hackathon", "aws", "kl university hackathon", "competition", "team"],
            response: `🏆 **Hackathon Achievements**:

1. ☁️ **AWS 18-Hour Hackathon (KL University)**:
   • Participated in an intensive **18-hour AWS Hackathon** hosted at KL University.
   • Engineered a cloud-native prototype under strict deadlines.
   • Pitched to industry experts and judges, receiving official scoring, marks, and architectural feedback.

2. 🇮🇳 **Smart India Hackathon (SIH) 2026**:
   • Worked continuously for **18 hours** in a 6-member team on a real-world problem statement, delivering rapid problem solving and full-stack API integration.`,
            chips: ["⚡ Flagship AI Platform", "💼 Siemens Internship", "📬 Contact Shreyan"]
        },
        {
            intents: ["siemens", "internship", "experience", "work experience", "data science intern"],
            response: `💼 **Siemens — Data Science Virtual Intern** (April 2026 – June 2026):

• Cleaned and manipulated large analytical datasets using **Python, Pandas, and NumPy**.
• Evaluated baseline classification models, precision/regression metrics, and data quality.
• Built structured ETL data preparation pipelines for downstream ML models.
• Gained hands-on experience in enterprise development workflows & technical reporting.`,
            chips: ["🛠️ Tech Stack", "📜 Resume", "🎓 Education"]
        },
        {
            intents: ["skill", "skills", "tech stack", "languages", "python", "java", "react", "fastapi", "rag", "llm", "frameworks", "qdrant", "bedrock"],
            response: `🛠️ **Shreyan's Technical Stack**:

• **Languages:** Python, Java, JavaScript, TypeScript, HTML5, CSS3
• **AI & LLMs:** Multimodal AI, RAG, AI Agents, Qdrant Vector DB, Amazon Bedrock, Prompt Engineering, Vision AI
• **Web & Backend:** FastAPI, Streamlit, React, Next.js, REST APIs, JWT, Supabase, Firebase
• **Databases:** Qdrant, Supabase, Firebase Firestore, MySQL, SQLite
• **Cloud & Hosting:** Vercel, Render, Google Cloud, AWS
• **Tools:** Git, GitHub, Antigravity, VS Code`,
            chips: ["🚀 Top Projects", "📜 Resume", "📬 Contact Shreyan"]
        },
        {
            intents: ["education", "college", "university", "kl university", "cgpa", "gpa", "degree", "btech", "marks"],
            response: `🎓 **Education Background**:

• **Degree:** B.Tech in Computer Science & Engineering (*Specialization in AI with Computational Intelligence*)
• **Institution:** K L University, Andhra Pradesh, India (2024 – Present)
• **CGPA:** **7.74**
• **High School:** Intermediate (Vignana Bharathi Junior College) & 10th Class (Vignana Bharathi High School)`,
            chips: ["📜 Resume", "💼 Siemens Internship", "📬 Contact Shreyan"]
        },
        {
            intents: ["certif", "certifications", "azure", "microsoft", "certificates"],
            response: `📜 **Certifications**:

1. ☁️ **Microsoft Certified: Azure Fundamentals** (June 2026)
2. 📊 **Data Science Virtual Internship Certificate** — Siemens (June 2026)`,
            chips: ["💼 Siemens Internship", "🛠️ Tech Stack", "📜 Resume"]
        },
        {
            intents: ["contact", "email", "phone", "hire", "reach", "linkedin", "github", "location", "address"],
            response: `📬 **Contact Information**:

• **Email:** [2400033326cse2@gmail.com](mailto:2400033326cse2@gmail.com)
• **Phone:** +91 8374556692
• **Location:** Andhra Pradesh, India
• **LinkedIn:** [linkedin.com/in/kavati-john-shreyan-956a35366](https://linkedin.com/in/kavati-john-shreyan-956a35366)
• **GitHub:** [github.com/KAVATIJOHNSHREYAN](https://github.com/KAVATIJOHNSHREYAN)`,
            chips: ["📜 Resume", "🚀 Top Projects", "🏆 SIH 2026 Hackathon"]
        },
        {
            intents: ["resume", "cv", "pdf", "download resume"],
            response: `📄 You can view and download Shreyan's single-page ATS-friendly resume here:

👉 **[View & Download Resume](./resume.html)**`,
            chips: ["📬 Contact Shreyan", "🚀 Top Projects", "🛠️ Tech Stack"]
        }
    ];

    // Fallback Response
    const FALLBACK_RESPONSE = {
        response: `I'm not quite sure about that specific detail, but I can help you learn more about Shreyan! 

Try asking about his **projects**, **SIH 2026 hackathon**, **Siemens internship**, **tech stack**, or **contact details**.`,
        chips: ["🚀 Top Projects", "🏆 SIH 2026 Hackathon", "🛠️ Tech Stack", "📬 Contact Shreyan"]
    };

    // Chat Controller Class
    class AIChatWidget {
        constructor() {
            this.isOpen = false;
            this.isTyping = false;
            this.initDOM();
            this.bindEvents();
        }

        initDOM() {
            const widgetContainer = document.createElement("div");
            widgetContainer.id = "ai-chat-root";
            widgetContainer.innerHTML = `
                <!-- Floating Trigger Button -->
                <button id="ai-chat-trigger" class="ai-chat-trigger" aria-label="Open Ask Aether AI Chat">
                    <div class="trigger-icon-wrapper">
                        <i class="fa-solid fa-sparkles trigger-bot-icon"></i>
                        <span class="trigger-pulse-dot"></span>
                    </div>
                    <span class="trigger-label">Ask Aether AI</span>
                </button>

                <!-- Floating Chat Panel Window -->
                <div id="ai-chat-window" class="ai-chat-window hidden" aria-hidden="true">
                    <!-- Header -->
                    <div class="ai-chat-header">
                        <div class="header-info">
                            <div class="header-avatar">
                                <i class="fa-solid fa-brain"></i>
                                <span class="status-online"></span>
                            </div>
                            <div class="header-text">
                                <h3>Ask Aether AI</h3>
                                <p>Shreyan's Portfolio Assistant</p>
                            </div>
                        </div>
                        <div class="header-actions">
                            <button id="ai-chat-clear" title="Clear Chat" aria-label="Clear Chat history"><i class="fa-solid fa-rotate-right"></i></button>
                            <button id="ai-chat-close" title="Close" aria-label="Close Chat Window"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>

                    <!-- Chat Body / Messages -->
                    <div id="ai-chat-messages" class="ai-chat-messages">
                        <!-- Initial Greeting Message -->
                        <div class="chat-msg bot-msg">
                            <div class="msg-avatar"><i class="fa-solid fa-brain"></i></div>
                            <div class="msg-bubble">
                                Hello! 👋 I'm **Ask Aether AI**, Shreyan's portfolio assistant. 
                                <br><br>
                                Ask me anything about Shreyan's **projects**, **skills**, **SIH 2026 hackathon experience**, **Siemens internship**, or **how to contact him**.
                            </div>
                        </div>

                        <!-- Quick Action Chips -->
                        <div class="quick-chips-container" id="quick-chips">
                            <button class="chip-btn" data-query="⚡ Flagship AI Platform">⚡ Flagship AI Platform</button>
                            <button class="chip-btn" data-query="🏗️ AetherMind Genesis">🏗️ AetherMind Genesis</button>
                            <button class="chip-btn" data-query="🏆 SIH 2026 Hackathon">🏆 SIH 2026</button>
                            <button class="chip-btn" data-query="🛠️ Tech Stack">🛠️ Tech Stack</button>
                        </div>
                    </div>

                    <!-- Input Bar -->
                    <form id="ai-chat-form" class="ai-chat-input-area">
                        <input type="text" id="ai-chat-input" placeholder="Ask about projects, skills, SIH 2026..." autocomplete="off" />
                        <button type="submit" id="ai-chat-send" aria-label="Send Message">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(widgetContainer);

            this.triggerBtn = document.getElementById("ai-chat-trigger");
            this.chatWindow = document.getElementById("ai-chat-window");
            this.closeBtn = document.getElementById("ai-chat-close");
            this.clearBtn = document.getElementById("ai-chat-clear");
            this.messagesContainer = document.getElementById("ai-chat-messages");
            this.chatForm = document.getElementById("ai-chat-form");
            this.chatInput = document.getElementById("ai-chat-input");
        }

        bindEvents() {
            this.triggerBtn.addEventListener("click", () => this.toggleWindow());
            this.closeBtn.addEventListener("click", () => this.toggleWindow(false));
            this.clearBtn.addEventListener("click", () => this.clearChat());

            this.chatForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const query = this.chatInput.value.trim();
                if (query && !this.isTyping) {
                    this.handleUserQuery(query);
                    this.chatInput.value = "";
                }
            });

            this.messagesContainer.addEventListener("click", (e) => {
                const chip = e.target.closest(".chip-btn");
                if (chip && !this.isTyping) {
                    const query = chip.getAttribute("data-query") || chip.innerText;
                    this.handleUserQuery(query);
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.isOpen) {
                    this.toggleWindow(false);
                }
            });
        }

        toggleWindow(forceState) {
            this.isOpen = typeof forceState === "boolean" ? forceState : !this.isOpen;
            if (this.isOpen) {
                this.chatWindow.classList.remove("hidden");
                this.chatWindow.setAttribute("aria-hidden", "false");
                this.triggerBtn.classList.add("active");
                setTimeout(() => this.chatInput.focus(), 200);
            } else {
                this.chatWindow.classList.add("hidden");
                this.chatWindow.setAttribute("aria-hidden", "true");
                this.triggerBtn.classList.remove("active");
            }
        }

        clearChat() {
            this.messagesContainer.innerHTML = `
                <div class="chat-msg bot-msg">
                    <div class="msg-avatar"><i class="fa-solid fa-brain"></i></div>
                    <div class="msg-bubble">
                        Chat reset! Ask me anything about Shreyan's **projects**, **skills**, **SIH 2026**, **internship**, or **contact info**.
                    </div>
                </div>
                <div class="quick-chips-container" id="quick-chips">
                    <button class="chip-btn" data-query="⚡ Flagship AI Platform">⚡ Flagship AI Platform</button>
                    <button class="chip-btn" data-query="🏗️ AetherMind Genesis">🏗️ AetherMind Genesis</button>
                    <button class="chip-btn" data-query="🏆 SIH 2026 Hackathon">🏆 SIH 2026</button>
                    <button class="chip-btn" data-query="🛠️ Tech Stack">🛠️ Tech Stack</button>
                </div>
            `;
        }

        handleUserQuery(userQuery) {
            this.appendMessage(userQuery, "user");
            this.showTypingIndicator();
            this.isTyping = true;

            setTimeout(() => {
                this.hideTypingIndicator();
                const matched = this.findBestMatch(userQuery);
                this.appendMessage(matched.response, "bot", matched.chips);
                this.isTyping = false;
            }, 600);
        }

        findBestMatch(query) {
            const cleanQuery = query.toLowerCase().replace(/[^\w\s]/gi, "");

            for (const item of KNOWLEDGE_BASE) {
                for (const intent of item.intents) {
                    if (cleanQuery.includes(intent.toLowerCase())) {
                        return item;
                    }
                }
            }

            return FALLBACK_RESPONSE;
        }

        showTypingIndicator() {
            const typingDiv = document.createElement("div");
            typingDiv.id = "ai-typing-indicator";
            typingDiv.className = "chat-msg bot-msg typing";
            typingDiv.innerHTML = `
                <div class="msg-avatar"><i class="fa-solid fa-brain"></i></div>
                <div class="msg-bubble typing-dots">
                    <span></span><span></span><span></span>
                </div>
            `;
            this.messagesContainer.appendChild(typingDiv);
            this.scrollToBottom();
        }

        hideTypingIndicator() {
            const typingDiv = document.getElementById("ai-typing-indicator");
            if (typingDiv) {
                typingDiv.remove();
            }
        }

        appendMessage(content, sender, chips = []) {
            const existingChips = this.messagesContainer.querySelectorAll(".quick-chips-container");
            existingChips.forEach(c => c.remove());

            const msgDiv = document.createElement("div");
            msgDiv.className = `chat-msg ${sender}-msg`;

            const formattedHtml = this.parseMarkdown(content);

            if (sender === "user") {
                msgDiv.innerHTML = `<div class="msg-bubble">${this.escapeHTML(content)}</div>`;
            } else {
                msgDiv.innerHTML = `
                    <div class="msg-avatar"><i class="fa-solid fa-brain"></i></div>
                    <div class="msg-bubble">${formattedHtml}</div>
                `;
            }

            this.messagesContainer.appendChild(msgDiv);

            if (chips && chips.length > 0) {
                const chipsDiv = document.createElement("div");
                chipsDiv.className = "quick-chips-container";
                chips.forEach(chipText => {
                    const btn = document.createElement("button");
                    btn.className = "chip-btn";
                    btn.setAttribute("data-query", chipText);
                    btn.innerText = chipText;
                    chipsDiv.appendChild(btn);
                });
                this.messagesContainer.appendChild(chipsDiv);
            }

            this.scrollToBottom();
        }

        parseMarkdown(text) {
            let html = text
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                .replace(/\n/g, "<br>");
            return html;
        }

        escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }

        scrollToBottom() {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => new AIChatWidget());
    } else {
        new AIChatWidget();
    }
})();
