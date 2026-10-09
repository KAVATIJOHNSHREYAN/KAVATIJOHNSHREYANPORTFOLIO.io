/**
 * ==========================================================================
 * kjs PORTFOLIO AUTOPILOT V2.0 – PREMIUM RECRUITER EXPERIENCE ENHANCEMENT
 * Enterprise-Grade Recruiter Walkthrough Engine
 * ==========================================================================
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. EASING UTILITIES
  // ==========================================================================
  const Easing = {
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutExpo: (t) =>
      t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // ==========================================================================
  // 2. TOUR STEPS DEFINITION (Section inspection timing & descriptions)
  // ==========================================================================
  const tourSteps = [
    {
      id: "home",
      selector: "#home",
      navHref: "#home",
      title: "Hero Overview",
      inspectionTime: 4000, // 4 sec
      message: "Inspecting Kavati John Shreyan's profile, hero overview, and core engineering identity.",
      speech: "Welcome to Kavati John Shreyan's portfolio. Examining hero overview and engineering background."
    },
    {
      id: "about",
      selector: "#about",
      navHref: "#about",
      title: "About & Objectives",
      inspectionTime: 5000, // 5 sec
      message: "Reviewing Profile, Computer Science background, and AI & Full-Stack Career Objectives.",
      speech: "Reviewing Computer Science background and AI specialization at KL University."
    },
    {
      id: "education",
      selector: "#education",
      navHref: "#education",
      title: "Education Timeline",
      inspectionTime: 5000, // 5 sec
      message: "Reviewing Educational Timeline & B.Tech specialization at KL University.",
      speech: "Examining educational timeline and academic coursework in Computational Intelligence."
    },
    {
      id: "skills",
      selector: "#skills",
      navHref: "#skills",
      title: "Technical Stack",
      inspectionTime: 6000, // 6 sec
      message: "Analyzing core technical skills: Python, Java, Next.js, FastAPI, Multimodal AI, RAG, and Cloud.",
      speech: "Analyzing core technical stack including Python, FastAPI, Multimodal AI, RAG, and Cloud Architectures."
    },
    {
      id: "experience",
      selector: "#experience",
      navHref: "#experience",
      title: "Siemens Internship",
      inspectionTime: 6000, // 6 sec
      message: "Examining Data Science Virtual Internship at Siemens & enterprise data pipeline architectures.",
      speech: "Inspecting Data Science virtual internship at Siemens and data pipeline architectures."
    },
    {
      id: "certifications",
      selector: "#certifications",
      navHref: "#certifications",
      title: "Certifications",
      inspectionTime: 4000, // 4 sec
      message: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals & Siemens Data Science.",
      speech: "Reviewing verified industry credentials: Microsoft Certified Azure Fundamentals and Siemens Data Science."
    },
    {
      id: "hackathons",
      selector: "#hackathons",
      navHref: "#hackathons",
      title: "18-Hour Hackathons",
      inspectionTime: 5000, // 5 sec
      message: "Reviewing Hackathons: AWS 18-Hour Hackathon (KL University) & Smart India Hackathon (SIH 2026).",
      speech: "Reviewing 18-hour continuous hackathons hosted at KL University: AWS Cloud Hackathon and Smart India Hackathon 2026."
    },
    {
      id: "projects",
      selector: "#projects",
      navHref: "#projects",
      title: "Featured AI Projects",
      inspectionTime: 10000, // 10 sec (Per-project interactive card inspection)
      message: "Inspecting Flagship AetherMind Multi-Modal AI, AetherMind Genesis, SRTO, Attendance Calc, & EDU.",
      speech: "Exploring 5 production AI projects featuring AetherMind Multi-Modal AI, Genesis, Resource Optimizer, Attendance Calculator, and EDU."
    },
    {
      id: "services",
      selector: "#services",
      navHref: "#services",
      title: "Technical Services",
      inspectionTime: 5000, // 5 sec
      message: "Reviewing technical expertise across AI Solutions, Data Analysis, Full-Stack, & REST APIs.",
      speech: "Reviewing enterprise service capabilities across AI Engineering, Full-Stack Web Development, and Data Analysis."
    },
    {
      id: "contact",
      selector: "#contact",
      navHref: "#contact",
      title: "Contact & Connect",
      inspectionTime: 5000, // 5 sec
      message: "Reaching Contact section, email details, direct message form, and social profiles.",
      speech: "Reaching Contact section and official communication channels. Portfolio walkthrough complete."
    }
  ];

  // Total estimated tour duration calculation
  const TOTAL_ESTIMATED_DURATION_SEC = Math.ceil(
    tourSteps.reduce((acc, step) => acc + step.inspectionTime / 1000 + 2.5, 0)
  );

  // ==========================================================================
  // 3. VIRTUAL CURSOR ENGINE
  // ==========================================================================
  class CursorEngine {
    constructor() {
      this.cursorEl = null;
      this.currentX = window.innerWidth / 2;
      this.currentY = window.innerHeight / 2;
      this.targetX = this.currentX;
      this.targetY = this.currentY;
      this.animId = null;
      this.init();
    }

    init() {
      if (document.getElementById("ap-virtual-cursor")) return;
      this.cursorEl = document.createElement("div");
      this.cursorEl.id = "ap-virtual-cursor";
      this.cursorEl.innerHTML = `
        <div class="ap-cursor-pointer"></div>
        <div class="ap-cursor-ring"></div>
      `;
      document.body.appendChild(this.cursorEl);
    }

    show() {
      if (this.cursorEl) this.cursorEl.classList.add("active");
    }

    hide() {
      if (this.cursorEl) this.cursorEl.classList.remove("active");
    }

    moveTo(x, y, duration = 800) {
      return new Promise((resolve) => {
        const startX = this.currentX;
        const startY = this.currentY;
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = Easing.easeInOutCubic(progress);

          this.currentX = startX + (x - startX) * eased;
          this.currentY = startY + (y - startY) * eased;

          if (this.cursorEl) {
            this.cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
          }

          if (progress < 1) {
            this.animId = requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        if (this.animId) cancelAnimationFrame(this.animId);
        this.animId = requestAnimationFrame(animate);
      });
    }

    async moveOverElement(element, duration = 900) {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      await this.moveTo(targetX, targetY, duration);
    }

    setHovering(isHovering) {
      if (!this.cursorEl) return;
      if (isHovering) {
        this.cursorEl.classList.add("hovering");
      } else {
        this.cursorEl.classList.remove("hovering");
      }
    }

    async microJitter(count = 3, distance = 4) {
      for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * distance * 2;
        const offsetY = (Math.random() - 0.5) * distance * 2;
        await this.moveTo(this.currentX + offsetX, this.currentY + offsetY, 300);
        await delay(200);
      }
    }
  }

  // ==========================================================================
  // 4. EASED SMOOTH SCROLL ENGINE (Cinematic acceleration & deceleration)
  // ==========================================================================
  class ScrollEngine {
    constructor() {
      this.isScrolling = false;
      this.animId = null;
    }

    scrollToTarget(targetY, duration = 1800, easingFunc = Easing.easeInOutExpo) {
      return new Promise((resolve) => {
        this.isScrolling = true;
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const distance = targetY - startY;
        const startTime = performance.now();

        const step = (now) => {
          if (!this.isScrolling) return resolve(false);

          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = easingFunc(progress);

          window.scrollTo(0, startY + distance * eased);

          if (progress < 1) {
            this.animId = requestAnimationFrame(step);
          } else {
            this.isScrolling = false;
            resolve(true);
          }
        };

        if (this.animId) cancelAnimationFrame(this.animId);
        this.animId = requestAnimationFrame(step);
      });
    }

    stop() {
      this.isScrolling = false;
      if (this.animId) cancelAnimationFrame(this.animId);
    }
  }

  // ==========================================================================
  // 5. VOICE NARRATOR (Web Speech API)
  // ==========================================================================
  class VoiceNarrator {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.isMuted = false;
      this.currentUtterance = null;
    }

    speak(text) {
      if (!this.synth || this.isMuted || !text) return;
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";

      // Select preferred voice if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    }

    stop() {
      if (this.synth && this.synth.speaking) {
        this.synth.cancel();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) this.stop();
      return this.isMuted;
    }
  }

  // ==========================================================================
  // 6. MAIN AUTOPILOT CONTROLLER CLASS
  // ==========================================================================
  class AutopilotTour {
    constructor() {
      this.isActive = false;
      this.isPaused = false;
      this.currentStepIdx = 0;
      this.startTime = 0;

      this.scrollEngine = new ScrollEngine();
      this.cursorEngine = new CursorEngine();
      this.narrator = new VoiceNarrator();

      this.timerInterval = null;
      this.elapsedSeconds = 0;

      this.controllerBar = null;
      this.stepText = null;
      this.stepNumber = null;
      this.progressBarFill = null;
      this.viewingTag = null;
      this.timerElapsedEl = null;
      this.timerRemainingEl = null;
      this.progressPercentEl = null;
      this.btnPause = null;
      this.btnMute = null;

      this.lastHighlightedSection = null;
    }

    init() {
      this.createDashboardController();
      this.createSummaryOverlay();
      this.setupUserOverrideHandlers();
      this.setupObserver();
    }

    createDashboardController() {
      if (document.getElementById("ap-controller-bar")) return;

      this.controllerBar = document.createElement("div");
      this.controllerBar.id = "ap-controller-bar";
      this.controllerBar.innerHTML = `
        <div class="ap-header">
          <div class="ap-title-badge">
            <i class="fa-solid fa-circle-play"></i>
            <span>Recruiter Tour V2.0</span>
          </div>
          <div class="ap-top-actions">
            <button class="ap-btn-icon" id="ap-btn-mute" title="Mute / Unmute Voice Narration">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="ap-btn-icon" id="ap-btn-minimize" title="Minimize / Expand Controller">
              <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
            </button>
          </div>
        </div>

        <div class="ap-metrics-grid">
          <div class="ap-metric-card">
            <span class="ap-metric-label">Elapsed</span>
            <span class="ap-metric-value" id="ap-metric-elapsed">00:00</span>
          </div>
          <div class="ap-metric-card">
            <span class="ap-metric-label">Remaining</span>
            <span class="ap-metric-value" id="ap-metric-remaining">02:30</span>
          </div>
          <div class="ap-metric-card">
            <span class="ap-metric-label">Progress</span>
            <span class="ap-metric-value" id="ap-metric-progress">0%</span>
          </div>
        </div>

        <div class="ap-dashboard-body">
          <div class="ap-viewing-tag" id="ap-viewing-tag">
            <i class="fa-solid fa-eye"></i> Viewing: <span id="ap-current-section-title">Hero Overview</span>
          </div>
          <div class="ap-status-msg" id="ap-step-text">Starting recruiter walkthrough...</div>
        </div>

        <div class="ap-nav-controls">
          <button class="ap-ctrl-btn" id="ap-btn-prev" title="Previous Section">
            <i class="fa-solid fa-backward-step"></i> Prev
          </button>
          <button class="ap-ctrl-btn btn-play-pause" id="ap-btn-pause" title="Pause / Play Tour">
            <i class="fa-solid fa-pause"></i> <span id="ap-pause-label">Pause</span>
          </button>
          <button class="ap-ctrl-btn" id="ap-btn-next" title="Next Section">
            Next <i class="fa-solid fa-forward-step"></i>
          </button>
          <button class="ap-ctrl-btn" id="ap-btn-skip" title="Skip Tour">
            Skip <i class="fa-solid fa-forward"></i>
          </button>
        </div>

        <div class="ap-footer">
          <div class="ap-progress-track">
            <div class="ap-progress-fill" id="ap-progress-fill"></div>
          </div>
          <button class="ap-btn-stop" id="ap-btn-stop">
            <i class="fa-solid fa-circle-stop"></i>
            <span>Stop</span>
          </button>
        </div>
      `;

      document.body.appendChild(this.controllerBar);

      this.stepText = document.getElementById("ap-step-text");
      this.progressBarFill = document.getElementById("ap-progress-fill");
      this.timerElapsedEl = document.getElementById("ap-metric-elapsed");
      this.timerRemainingEl = document.getElementById("ap-metric-remaining");
      this.progressPercentEl = document.getElementById("ap-metric-progress");
      this.viewingTag = document.getElementById("ap-current-section-title");
      this.btnPause = document.getElementById("ap-btn-pause");
      this.btnMute = document.getElementById("ap-btn-mute");

      // Controller Event Listeners
      document.getElementById("ap-btn-minimize").addEventListener("click", (e) => {
        e.stopPropagation();
        this.controllerBar.classList.toggle("minimized");
        const icon = document.getElementById("ap-minimize-icon");
        if (this.controllerBar.classList.contains("minimized")) {
          icon.className = "fa-solid fa-chevron-up";
        } else {
          icon.className = "fa-solid fa-chevron-down";
        }
      });

      this.btnPause.addEventListener("click", (e) => {
        e.stopPropagation();
        this.togglePause();
      });

      this.btnMute.addEventListener("click", (e) => {
        e.stopPropagation();
        const isMuted = this.narrator.toggleMute();
        this.btnMute.innerHTML = isMuted
          ? `<i class="fa-solid fa-volume-xmark"></i>`
          : `<i class="fa-solid fa-volume-high"></i>`;
        this.btnMute.classList.toggle("active", isMuted);
      });

      document.getElementById("ap-btn-prev").addEventListener("click", (e) => {
        e.stopPropagation();
        this.jumpStep(this.currentStepIdx - 1);
      });

      document.getElementById("ap-btn-next").addEventListener("click", (e) => {
        e.stopPropagation();
        this.jumpStep(this.currentStepIdx + 1);
      });

      document.getElementById("ap-btn-skip").addEventListener("click", (e) => {
        e.stopPropagation();
        this.stopTour(true);
      });

      document.getElementById("ap-btn-stop").addEventListener("click", (e) => {
        e.stopPropagation();
        this.stopTour(true);
      });
    }

    createSummaryOverlay() {
      if (document.getElementById("ap-summary-overlay")) return;
      const overlay = document.createElement("div");
      overlay.id = "ap-summary-overlay";
      overlay.innerHTML = `
        <div class="ap-summary-card">
          <div class="ap-summary-icon">
            <i class="fa-solid fa-award"></i>
          </div>
          <h3>Portfolio Review Complete!</h3>
          <p>
            ✔ Thank You For Visiting Kavati John Shreyan's Portfolio.<br>
            Looking Forward To Connecting & Exploring High-Impact AI Engineering Opportunities!
          </p>
          <div class="ap-summary-actions">
            <button class="ap-summary-btn primary" id="ap-summary-restart">
              <i class="fa-solid fa-rotate-left"></i> Start Tour Again
            </button>
            <button class="ap-summary-btn secondary" id="ap-summary-close">
              <i class="fa-solid fa-xmark"></i> Close Summary
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById("ap-summary-restart").addEventListener("click", () => {
        overlay.classList.remove("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => this.startTour(), 800);
      });

      document.getElementById("ap-summary-close").addEventListener("click", () => {
        overlay.classList.remove("active");
      });
    }

    startTimer() {
      this.startTime = Date.now();
      this.elapsedSeconds = 0;
      clearInterval(this.timerInterval);

      this.timerInterval = setInterval(() => {
        if (!this.isActive || this.isPaused) return;

        this.elapsedSeconds++;
        const remaining = Math.max(0, TOTAL_ESTIMATED_DURATION_SEC - this.elapsedSeconds);

        if (this.timerElapsedEl) this.timerElapsedEl.textContent = formatTime(this.elapsedSeconds);
        if (this.timerRemainingEl) this.timerRemainingEl.textContent = formatTime(remaining);
      }, 1000);
    }

    stopTimer() {
      clearInterval(this.timerInterval);
    }

    togglePause() {
      this.isPaused = !this.isPaused;
      const label = document.getElementById("ap-pause-label");

      if (this.isPaused) {
        this.btnPause.innerHTML = `<i class="fa-solid fa-play"></i> <span id="ap-pause-label">Resume</span>`;
        if (typeof window.showToast === "function") window.showToast("Autopilot tour paused", "info");
      } else {
        this.btnPause.innerHTML = `<i class="fa-solid fa-pause"></i> <span id="ap-pause-label">Pause</span>`;
        if (typeof window.showToast === "function") window.showToast("Autopilot tour resumed", "info");
      }
    }

    highlightSection(step) {
      if (this.lastHighlightedSection) {
        this.lastHighlightedSection.classList.remove("ap-highlight-section");
      }

      const target = document.querySelector(step.selector);
      if (target) {
        target.classList.add("ap-highlight-section");
        this.lastHighlightedSection = target;
      }

      if (step.navHref) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          if (link.getAttribute("href") === step.navHref) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    }

    async runDeepInspection(step) {
      const sectionEl = document.querySelector(step.selector);
      if (!sectionEl) return;

      // Deep Item Inspections by Section ID:
      if (step.id === "projects") {
        const cards = sectionEl.querySelectorAll(".project-card");
        for (let i = 0; i < cards.length; i++) {
          if (!this.isActive || this.isPaused) break;
          const card = cards[i];

          card.classList.add("ap-hover-focus");
          await this.cursorEngine.moveOverElement(card, 800);
          this.cursorEngine.setHovering(true);

          await delay(1800);

          // Hover demo link if available
          const demoBtn = card.querySelector("a");
          if (demoBtn) {
            await this.cursorEngine.moveOverElement(demoBtn, 500);
            await delay(700);
          }

          card.classList.remove("ap-hover-focus");
          this.cursorEngine.setHovering(false);
        }
      } else if (step.id === "skills") {
        const categories = sectionEl.querySelectorAll(".skills-category-card, .skill-badge");
        for (let i = 0; i < Math.min(6, categories.length); i++) {
          if (!this.isActive || this.isPaused) break;
          const cat = categories[i];
          cat.classList.add("ap-hover-focus");
          await this.cursorEngine.moveOverElement(cat, 600);
          this.cursorEngine.setHovering(true);
          await delay(800);
          cat.classList.remove("ap-hover-focus");
          this.cursorEngine.setHovering(false);
        }
      } else if (step.id === "hackathons") {
        const hCards = sectionEl.querySelectorAll(".hackathon-card");
        for (let i = 0; i < hCards.length; i++) {
          if (!this.isActive || this.isPaused) break;
          const hCard = hCards[i];
          hCard.classList.add("ap-hover-focus");
          await this.cursorEngine.moveOverElement(hCard, 700);
          this.cursorEngine.setHovering(true);
          await delay(1400);
          hCard.classList.remove("ap-hover-focus");
          this.cursorEngine.setHovering(false);
        }
      } else if (step.id === "certifications") {
        const certCards = sectionEl.querySelectorAll(".cert-card");
        for (let i = 0; i < certCards.length; i++) {
          if (!this.isActive || this.isPaused) break;
          const cCard = certCards[i];
          cCard.classList.add("ap-hover-focus");
          await this.cursorEngine.moveOverElement(cCard, 700);
          this.cursorEngine.setHovering(true);
          await delay(1200);
          cCard.classList.remove("ap-hover-focus");
          this.cursorEngine.setHovering(false);
        }
      } else {
        // Generic section element inspection with micro reading jitters
        await this.cursorEngine.moveOverElement(sectionEl, 900);
        await this.cursorEngine.microJitter(2, 6);
      }
    }

    async jumpStep(index) {
      if (index < 0 || index >= tourSteps.length) return;
      this.currentStepIdx = index;
      await this.executeStep(index);
    }

    async executeStep(index) {
      if (!this.isActive) return;

      const step = tourSteps[index];
      const percent = Math.round(((index + 1) / tourSteps.length) * 100);

      // Update Dashboard Metrics
      if (this.viewingTag) this.viewingTag.textContent = step.title;
      if (this.stepText) this.stepText.textContent = step.message;
      if (this.progressPercentEl) this.progressPercentEl.textContent = `${percent}%`;
      if (this.progressBarFill) this.progressBarFill.style.width = `${percent}%`;

      // Highlight section & nav
      this.highlightSection(step);

      // Speak narration
      this.narrator.speak(step.speech);

      // Calculate smooth target scroll position
      const targetEl = document.querySelector(step.selector);
      if (targetEl) {
        const headerOffset = 90;
        const targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset);

        // Smooth cinematic ease scroll
        await this.scrollEngine.scrollToTarget(targetY, 1400, Easing.easeInOutExpo);
      }

      if (!this.isActive) return;

      // Perform deep inspection of cards/elements inside this section
      await this.runDeepInspection(step);

      // Dwell pause time
      let dwell = step.inspectionTime;
      while (dwell > 0 && this.isActive) {
        if (!this.isPaused) {
          dwell -= 200;
        }
        await delay(200);
      }
    }

    async startTour() {
      if (this.isActive) return;

      this.isActive = true;
      this.isPaused = false;
      this.currentStepIdx = 0;

      this.controllerBar.classList.add("active");
      this.cursorEngine.show();
      this.setTourButtonsRunning(true);
      this.startTimer();

      for (let i = 0; i < tourSteps.length; i++) {
        if (!this.isActive) break;
        this.currentStepIdx = i;
        await this.executeStep(i);
      }

      if (this.isActive) {
        this.finishTour();
      }
    }

    finishTour() {
      this.stopTour(false);

      // Show Summary Card Modal
      const overlay = document.getElementById("ap-summary-overlay");
      if (overlay) overlay.classList.add("active");

      if (typeof window.showToast === "function") {
        window.showToast("Recruiter Walkthrough Complete!", "success");
      }
    }

    stopTour(fromUser = false) {
      this.isActive = false;
      this.isPaused = false;

      this.scrollEngine.stop();
      this.narrator.stop();
      this.cursorEngine.hide();
      this.stopTimer();

      if (this.lastHighlightedSection) {
        this.lastHighlightedSection.classList.remove("ap-highlight-section");
      }

      if (this.controllerBar) {
        this.controllerBar.classList.remove("active");
      }

      this.setTourButtonsRunning(false);

      if (fromUser && typeof window.showToast === "function") {
        window.showToast("Autopilot tour stopped.", "info");
      }
    }

    setTourButtonsRunning(running) {
      const heroBtn = document.getElementById("btn-hero-autopilot");
      const navBtn = document.querySelector(".btn-nav-ap");

      if (running) {
        if (heroBtn) {
          heroBtn.disabled = true;
          heroBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Autopilot Active...`;
        }
        if (navBtn) {
          navBtn.disabled = true;
          navBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Active...`;
        }
      } else {
        if (heroBtn) {
          heroBtn.disabled = false;
          heroBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Autopilot Tour`;
        }
        if (navBtn) {
          navBtn.disabled = false;
          navBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Tour`;
        }
      }
    }

    setupObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!this.isActive) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              const stepIdx = tourSteps.findIndex((s) => s.id === id);
              if (stepIdx !== -1 && stepIdx !== this.currentStepIdx) {
                // Keep section sync precise
              }
            }
          });
        },
        { threshold: 0.4 }
      );

      tourSteps.forEach((step) => {
        const el = document.querySelector(step.selector);
        if (el) observer.observe(el);
      });
    }

    setupUserOverrideHandlers() {
      const handleOverride = (e) => {
        if (!this.isActive) return;

        // Ignore clicks inside controller bar or trigger buttons
        if (
          e.target.closest("#ap-controller-bar") ||
          e.target.closest("#ap-summary-overlay") ||
          e.target.closest(".btn-nav-ap") ||
          e.target.closest("#btn-hero-autopilot")
        ) {
          return;
        }

        // Stop tour on explicit user interaction
        this.stopTour(true);
      };

      window.addEventListener("wheel", handleOverride, { passive: true });
      window.addEventListener("touchmove", handleOverride, { passive: true });
      window.addEventListener("mousedown", handleOverride, { passive: true });
      window.addEventListener("keydown", (e) => {
        if (!this.isActive) return;
        if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Escape"].includes(e.key)) {
          this.stopTour(true);
        }
      }, { passive: true });
    }
  }

  // ==========================================================================
  // 7. INITIALIZATION & GLOBAL EXPORTS
  // ==========================================================================
  let autopilotInstance = null;

  function init() {
    autopilotInstance = new AutopilotTour();
    autopilotInstance.init();

    window.startAutopilotTour = function () {
      if (autopilotInstance) autopilotInstance.startTour();
    };

    window.stopAutopilotTour = function () {
      if (autopilotInstance) autopilotInstance.stopTour(true);
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("autopilot") === "true") {
      setTimeout(() => {
        window.startAutopilotTour();
      }, 500);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
