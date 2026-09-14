// Autopilot Walkthrough Tour Script - Enhanced Async Implementation

(function () {
  let isAutopilotActive = false;
  let currentStepIndex = 0;
  let activeTimeouts = [];

  // DOM elements created dynamically
  let controllerBar = null;
  let stepText = null;
  let stepNumber = null;
  let progressBarFill = null;
  let finishOverlay = null;
  let skipFloatingBtn = null;

  // External Links Queue (to open at the end)
  const outboundLinks = [
    "https://www.linkedin.com/in/kavati-john-shreyan-956a35366",
    "https://github.com/KAVATIJOHNSHREYAN",
    "./resume.html"
  ];

  /**
   * Tour Steps Definition in Order:
   * 1. Hero (#home)
   * 2. About (#about)
   * 3. Skills (#skills)
   * 4. Experience (#experience)
   * 5. Certificates (#certifications)
   * 6. Projects (#projects)
   * 7. Hackathons (#hackathons)
   * 8. Expertise (#services)
   * 9. Contact (#contact)
   */
  const tourSteps = [
    {
      selector: "#home",
      navHref: "#home",
      message: "Welcome! Let's explore Kavati John Shreyan's professional portfolio. Starting our autopilot tour...",
      duration: 5000,
      action: async () => {
        window.scrollTo(0, 0);
      }
    },
    {
      selector: "#about",
      navHref: "#about",
      message: "Profile & Career Objective: Computer Science student specializing in AI, Computational Intelligence, and Full-Stack Development.",
      duration: 5000
    },
    {
      selector: "#skills",
      navHref: "#skills",
      message: "Core Technical & Soft Skills: Python, Java, Next.js, FastAPI, React, AI Models, Databases, and Problem Solving.",
      duration: 5000
    },
    {
      selector: "#experience",
      navHref: "#experience",
      message: "Work Experience: Data Science Intern at Siemens, building data cleaning pipelines and evaluation models.",
      duration: 5000
    },
    {
      selector: "#certifications",
      navHref: "#certifications",
      message: "Certifications & Credentials: Microsoft Certified Azure Fundamentals and Siemens Data Science Internship.",
      duration: 5000
    },
    {
      selector: "#projects",
      navHref: "#projects",
      message: "Featured Projects: SAMRAT AETHERMIND V2, SRTO, Attendance Calculator, and AetherMind EDU.",
      duration: 5500,
      action: async () => {
        const aiBtn = document.querySelector('.filter-btn[data-filter="ai"]');
        if (aiBtn) aiBtn.click();
        await delay(1800);
        if (!isAutopilotActive) return;

        updateMessage("Exploring Web & Full-Stack platform solutions...");
        const webBtn = document.querySelector('.filter-btn[data-filter="web"]');
        if (webBtn) webBtn.click();
        await delay(1800);
        if (!isAutopilotActive) return;

        updateMessage("Displaying complete featured project catalog.");
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.click();
      }
    },
    {
      selector: "#hackathons",
      navHref: "#hackathons",
      message: "Hackathon Achievements: Smart India Hackathon (SIH) 2026 18-hour sprint & Full Stack prototype sprints.",
      duration: 5000
    },
    {
      selector: "#services",
      navHref: "#services",
      message: "Areas of Expertise: Full-Stack AI Engineering, Data Analytics, REST API Systems, and Cloud Architectures.",
      duration: 5000
    },
    {
      selector: "#contact",
      navHref: "#contact",
      message: "Get in Touch: Direct contact form, social channels, and collaborative opportunities.",
      duration: 5000
    }
  ];

  // Helper Promise for smooth pauses
  function delay(ms) {
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, ms);
      activeTimeouts.push(timeout);
    });
  }

  // Custom Continuous Smooth Scrolling Engine
  function smoothScrollTo(targetY, minDuration = 2500) {
    return new Promise((resolve) => {
      const startY = window.pageYOffset;
      const difference = targetY - startY;
      const distance = Math.abs(difference);
      // Calculate dynamic duration based on distance so scrolling feels naturally smooth and steady
      const duration = Math.max(minDuration, Math.min(Math.floor(distance * 2.2), 4000));
      const startTime = performance.now();

      function step(currentTime) {
        if (!isAutopilotActive) return resolve();

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + difference * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }

  // Create Controller Bar (Top-Right position with minimize/hide capability)
  function createControllerBar() {
    if (document.getElementById("ap-controller-bar")) return;

    controllerBar = document.createElement("div");
    controllerBar.id = "ap-controller-bar";
    controllerBar.innerHTML = `
      <div class="ap-header">
        <div class="ap-title">
          <i class="fa-solid fa-circle-play"></i>
          <span>Autopilot Active</span>
        </div>
        <div class="ap-controls">
          <div class="ap-step-num" id="ap-step-num">Step 1 of ${tourSteps.length}</div>
          <button class="ap-btn-minimize" id="ap-btn-minimize" title="Minimize / Hide Controller">
            <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
          </button>
        </div>
      </div>
      <div class="ap-body" id="ap-step-text">Loading tour...</div>
      <div class="ap-footer">
        <div class="ap-progress-track">
          <div class="ap-progress-fill" id="ap-progress-fill"></div>
        </div>
        <button class="ap-btn-stop" id="ap-btn-stop">
          <i class="fa-solid fa-circle-stop"></i>
          <span>Stop Tour</span>
        </button>
      </div>
    `;

    document.body.appendChild(controllerBar);

    stepText = document.getElementById("ap-step-text");
    stepNumber = document.getElementById("ap-step-num");
    progressBarFill = document.getElementById("ap-progress-fill");

    // Minimize / Expand toggle handler
    const minBtn = document.getElementById("ap-btn-minimize");
    const minIcon = document.getElementById("ap-minimize-icon");
    if (minBtn) {
      minBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        controllerBar.classList.toggle("minimized");
        if (controllerBar.classList.contains("minimized")) {
          minIcon.className = "fa-solid fa-chevron-up";
          minBtn.title = "Expand Controller";
        } else {
          minIcon.className = "fa-solid fa-chevron-down";
          minBtn.title = "Minimize / Hide Controller";
        }
      });
    }

    document.getElementById("ap-btn-stop").addEventListener("click", () => {
      stopAutopilot(true);
    });
  }



  // Create Tour Finish Overlay
  function createFinishOverlay() {
    if (document.getElementById("ap-finish-overlay")) return;

    finishOverlay = document.createElement("div");
    finishOverlay.id = "ap-finish-overlay";
    finishOverlay.className = "ap-finish-overlay";
    finishOverlay.innerHTML = `
      <div class="ap-finish-card">
        <h3>Tour Complete!</h3>
        <p>Opening Kavati John Shreyan's professional socials (LinkedIn, GitHub) and Resume details in new tabs...</p>
        <div class="ap-finish-chimes">
          <div class="ap-chime-icon"><i class="fa-brands fa-linkedin-in"></i></div>
          <div class="ap-chime-icon"><i class="fa-brands fa-github"></i></div>
          <div class="ap-chime-icon"><i class="fa-solid fa-file-invoice"></i></div>
        </div>
      </div>
    `;

    document.body.appendChild(finishOverlay);
  }

  function updateMessage(text) {
    if (stepText) {
      stepText.textContent = text;
    }
  }

  // Highlight Section & Navigation Link
  let lastHighlighted = null;
  function highlightSection(selector, navHref) {
    if (lastHighlighted) {
      lastHighlighted.classList.remove("ap-highlight-section");
    }

    const target = document.querySelector(selector);
    if (target) {
      target.classList.add("ap-highlight-section");
      lastHighlighted = target;
    }

    // Highlight active navigation link
    if (navHref) {
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === navHref) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  // Toggle UI Tour Button States (running vs default)
  function setTourButtonsRunning(running) {
    const heroBtn = document.getElementById("btn-hero-autopilot");
    const navBtn = document.querySelector(".btn-nav-ap");

    if (running) {
      if (heroBtn) {
        heroBtn.disabled = true;
        heroBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Tour Running...`;
        heroBtn.style.opacity = "0.85";
        heroBtn.style.cursor = "not-allowed";
      }
      if (navBtn) {
        navBtn.disabled = true;
        navBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running...`;
        navBtn.style.opacity = "0.85";
        navBtn.style.cursor = "not-allowed";
      }
    } else {
      if (heroBtn) {
        heroBtn.disabled = false;
        heroBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Autopilot Tour`;
        heroBtn.style.opacity = "1";
        heroBtn.style.cursor = "pointer";
      }
      if (navBtn) {
        navBtn.disabled = false;
        navBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Tour`;
        navBtn.style.opacity = "1";
        navBtn.style.cursor = "pointer";
      }
    }
  }

  // Wait for Intro Preloader if active
  function waitForPreloader() {
    return new Promise((resolve) => {
      const checkPreloader = setInterval(() => {
        const preloader = document.getElementById("preloader");
        const preloadingActive = document.body.classList.contains("preloading");

        if (!preloadingActive || !preloader || preloader.style.display === "none") {
          clearInterval(checkPreloader);
          resolve();
        }
      }, 100);
    });
  }

  // Core Async Sequencer
  async function runTour() {
    if (isAutopilotActive) return;

    createControllerBar();
    createFinishOverlay();

    isAutopilotActive = true;
    setTourButtonsRunning(true);

    controllerBar.classList.add("active");

    // Wait until preloader finishes completely if active
    await waitForPreloader();
    if (!isAutopilotActive) return;

    for (let i = 0; i < tourSteps.length; i++) {
      if (!isAutopilotActive) break;

      currentStepIndex = i;
      const step = tourSteps[i];

      // Update UI displays
      stepNumber.textContent = `Step ${i + 1} of ${tourSteps.length}`;
      updateMessage(step.message);
      highlightSection(step.selector, step.navHref);

      const percent = ((i + 1) / tourSteps.length) * 100;
      progressBarFill.style.width = `${percent}%`;

      // Smooth scroll to target section
      const targetEl = document.querySelector(step.selector);
      if (targetEl) {
        const targetY = step.selector === "#home" ? 0 : targetEl.offsetTop - 90;
        await smoothScrollTo(targetY, 1200);
      }

      if (!isAutopilotActive) break;

      // Run optional action hook
      if (step.action) {
        await step.action();
      }

      if (!isAutopilotActive) break;

      // Dwell delay (4-6 seconds per section)
      await delay(step.duration);
    }

    if (isAutopilotActive) {
      await finishTour();
    }
  }

  // Complete Tour Procedure
  async function finishTour() {
    controllerBar.classList.remove("active");

    if (lastHighlighted) {
      lastHighlighted.classList.remove("ap-highlight-section");
    }

    // Launch completion overlay & scroll back smoothly to Hero
    finishOverlay.classList.add("active");
    await smoothScrollTo(0, 1500);

    setTimeout(() => {
      outboundLinks.forEach((link) => {
        window.open(link, "_blank");
      });

      setTimeout(() => {
        finishOverlay.classList.remove("active");
        stopAutopilot(false);
        showToast("Walkthrough complete! Links opened.", "success");
      }, 1500);
    }, 2000);
  }

  // Cancel/Exit Autopilot
  function stopAutopilot(fromUserGesture = false) {
    isAutopilotActive = false;

    // Clear all pending timeouts
    activeTimeouts.forEach(clearTimeout);
    activeTimeouts = [];

    // Remove section highlights
    if (lastHighlighted) {
      lastHighlighted.classList.remove("ap-highlight-section");
    }

    // Hide control widgets
    if (controllerBar) controllerBar.classList.remove("active");
    if (finishOverlay) finishOverlay.classList.remove("active");

    // Restore original button states & enable manual interactions
    setTourButtonsRunning(false);

    if (fromUserGesture) {
      showToast("Autopilot tour stopped.", "info");
    }
  }

  // Show Toast messaging
  function showToast(message, type) {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
    } else {
      const container = document.getElementById("toast-container");
      if (!container) return;
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 500);
      }, 3000);
    }
  }

  // Setup user cancellation override handlers (manual scroll, keypress, click links)
  function setupOverrideHandlers() {
    const handleOverride = (e) => {
      if (!isAutopilotActive) return;

      // Ignore clicks inside controller or trigger buttons
      if (
        e.target.closest("#ap-controller-bar") ||
        e.target.closest(".btn-nav-ap") ||
        e.target.closest("#btn-hero-autopilot")
      ) {
        return;
      }

      stopAutopilot(true);
    };

    window.addEventListener("wheel", handleOverride, { passive: true });
    window.addEventListener("touchmove", handleOverride, { passive: true });
    window.addEventListener("mousedown", handleOverride, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(e.key)) {
        if (!isAutopilotActive) return;
        stopAutopilot(true);
      }
    }, { passive: true });

    // Cancel if user clicks navigation links during tour
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (isAutopilotActive) stopAutopilot(true);
      });
    });
  }

  // Bootstrap Autopilot Setup
  function init() {
    setupOverrideHandlers();

    window.startAutopilotTour = function () {
      if (isAutopilotActive) return;
      runTour().catch((err) => {
        console.error("Autopilot Tour Error: ", err);
        stopAutopilot(false);
      });
    };

    window.stopAutopilotTour = function () {
      stopAutopilot(true);
    };

    // Auto-trigger if URL contains ?autopilot=true
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
