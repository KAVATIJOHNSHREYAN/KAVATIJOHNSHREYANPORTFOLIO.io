/**
 * ==========================================================================
 * kjs PORTFOLIO AUTOPILOT V2.0 – TRUE FULL-PAGE CONTINUOUS SCROLL ENGINE
 * 2.5-MINUTE RECRUITER WALKTHROUGH WITH NEW TAB OPENING FOR ALL LINKS
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

  // Exact profile links configuration
  const EXTERNAL_LINKS = {
    linkedin: "https://www.linkedin.com/in/kavati-john-shreyan-956a35366",
    github: "https://github.com/KAVATIJOHNSHREYAN",
    resume: "./resume.html"
  };

  // ==========================================================================
  // 2. SECTION CONFIGURATION & METADATA
  // ==========================================================================
  const sectionsConfig = [
    {
      id: "home",
      selector: "#home",
      navHref: "#home",
      title: "Hero Overview",
      speech: "Welcome to Kavati John Shreyan's portfolio. Reviewing hero overview and engineering background."
    },
    {
      id: "about",
      selector: "#about",
      navHref: "#about",
      title: "About & Objectives",
      speech: "Reviewing Computer Science background and AI specialization at KL University."
    },
    {
      id: "education",
      selector: "#education",
      navHref: "#education",
      title: "Education Timeline",
      speech: "Examining educational timeline and academic coursework in Computational Intelligence."
    },
    {
      id: "skills",
      selector: "#skills",
      navHref: "#skills",
      title: "Technical Stack",
      speech: "Analyzing core technical stack including Python, FastAPI, Multimodal AI, RAG, and Cloud."
    },
    {
      id: "experience",
      selector: "#experience",
      navHref: "#experience",
      title: "Siemens Internship",
      speech: "Inspecting Data Science virtual internship at Siemens and enterprise data pipelines."
    },
    {
      id: "certifications",
      selector: "#certifications",
      navHref: "#certifications",
      title: "Certifications",
      speech: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals and Siemens Data Science."
    },
    {
      id: "hackathons",
      selector: "#hackathons",
      navHref: "#hackathons",
      title: "18-Hour Hackathons",
      speech: "Reviewing 18-hour continuous hackathons at KL University: AWS Cloud Hackathon and SIH 2026."
    },
    {
      id: "projects",
      selector: "#projects",
      navHref: "#projects",
      title: "Featured AI Projects",
      speech: "Exploring 5 production AI platforms including AetherMind Multi-Modal AI, Genesis, SRTO, Attendance Calc, and EDU."
    },
    {
      id: "services",
      selector: "#services",
      navHref: "#services",
      title: "Technical Services",
      speech: "Reviewing enterprise service capabilities across AI Engineering, Full-Stack Web, and Data Analysis."
    },
    {
      id: "contact",
      selector: "#contact",
      navHref: "#contact",
      title: "Contact & Connect",
      speech: "Reaching Contact section and official communication channels. Walkthrough complete."
    }
  ];

  // ==========================================================================
  // 3. VIRTUAL CURSOR ENGINE & LINK PREVIEW POPUP
  // ==========================================================================
  class CursorEngine {
    constructor() {
      this.cursorEl = null;
      this.previewEl = null;
      this.currentX = window.innerWidth / 2;
      this.currentY = window.innerHeight / 2;
      this.animId = null;
      this.init();
    }

    init() {
      if (!document.getElementById("ap-virtual-cursor")) {
        this.cursorEl = document.createElement("div");
        this.cursorEl.id = "ap-virtual-cursor";
        this.cursorEl.innerHTML = `
          <div class="ap-cursor-pointer"></div>
          <div class="ap-cursor-ring"></div>
        `;
        document.body.appendChild(this.cursorEl);
      } else {
        this.cursorEl = document.getElementById("ap-virtual-cursor");
      }

      if (!document.getElementById("ap-link-preview-popup")) {
        this.previewEl = document.createElement("div");
        this.previewEl.id = "ap-link-preview-popup";
        document.body.appendChild(this.previewEl);
      } else {
        this.previewEl = document.getElementById("ap-link-preview-popup");
      }
    }

    show() {
      if (this.cursorEl) this.cursorEl.classList.add("active");
    }

    hide() {
      if (this.cursorEl) this.cursorEl.classList.remove("active");
      this.hideLinkPreview();
    }

    showLinkPreview(text, href, iconClass = "fa-solid fa-arrow-up-right-from-square") {
      if (!this.previewEl) return;
      this.previewEl.innerHTML = `
        <a href="${href}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;display:flex;align-items:center;gap:8px;">
          <i class="${iconClass}"></i>
          <span>${text}</span>
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;opacity:0.8;margin-left:4px;"></i>
        </a>
      `;
      this.previewEl.style.left = `${Math.min(window.innerWidth - 240, this.currentX + 15)}px`;
      this.previewEl.style.top = `${Math.max(20, this.currentY - 35)}px`;
      this.previewEl.classList.add("active");
    }

    hideLinkPreview() {
      if (this.previewEl) this.previewEl.classList.remove("active");
    }

    moveTo(x, y, duration = 500) {
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

    async moveOverElement(element, duration = 550) {
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

    async microJitter(count = 2, distance = 4) {
      for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * distance * 2;
        const offsetY = (Math.random() - 0.5) * distance * 2;
        await this.moveTo(this.currentX + offsetX, this.currentY + offsetY, 180);
        await delay(120);
      }
    }
  }

  // ==========================================================================
  // 4. VOICE NARRATOR
  // ==========================================================================
  class VoiceNarrator {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.isMuted = false;
      this.lastSpokenId = null;
    }

    speak(id, text) {
      if (!this.synth || this.isMuted || !text || this.lastSpokenId === id) return;
      this.stop();
      this.lastSpokenId = id;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";

      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))
      );
      if (preferredVoice) utterance.voice = preferredVoice;

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
  // 5. TRUE FULL-PAGE CONTINUOUS SCROLL TOUR ENGINE (2.5 MINUTE SPEED)
  // ==========================================================================
  class ContinuousAutopilotTour {
    constructor() {
      this.isActive = false;
      this.isPaused = false;
      this.isCardDwelling = false;

      this.baseSpeed = 2.65; // pixels per frame at 60fps (~160px/sec)
      this.currentSpeed = this.baseSpeed;
      this.animFrameId = null;

      this.cursorEngine = new CursorEngine();
      this.narrator = new VoiceNarrator();

      this.currentSectionIdx = -1;
      this.inspectedElements = new Set();

      this.startTime = 0;
      this.timerInterval = null;
      this.elapsedSeconds = 0;
      this.totalEstimatedSec = 150; // 2.5 Minutes Target Duration

      this.controllerBar = null;
      this.stepText = null;
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
    }

    createDashboardController() {
      if (document.getElementById("ap-controller-bar")) return;

      this.controllerBar = document.createElement("div");
      this.controllerBar.id = "ap-controller-bar";
      this.controllerBar.innerHTML = `
        <div class="ap-header">
          <div class="ap-title-badge">
            <i class="fa-solid fa-bolt text-orange"></i>
            <span>2.5-Min Continuous Walkthrough</span>
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
          <div class="ap-status-msg" id="ap-step-text">Continuous 2.5-min pixel-by-pixel recruiter inspection...</div>
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
          <button class="ap-ctrl-btn" id="ap-btn-skip" title="Stop Tour">
            Stop <i class="fa-solid fa-square"></i>
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

      // Buttons
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
        this.scrollToSectionIndex(this.currentSectionIdx - 1);
      });

      document.getElementById("ap-btn-next").addEventListener("click", (e) => {
        e.stopPropagation();
        this.scrollToSectionIndex(this.currentSectionIdx + 1);
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
          <h3>Full-Page Recruiter Review Complete!</h3>
          <p>
            ✔ 2.5-Minute continuous pixel-by-pixel portfolio walkthrough completed.<br>
            Click any button below to open in a new tab:
          </p>
          <div class="ap-summary-actions" style="flex-wrap: wrap; gap: 10px; justify-content: center;">
            <a href="${EXTERNAL_LINKS.resume}" target="_blank" rel="noopener noreferrer" class="ap-summary-btn primary" style="text-decoration:none;">
              <i class="fa-solid fa-file-pdf"></i> View Resume PDF <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px;margin-left:4px;"></i>
            </a>
            <a href="${EXTERNAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer" class="ap-summary-btn secondary" style="text-decoration:none;">
              <i class="fa-brands fa-linkedin"></i> LinkedIn Profile <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px;margin-left:4px;"></i>
            </a>
            <a href="${EXTERNAL_LINKS.github}" target="_blank" rel="noopener noreferrer" class="ap-summary-btn secondary" style="text-decoration:none;">
              <i class="fa-brands fa-github"></i> GitHub Profile <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px;margin-left:4px;"></i>
            </a>
          </div>
          <div class="ap-summary-actions" style="margin-top: 10px; width: 100%;">
            <button class="ap-summary-btn primary" id="ap-summary-restart">
              <i class="fa-solid fa-rotate-left"></i> Start Walkthrough Again
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

        const remaining = Math.max(0, this.totalEstimatedSec - this.elapsedSeconds);

        if (this.timerElapsedEl) this.timerElapsedEl.textContent = formatTime(this.elapsedSeconds);
        if (this.timerRemainingEl) this.timerRemainingEl.textContent = formatTime(remaining);
      }, 1000);
    }

    stopTimer() {
      clearInterval(this.timerInterval);
    }

    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.btnPause.innerHTML = `<i class="fa-solid fa-play"></i> <span id="ap-pause-label">Resume</span>`;
        if (typeof window.showToast === "function") window.showToast("Autopilot tour paused", "info");
      } else {
        this.btnPause.innerHTML = `<i class="fa-solid fa-pause"></i> <span id="ap-pause-label">Pause</span>`;
        if (typeof window.showToast === "function") window.showToast("Autopilot tour resumed", "info");
      }
    }

    scrollToSectionIndex(index) {
      if (index < 0 || index >= sectionsConfig.length) return;
      const targetSec = sectionsConfig[index];
      const el = document.querySelector(targetSec.selector);
      if (el) {
        const top = Math.max(0, el.offsetTop - 90);
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    }

    updateSectionAndProgress() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const progressPercent = Math.min(100, Math.max(0, Math.round((currentY / maxScroll) * 100)));

      if (this.progressPercentEl) this.progressPercentEl.textContent = `${progressPercent}%`;
      if (this.progressBarFill) this.progressBarFill.style.width = `${progressPercent}%`;

      let activeIdx = 0;
      for (let i = 0; i < sectionsConfig.length; i++) {
        const el = document.querySelector(sectionsConfig[i].selector);
        if (el) {
          const top = el.offsetTop - 140;
          if (currentY >= top) {
            activeIdx = i;
          }
        }
      }

      if (activeIdx !== this.currentSectionIdx) {
        this.currentSectionIdx = activeIdx;
        const activeSec = sectionsConfig[activeIdx];

        if (this.viewingTag) this.viewingTag.textContent = activeSec.title;

        // Navbar highlight
        document.querySelectorAll(".nav-link").forEach((link) => {
          if (link.getAttribute("href") === activeSec.navHref) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Section Glow
        if (this.lastHighlightedSection) {
          this.lastHighlightedSection.classList.remove("ap-highlight-section");
        }
        const targetEl = document.querySelector(activeSec.selector);
        if (targetEl) {
          targetEl.classList.add("ap-highlight-section");
          this.lastHighlightedSection = targetEl;
        }

        // Voice Narration
        this.narrator.speak(activeSec.id, activeSec.speech);
      }
    }

    async scanAndDwellInspectableCards() {
      if (this.isCardDwelling || this.isPaused || !this.isActive) return;

      const viewportTop = window.pageYOffset;
      const viewportMiddle = viewportTop + window.innerHeight * 0.55;

      const selectorStr = `.project-card, .cert-card, .hackathon-card, .skills-category-card, .service-card, .timeline-item, .exp-card, .btn-hero-cv, .sidebar-links a, .hero-actions a`;
      const candidates = Array.from(document.querySelectorAll(selectorStr));

      for (let i = 0; i < candidates.length; i++) {
        const el = candidates[i];
        if (this.inspectedElements.has(el)) continue;

        const rect = el.getBoundingClientRect();
        const elementTopDoc = rect.top + viewportTop;
        const elementBottomDoc = rect.bottom + viewportTop;

        if (elementTopDoc <= viewportMiddle && elementBottomDoc >= viewportTop + 80) {
          this.inspectedElements.add(el);
          this.isCardDwelling = true;

          el.classList.add("ap-hover-focus");
          await this.cursorEngine.moveOverElement(el, 450);
          this.cursorEngine.setHovering(true);

          // Check if element has a link (LinkedIn, GitHub, Resume, Live Demo)
          const link = el.tagName === "A" ? el : el.querySelector("a");
          if (link) {
            let href = link.getAttribute("href") || "#";
            if (href === "#") href = EXTERNAL_LINKS.resume;

            let linkText = "Open in New Tab";
            let iconClass = "fa-solid fa-arrow-up-right-from-square";

            if (href.includes("linkedin")) {
              href = EXTERNAL_LINKS.linkedin;
              linkText = "Open LinkedIn Profile in New Tab";
              iconClass = "fa-brands fa-linkedin";
            } else if (href.includes("github")) {
              href = EXTERNAL_LINKS.github;
              linkText = "Open GitHub Profile in New Tab";
              iconClass = "fa-brands fa-github";
            } else if (href.includes("resume") || href.includes("pdf")) {
              href = EXTERNAL_LINKS.resume;
              linkText = "Open Resume PDF in New Tab";
              iconClass = "fa-solid fa-file-pdf";
            } else if (href.includes("streamlit") || href.includes("app")) {
              linkText = "Open Live Demo App in New Tab";
              iconClass = "fa-solid fa-globe";
            }

            this.cursorEngine.showLinkPreview(linkText, href, iconClass);
          }

          if (this.stepText) {
            const titleEl = el.querySelector("h3, h4, .project-title, .exp-role");
            const titleText = titleEl ? titleEl.textContent.trim() : "element";
            this.stepText.textContent = `Inspecting ${titleText}...`;
          }

          // Dwell pause (~800ms) for 2.5-min total walkthrough pace
          await this.cursorEngine.microJitter(2, 3);
          await delay(500);

          this.cursorEngine.hideLinkPreview();
          el.classList.remove("ap-hover-focus");
          this.cursorEngine.setHovering(false);
          this.isCardDwelling = false;
          break;
        }
      }
    }

    scrollLoop() {
      if (!this.isActive) return;

      if (!this.isPaused && !this.isCardDwelling) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentY = window.pageYOffset || document.documentElement.scrollTop;

        if (currentY >= maxScroll - 3) {
          this.finishTour();
          return;
        }

        // Smooth pixel-by-pixel continuous scroll increment (2.5-Min Speed)
        window.scrollBy(0, this.currentSpeed);

        this.updateSectionAndProgress();
        this.scanAndDwellInspectableCards();
      }

      this.animFrameId = requestAnimationFrame(this.scrollLoop.bind(this));
    }

    startTour() {
      if (this.isActive) return;

      this.isActive = true;
      this.isPaused = false;
      this.isCardDwelling = false;
      this.inspectedElements.clear();
      this.currentSectionIdx = -1;

      this.controllerBar.classList.add("active");
      this.cursorEngine.show();
      this.setTourButtonsRunning(true);
      this.startTimer();

      // Start continuous requestAnimationFrame loop
      this.scrollLoop();
    }

    finishTour() {
      this.stopTour(false);

      const overlay = document.getElementById("ap-summary-overlay");
      if (overlay) overlay.classList.add("active");

      if (typeof window.showToast === "function") {
        window.showToast("2.5-Min Recruiter Walkthrough Complete!", "success");
      }
    }

    stopTour(fromUser = false) {
      this.isActive = false;
      this.isPaused = false;
      this.isCardDwelling = false;

      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }

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
        window.showToast("Autopilot walkthrough stopped.", "info");
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

    setupUserOverrideHandlers() {
      const handleOverride = (e) => {
        if (!this.isActive) return;

        if (
          e.target.closest("#ap-controller-bar") ||
          e.target.closest("#ap-summary-overlay") ||
          e.target.closest("#ap-link-preview-popup") ||
          e.target.closest(".btn-nav-ap") ||
          e.target.closest("#btn-hero-autopilot")
        ) {
          return;
        }

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
  // 6. INITIALIZATION & GLOBAL EXPORTS
  // ==========================================================================
  let autopilotInstance = null;

  function init() {
    autopilotInstance = new ContinuousAutopilotTour();
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
