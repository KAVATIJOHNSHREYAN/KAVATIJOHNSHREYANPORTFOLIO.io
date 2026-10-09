// Autopilot Walkthrough Tour Script - Continuous Slow Auto-Scroll Recruiter Experience

(function () {
  "use strict";

  let isAutopilotActive = false;
  let isPaused = false;
  let animationFrameId = null;
  let tourStartTime = 0;

  let currentSectionIndex = -1;
  let scrollSpeed = 1.35; // Pixels per frame (~80px/sec continuous smooth motion)

  let controllerBar = null;
  let stepText = null;
  let stepNumber = null;
  let progressBarFill = null;
  let playPauseBtn = null;

  /**
   * Tour Steps Definition covering the complete portfolio in exact chronological order:
   */
  const tourSteps = [
    {
      selector: "#home",
      navHref: "#home",
      title: "Hero Overview",
      message: "Inspecting Kavati John Shreyan's profile, hero overview, and core engineering identity."
    },
    {
      selector: "#about",
      navHref: "#about",
      title: "About & Objectives",
      message: "Reviewing Profile, Computer Science background, and AI & Full-Stack Career Objectives."
    },
    {
      selector: "#education",
      navHref: "#education",
      title: "Education Timeline",
      message: "Reviewing Educational Timeline & B.Tech specialization at KL University."
    },
    {
      selector: "#skills",
      navHref: "#skills",
      title: "Technical Stack",
      message: "Analyzing core technical skills: Python, Java, Next.js, FastAPI, Multimodal AI, RAG, and Cloud."
    },
    {
      selector: "#experience",
      navHref: "#experience",
      title: "Experience & Siemens",
      message: "Examining Data Science Internship at Siemens & enterprise data pipeline architectures."
    },
    {
      selector: "#certifications",
      navHref: "#certifications",
      title: "Certifications",
      message: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals & Siemens Data Science."
    },
    {
      selector: "#hackathons",
      navHref: "#hackathons",
      title: "Hackathons",
      message: "Reviewing Hackathons: AWS 18-Hour Hackathon (KL University) & Smart India Hackathon (SIH 2026)."
    },
    {
      selector: "#projects",
      navHref: "#projects",
      title: "Featured AI Projects",
      message: "Inspecting Flagship AetherMind Multi-Modal AI, AetherMind Genesis, SRTO, Attendance Calc, & EDU."
    },
    {
      selector: "#services",
      navHref: "#services",
      title: "Technical Services",
      message: "Reviewing technical expertise across AI Solutions, Data Analysis, Full-Stack, & REST APIs."
    },
    {
      selector: "#contact",
      navHref: "#contact",
      title: "Contact & Connect",
      message: "Reaching Contact section, email details, direct message form, and social profiles."
    }
  ];

  function createControllerBar() {
    if (document.getElementById("ap-controller-bar")) return;

    controllerBar = document.createElement("div");
    controllerBar.id = "ap-controller-bar";
    controllerBar.innerHTML = `
      <div class="ap-header">
        <div class="ap-title">
          <i class="fa-solid fa-circle-play text-orange"></i>
          <span>Recruiter Continuous Tour</span>
        </div>
        <div class="ap-controls">
          <button class="ap-btn-icon" id="ap-btn-pause" title="Pause / Play Tour">
            <i class="fa-solid fa-pause"></i>
          </button>
          <div class="ap-step-num" id="ap-step-num">Section 1 of ${tourSteps.length}</div>
          <button class="ap-btn-minimize" id="ap-btn-minimize" title="Minimize / Hide Controller">
            <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
          </button>
        </div>
      </div>
      <div class="ap-body" id="ap-step-text">Starting continuous recruiter auto-scroll...</div>
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

    document.body.appendChild(controllerBar);

    stepText = document.getElementById("ap-step-text");
    stepNumber = document.getElementById("ap-step-num");
    progressBarFill = document.getElementById("ap-progress-fill");
    playPauseBtn = document.getElementById("ap-btn-pause");

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

    if (playPauseBtn) {
      playPauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePause();
      });
    }

    document.getElementById("ap-btn-stop").addEventListener("click", (e) => {
      e.stopPropagation();
      stopAutopilot(true);
    });
  }

  function togglePause() {
    isPaused = !isPaused;
    if (playPauseBtn) {
      if (isPaused) {
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        playPauseBtn.title = "Resume Tour";
        if (typeof window.showToast === "function") {
          window.showToast("Autopilot tour paused", "info");
        }
      } else {
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        playPauseBtn.title = "Pause Tour";
        if (typeof window.showToast === "function") {
          window.showToast("Autopilot tour resumed", "info");
        }
      }
    }
  }

  function updateMessage(text) {
    if (stepText) {
      stepText.textContent = text;
    }
  }

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

  function updateActiveSection() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const progressPercent = Math.min(100, Math.max(0, (currentY / maxScroll) * 100));

    if (progressBarFill) {
      progressBarFill.style.width = `${progressPercent}%`;
    }

    let activeIdx = 0;
    for (let i = 0; i < tourSteps.length; i++) {
      const el = document.querySelector(tourSteps[i].selector);
      if (el) {
        const top = el.offsetTop - 140;
        if (currentY >= top) {
          activeIdx = i;
        }
      }
    }

    if (activeIdx !== currentSectionIndex) {
      currentSectionIndex = activeIdx;
      const step = tourSteps[activeIdx];

      if (stepNumber) {
        stepNumber.textContent = `Section ${activeIdx + 1} of ${tourSteps.length}`;
      }
      if (stepText) {
        stepText.textContent = step.message;
      }
      highlightSection(step.selector, step.navHref);
    }
  }

  function scrollLoop() {
    if (!isAutopilotActive) return;

    if (!isPaused) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.pageYOffset || document.documentElement.scrollTop;

      if (currentY >= maxScroll - 4) {
        // Reached end of portfolio page smoothly
        finishTour();
        return;
      }

      // Continuous smooth scroll increment
      window.scrollBy(0, scrollSpeed);
      updateActiveSection();
    }

    animationFrameId = requestAnimationFrame(scrollLoop);
  }

  function setTourButtonsRunning(running) {
    const heroBtn = document.getElementById("btn-hero-autopilot");
    const navBtn = document.querySelector(".btn-nav-ap");

    if (running) {
      if (heroBtn) {
        heroBtn.disabled = true;
        heroBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Autopilot Active...`;
        heroBtn.style.opacity = "0.85";
      }
      if (navBtn) {
        navBtn.disabled = true;
        navBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Active...`;
        navBtn.style.opacity = "0.85";
      }
    } else {
      if (heroBtn) {
        heroBtn.disabled = false;
        heroBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Autopilot Tour`;
        heroBtn.style.opacity = "1";
      }
      if (navBtn) {
        navBtn.disabled = false;
        navBtn.innerHTML = `<i class="fa-solid fa-plane-departure"></i> Tour`;
        navBtn.style.opacity = "1";
      }
    }
  }

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

  async function runTour() {
    if (isAutopilotActive) return;

    createControllerBar();
    isAutopilotActive = true;
    isPaused = false;
    currentSectionIndex = -1;
    tourStartTime = Date.now();

    if (playPauseBtn) {
      playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      playPauseBtn.title = "Pause Tour";
    }

    setTourButtonsRunning(true);
    controllerBar.classList.add("active");

    await waitForPreloader();
    if (!isAutopilotActive) return;

    // Start continuous requestAnimationFrame scroll loop
    scrollLoop();
  }

  function finishTour() {
    stopAutopilot(false);

    // Smoothly scroll back to top hero
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof window.showToast === "function") {
      window.showToast("Continuous recruiter walkthrough complete!", "success");
    }
  }

  function stopAutopilot(fromUserGesture = false) {
    isAutopilotActive = false;
    isPaused = false;

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (lastHighlighted) {
      lastHighlighted.classList.remove("ap-highlight-section");
    }

    if (controllerBar) {
      controllerBar.classList.remove("active");
    }

    setTourButtonsRunning(false);

    if (fromUserGesture && typeof window.showToast === "function") {
      window.showToast("Autopilot tour stopped.", "info");
    }
  }

  function setupOverrideHandlers() {
    const handleOverride = (e) => {
      if (!isAutopilotActive) return;

      // Ignore user inputs during initial 1500ms launch period
      if (Date.now() - tourStartTime < 1500) {
        return;
      }

      // Ignore clicks inside controller bar or trigger buttons
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
      if (!isAutopilotActive) return;
      if (Date.now() - tourStartTime < 1500) return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Escape"].includes(e.key)) {
        stopAutopilot(true);
      }
    }, { passive: true });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (isAutopilotActive && Date.now() - tourStartTime >= 1500) {
          stopAutopilot(true);
        }
      });
    });
  }

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
