/**
 * Ask AI Shreyan - Interactive Portfolio AI Chat Widget
 * Author: Kavati John Shreyan
 * Description: Client-side NLP & Knowledge Engine powered by structured intent matching.
 */

(function () {
    "use strict";

    // Knowledge Base Data Structure
    const KNOWLEDGE_BASE = [
        {
            intents: ["hi", "hello", "hey", "who are you", "start", "greetings", "help"],
            response: `Hello! 👋 I'm **Shreyan's AI Assistant**. 

I can answer your questions about Shreyan's **projects**, **skills**, **SIH 2026 hackathon experience**, **Siemens internship**, or **how to contact him**. 

What would you like to explore?`,
            chips: ["🚀 Top Projects", "🏆 SIH 2026 Hackathon", "🛠️ Tech Stack", "💼 Siemens Internship"]
        },
        {
            intents: ["project", "projects", "work", "apps", "samrat", "aethermind", "timetable", "optimizer", "attendance"],
            response: `Here are **Shreyan's key projects**:

1. ⚡ **SAMRAT AETHERMIND V2** — Advanced Multi-LLM AI Platform integrating Gemini, OpenAI & Cohere with RAG document QA and voice interactions.
2. 🗓️ **Smart Resource & Timetable Optimizer** — AI-assisted university timetable optimizer with secure RBAC, room scheduling, and institutional analytics.
3. 📊 **KL University Attendance Calculator** — Open-source responsive frontend utility built with React & Next.js.
4. 📚 **AetherMind EDU** — AI-powered personalized learning platform architecture (currently in development).

Would you like more details on a specific project?`,
            chips: ["⚡ SAMRAT AETHERMIND", "🗓️ Timetable Optimizer", "🏆 SIH 2026 Hackathon"]
        },
        {
            intents: ["samrat", "aethermind v2", "llm platform", "multi-llm"],
            response: `⚡ **SAMRAT AETHERMIND V2** is Shreyan's flagship AI project!

• **Tech Stack:** Next.js, TypeScript, FastAPI, Python, SQLite, Zustand, Vercel, Render.
• **Key Features:** Multi-LLM model switching (Gemini, OpenAI, Cohere), Retrieval-Augmented Generation (RAG) for document Q&A, voice interaction, multilingual support, and customized chat sessions.`,
            chips: ["🗓️ Timetable Optimizer", "🛠️ Tech Stack", "📬 Contact Shreyan"]
        },
        {
            intents: ["timetable", "resource optimizer", "optimizer", "smart resource"],
            response: `🗓️ **Smart Resource & Timetable Optimizer**:

• **Tech Stack:** React, TypeScript, FastAPI, Python, SQLite, JWT Authentication.
• **Highlights:** Automates complex academic timetable constraints, role-based access control (RBAC), room & faculty availability tracking, and automated reporting. Deployed on Vercel & Render.`,
            chips: ["⚡ SAMRAT AETHERMIND", "🛠️ Tech Stack", "📜 Resume"]
        },
        {
            intents: ["hackathon", "sih", "smart india hackathon", "sih 2026", "competition", "team"],
            response: `🏆 **Smart India Hackathon (SIH) 2026**:

Shreyan participated in **SIH 2026** as part of a **6-member development team** collaborating on a complex real-world problem statement. 

⏱️ **High-Pressure Execution:** Worked continuously for **18 hours** (6:00 PM to 12:00 PM the following day) under strict deadlines, contributing to core development, rapid decision-making, and full-stack problem-solving.`,
            chips: ["🚀 Top Projects", "💼 Siemens Internship", "📬 Contact Shreyan"]
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
            intents: ["skill", "skills", "tech stack", "languages", "python", "java", "react", "fastapi", "rag", "llm", "frameworks"],
            response: `🛠️ **Shreyan's Technical Stack**:

• **Programming:** Python, Java, JavaScript, TypeScript
• **Artificial Intelligence:** LLMs, RAG, Computational Intelligence, Prompt Engineering, AI Chatbots
• **Web Development:** HTML5, CSS3, React, Next.js, FastAPI, REST APIs, JWT
• **Databases & Cloud:** MySQL, SQLite, Firebase, Google Cloud, Vercel, Render
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
            // Render Widget Elements into DOM
            const widgetContainer = document.createElement("div");
            widgetContainer.id = "ai-chat-root";
            widgetContainer.innerHTML = `
                <!-- Floating Trigger Button -->
                <button id="ai-chat-trigger" class="ai-chat-trigger" aria-label="Open Ask AI Shreyan Chat">
                    <div class="trigger-icon-wrapper">
                        <i class="fa-solid fa-robot trigger-bot-icon"></i>
                        <span class="trigger-pulse-dot"></span>
                    </div>
                    <span class="trigger-label">Ask AI Shreyan</span>
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
                                <h3>Ask AI Shreyan</h3>
                                <p>Interactive Knowledge Engine</p>
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
                            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                            <div class="msg-bubble">
                                Hello! 👋 I'm **Shreyan's AI Assistant**. 
                                <br><br>
                                Ask me anything about Shreyan's **projects**, **skills**, **SIH 2026 hackathon experience**, **Siemens internship**, or **how to contact him**.
                            </div>
                        </div>

                        <!-- Quick Action Chips -->
                        <div class="quick-chips-container" id="quick-chips">
                            <button class="chip-btn" data-query="🚀 Top Projects">🚀 Top Projects</button>
                            <button class="chip-btn" data-query="🏆 SIH 2026 Hackathon">🏆 SIH 2026</button>
                            <button class="chip-btn" data-query="🛠️ Tech Stack">🛠️ Tech Stack</button>
                            <button class="chip-btn" data-query="💼 Siemens Internship">💼 Siemens</button>
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

            // Save DOM references
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

            // Delegate quick chip clicks
            this.messagesContainer.addEventListener("click", (e) => {
                const chip = e.target.closest(".chip-btn");
                if (chip && !this.isTyping) {
                    const query = chip.getAttribute("data-query") || chip.innerText;
                    this.handleUserQuery(query);
                }
            });

            // Close on Escape key
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
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble">
                        Chat reset! Ask me anything about Shreyan's **projects**, **skills**, **SIH 2026**, **internship**, or **contact info**.
                    </div>
                </div>
                <div class="quick-chips-container" id="quick-chips">
                    <button class="chip-btn" data-query="🚀 Top Projects">🚀 Top Projects</button>
                    <button class="chip-btn" data-query="🏆 SIH 2026 Hackathon">🏆 SIH 2026</button>
                    <button class="chip-btn" data-query="🛠️ Tech Stack">🛠️ Tech Stack</button>
                    <button class="chip-btn" data-query="💼 Siemens Internship">💼 Siemens</button>
                </div>
            `;
        }

        handleUserQuery(userQuery) {
            // Append User Message
            this.appendMessage(userQuery, "user");

            // Show Typing Indicator
            this.showTypingIndicator();
            this.isTyping = true;

            // Match intent and generate response with small realistic delay
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
                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
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
            // Remove existing inline chips container to keep conversation clean
            const existingChips = this.messagesContainer.querySelectorAll(".quick-chips-container");
            existingChips.forEach(c => c.remove());

            const msgDiv = document.createElement("div");
            msgDiv.className = `chat-msg ${sender}-msg`;

            const formattedHtml = this.parseMarkdown(content);

            if (sender === "user") {
                msgDiv.innerHTML = `<div class="msg-bubble">${this.escapeHTML(content)}</div>`;
            } else {
                msgDiv.innerHTML = `
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble">${formattedHtml}</div>
                `;
            }

            this.messagesContainer.appendChild(msgDiv);

            // Add Quick Action Chips if provided
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
                // Bold
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                // Links [text](url)
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                // New lines
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

    // Initialize Widget when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => new AIChatWidget());
    } else {
        new AIChatWidget();
    }
})();
