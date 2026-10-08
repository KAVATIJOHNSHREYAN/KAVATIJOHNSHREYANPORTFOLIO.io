// Autopilot Recruiter Walkthrough Script - Continuous Slow Scroll Engine

(function () {
  "use strict";

  let isAutopilotActive = false;
  let scrollAnimFrame = null;
  let tourStartTime = 0;

  let controllerBar = null;
  let stepText = null;
  let stepNumber = null;
  let progressBarFill = null;

  const sections = [
    { id: "home", title: "01 // HERO & IDENTITY", message: "Inspecting Kavati John Shreyan's profile, hero overview, and core engineering identity." },
    { id: "about", title: "02 // PROFILE & OBJECTIVE", message: "Reviewing Profile, Computer Science background, and AI & Full-Stack Career Objectives." },
    { id: "education", title: "03 // ACADEMICS", message: "Reviewing Educational Timeline & B.Tech specialization at KL University." },
    { id: "skills", title: "04 // SKILLS MATRIX", message: "Analyzing core technical skills: Python, Java, Next.js, FastAPI, Multimodal AI, RAG, and Cloud." },
    { id: "experience", title: "05 // WORK EXPERIENCE", message: "Examining Data Science Internship at Siemens & enterprise data pipeline architectures." },
    { id: "certifications", title: "06 // CREDENTIALS", message: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals & Siemens Data Science." },
    { id: "hackathons", title: "07 // HACKATHONS", message: "Reviewing Smart India Hackathon (SIH) 2026 18-hour sprint & full-stack prototypes." },
    { id: "projects", title: "08 // FEATURED PROJECTS", message: "Inspecting Flagship AetherMind Multi-Modal AI, AetherMind Genesis, SRTO, Attendance Calc, & EDU." },
    { id: "services", title: "09 // EXPERTISE", message: "Reviewing technical expertise across AI Solutions, Data Analysis, Full-Stack, & REST APIs." },
    { id: "contact", title: "10 // CONTACT & CONNECT", message: "Reaching Contact section, email details, direct message form, and social profiles." }
  ];

  function createControllerBar() {
    if (document.getElementById("ap-controller-bar")) return;

    controllerBar = document.createElement("div");
    controllerBar.id = "ap-controller-bar";
    controllerBar.innerHTML = `
      <div class="ap-header">
        <div class="ap-title">
          <i class="fa-solid fa-circle-play text-orange"></i>
          <span>Continuous Recruiter Autopilot</span>
        </div>
        <div class="ap-controls">
          <div class="ap-step-num" id="ap-step-num">Section 1 of ${sections.length}</div>
          <button class="ap-btn-minimize" id="ap-btn-minimize" title="Minimize / Hide Controller">
            <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
          </button>
        </div>
      </div>
      <div class="ap-body" id="ap-step-text">Starting recruiter continuous scroll...</div>
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

  // Continuous Scroll Loop Engine
  async function startContinuousScroll() {
    if (isAutopilotActive) return;

    createControllerBar();
    isAutopilotActive = true;
    tourStartTime = Date.now();
    setTourButtonsRunning(true);
    controllerBar.classList.add("active");

    await waitForPreloader();
    if (!isAutopilotActive) return;

    // Reset scroll to top
    window.scrollTo(0, 0);

    let currentY = 0;
    const speed = 1.15; // Smooth recruiter reading speed (pixels per frame)
    let lastSectionIndex = -1;

    function step() {
      if (!isAutopilotActive) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      currentY += speed;
      window.scrollTo(0, currentY);

      // Update Progress Bar
      const progressPercent = Math.min((currentY / maxScroll) * 100, 100);
      if (progressBarFill) {
        progressBarFill.style.width = `${progressPercent}%`;
      }

      // Track Current Section in Viewport
      const viewportMid = currentY + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const targetEl = document.getElementById(sections[i].id);
        if (targetEl && targetEl.offsetTop <= viewportMid) {
          if (lastSectionIndex !== i) {
            lastSectionIndex = i;
            if (stepNumber) stepNumber.textContent = `Section ${i + 1} of ${sections.length}`;
            if (stepText) stepText.textContent = sections[i].message;

            // Highlight nav link
            document.querySelectorAll('.nav-link').forEach(link => {
              if (link.getAttribute('href') === `#${sections[i].id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
          break;
        }
      }

      if (currentY < maxScroll && isAutopilotActive) {
        scrollAnimFrame = requestAnimationFrame(step);
      } else {
        finishTour();
      }
    }

    scrollAnimFrame = requestAnimationFrame(step);
  }

  function finishTour() {
    stopAutopilot(false);
    if (typeof window.showToast === "function") {
      window.showToast("Recruiter continuous walkthrough complete!", "success");
    }
  }

  function stopAutopilot(fromUserGesture = false) {
    isAutopilotActive = false;

    if (scrollAnimFrame) {
      cancelAnimationFrame(scrollAnimFrame);
      scrollAnimFrame = null;
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

      // Ignore user interactions for the first 2000ms after tour launch
      if (Date.now() - tourStartTime < 2000) {
        return;
      }

      // Allow clicking inside controller bar
      if (e.target.closest("#ap-controller-bar")) {
        return;
      }

      stopAutopilot(true);
    };

    window.addEventListener("wheel", handleOverride, { passive: true });
    window.addEventListener("touchmove", handleOverride, { passive: true });
    window.addEventListener("mousedown", handleOverride, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (!isAutopilotActive) return;
      if (Date.now() - tourStartTime < 2000) return;
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Escape"].includes(e.key)) {
        stopAutopilot(true);
      }
    }, { passive: true });
  }

  function init() {
    setupOverrideHandlers();

    window.startAutopilotTour = function () {
      if (isAutopilotActive) return;
      startContinuousScroll().catch((err) => {
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
