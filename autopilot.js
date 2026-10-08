// Autopilot Walkthrough Tour Script - Robust Smooth Recruiter Flow

(function () {
  "use strict";

  let isAutopilotActive = false;
  let currentStepIndex = 0;
  let activeTimeouts = [];
  let tourStartTime = 0;

  // DOM elements created dynamically
  let controllerBar = null;
  let stepText = null;
  let stepNumber = null;
  let progressBarFill = null;

  /**
   * Tour Steps Definition covering the complete portfolio in order:
   */
  const tourSteps = [
    {
      selector: "#home",
      navHref: "#home",
      message: "Inspecting Kavati John Shreyan's profile, hero overview, and core engineering identity.",
      duration: 4000
    },
    {
      selector: "#about",
      navHref: "#about",
      message: "Reviewing Profile, Computer Science background, and AI & Full-Stack Career Objectives.",
      duration: 4500
    },
    {
      selector: "#education",
      navHref: "#education",
      message: "Reviewing Educational Timeline & B.Tech specialization at KL University.",
      duration: 4000
    },
    {
      selector: "#skills",
      navHref: "#skills",
      message: "Analyzing core technical skills: Python, Java, Next.js, FastAPI, Multimodal AI, RAG, and Cloud.",
      duration: 4500
    },
    {
      selector: "#experience",
      navHref: "#experience",
      message: "Examining Data Science Internship at Siemens & enterprise data pipeline architectures.",
      duration: 4500
    },
    {
      selector: "#certifications",
      navHref: "#certifications",
      message: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals & Siemens Data Science.",
      duration: 4000
    },
    {
      selector: "#hackathons",
      navHref: "#hackathons",
      message: "Reviewing Smart India Hackathon (SIH) 2026 18-hour sprint & full-stack prototypes.",
      duration: 4500
    },
    {
      selector: "#projects",
      navHref: "#projects",
      message: "Inspecting Flagship AetherMind Multi-Modal AI, AetherMind Genesis, SRTO, Attendance Calc, & EDU.",
      duration: 5500
    },
    {
      selector: "#services",
      navHref: "#services",
      message: "Reviewing technical expertise across AI Solutions, Data Analysis, Full-Stack, & REST APIs.",
      duration: 4000
    },
    {
      selector: "#contact",
      navHref: "#contact",
      message: "Reaching Contact section, email details, direct message form, and social profiles.",
      duration: 4500
    }
  ];

  function delay(ms) {
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, ms);
      activeTimeouts.push(timeout);
    });
  }

  // Smooth scroll helper using window.scrollTo behavior smooth
  function scrollToElement(selector) {
    return new Promise((resolve) => {
      const target = document.querySelector(selector);
      if (!target) return resolve();

      const headerOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });

      // Allow 1.2s for smooth scroll animation to complete
      setTimeout(resolve, 1200);
    });
  }

  function createControllerBar() {
    if (document.getElementById("ap-controller-bar")) return;

    controllerBar = document.createElement("div");
    controllerBar.id = "ap-controller-bar";
    controllerBar.innerHTML = `
      <div class="ap-header">
        <div class="ap-title">
          <i class="fa-solid fa-circle-play text-orange"></i>
          <span>Recruiter Smooth Autopilot</span>
        </div>
        <div class="ap-controls">
          <div class="ap-step-num" id="ap-step-num">Step 1 of ${tourSteps.length}</div>
          <button class="ap-btn-minimize" id="ap-btn-minimize" title="Minimize / Hide Controller">
            <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
          </button>
        </div>
      </div>
      <div class="ap-body" id="ap-step-text">Starting recruiter walkthrough...</div>
      <div class="ap-footer">
        <div class="ap-progress-track">
          <div class="ap-progress-fill" id="ap-progress-fill"></div>
        </div>
        <button class="ap-btn-stop" id="ap-btn-stop">
          <i class="fa-solid fa-circle-stop"></i>
          <span>Stop Autopilot</span>
        </button>
      </div>
    `;

    document.body.appendChild(controllerBar);

    stepText = document.getElementById("ap-step-text");
    stepNumber = document.getElementById("ap-step-num");
    progressBarFill = document.getElementById("ap-progress-fill");

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

    document.getElementById("ap-btn-stop").addEventListener("click", (e) => {
      e.stopPropagation();
      stopAutopilot(true);
    });
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
    tourStartTime = Date.now();
    setTourButtonsRunning(true);

    controllerBar.classList.add("active");

    await waitForPreloader();
    if (!isAutopilotActive) return;

    for (let i = 0; i < tourSteps.length; i++) {
      if (!isAutopilotActive) break;

      currentStepIndex = i;
      const step = tourSteps[i];

      if (stepNumber) stepNumber.textContent = `Step ${i + 1} of ${tourSteps.length}`;
      updateMessage(step.message);
      highlightSection(step.selector, step.navHref);

      const percent = ((i + 1) / tourSteps.length) * 100;
      if (progressBarFill) progressBarFill.style.width = `${percent}%`;

      // Smooth scroll to target section
      await scrollToElement(step.selector);
      if (!isAutopilotActive) break;

      // Dwell at section for recruiter to read
      await delay(step.duration);
    }

    if (isAutopilotActive) {
      finishTour();
    }
  }

  function finishTour() {
    stopAutopilot(false);

    // Scroll back smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof window.showToast === "function") {
      window.showToast("Recruiter smooth walkthrough complete!", "success");
    }
  }

  function stopAutopilot(fromUserGesture = false) {
    isAutopilotActive = false;

    activeTimeouts.forEach(clearTimeout);
    activeTimeouts = [];

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

      // Ignore user input during the first 1200ms of launching tour to prevent accidental cancellation
      if (Date.now() - tourStartTime < 1200) {
        return;
      }

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
      if (!isAutopilotActive) return;
      if (Date.now() - tourStartTime < 1200) return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Escape"].includes(e.key)) {
        stopAutopilot(true);
      }
    }, { passive: true });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (isAutopilotActive && Date.now() - tourStartTime >= 1200) {
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
