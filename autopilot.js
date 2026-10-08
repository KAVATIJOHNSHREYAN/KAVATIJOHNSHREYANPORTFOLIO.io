// Autopilot Recruiter Walkthrough Script - Continuous Smooth Scroll Implementation

(function () {
  "use strict";

  let isAutopilotActive = false;
  let animationFrameId = null;
  let controllerBar = null;
  let stepText = null;
  let stepNumber = null;
  let progressBarFill = null;

  // Key Portfolio Sections for Recruiter Tracking
  const sections = [
    { id: "home", title: "01 // HERO & IDENTITY", message: "Inspecting Kavati John Shreyan's profile, hero overview, and core engineering identity." },
    { id: "about", title: "02 // PROFILE & OBJECTIVE", message: "Reviewing About Me, Computer Science background, and AI Career Objectives." },
    { id: "education", title: "03 // ACADEMICS", message: "Reviewing Educational Timeline & B.Tech specialization at KL University." },
    { id: "skills", title: "04 // SKILLS MATRIX", message: "Analyzing core technical skills: Python, Java, Next.js, FastAPI, Multimodal AI, RAG, and Cloud." },
    { id: "experience", title: "05 // WORK EXPERIENCE", message: "Examining Data Science Internship at Siemens & data pipeline architectures." },
    { id: "certifications", title: "06 // CREDENTIALS", message: "Reviewing verified credentials: Microsoft Certified Azure Fundamentals & Siemens Data Science." },
    { id: "hackathons", title: "07 // HACKATHONS", message: "Reviewing Smart India Hackathon (SIH) 2026 18-hour sprint & full-stack prototypes." },
    { id: "projects", title: "08 // FEATURED PROJECTS", message: "Inspecting Flagship AetherMind Multi-Modal AI, AetherMind Genesis, SRTO, Attendance Calc, & EDU." },
    { id: "github-activity", title: "09 // OPEN SOURCE", message: "Reviewing GitHub contributions, open-source repositories, and code metrics." },
    { id: "interests", title: "10 // FOCUS AREAS", message: "Reviewing core areas of interest in AI, LLM Agents, and RAG systems." },
    { id: "services", title: "11 // EXPERTISE", message: "Reviewing technical expertise across AI, Data Science, Full-Stack, and REST APIs." },
    { id: "contact", title: "12 // CONTACT & CONNECT", message: "Reaching Contact section, email details, and professional social profiles." }
  ];

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
          <div class="ap-step-num" id="ap-step-num">Section 1 of ${sections.length}</div>
          <button class="ap-btn-minimize" id="ap-btn-minimize" title="Minimize / Hide Controller">
            <i class="fa-solid fa-chevron-down" id="ap-minimize-icon"></i>
          </button>
        </div>
      </div>
      <div class="ap-body" id="ap-step-text">Starting recruiter smooth walkthrough...</div>
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

    document.getElementById("ap-btn-stop").addEventListener("click", () => {
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

  // Continuous Recruiter Scroll Engine
  async function runContinuousRecruiterScroll() {
    createControllerBar();
    isAutopilotActive = true;
    setTourButtonsRunning(true);
    controllerBar.classList.add("active");

    await waitForPreloader();
    if (!isAutopilotActive) return;

    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await new Promise(r => setTimeout(r, 600));

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const speed = 1.35; // Pixels per frame (Smooth recruiter reading speed)
    let currentPos = window.pageYOffset;
    let currentSectionIndex = 0;

    function step() {
      if (!isAutopilotActive) return;

      currentPos += speed;
      window.scrollTo(0, currentPos);

      // Update progress bar
      const progress = Math.min((currentPos / totalHeight) * 100, 100);
      if (progressBarFill) progressBarFill.style.width = `${progress}%`;

      // Determine current section in view
      const viewportMid = currentPos + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= viewportMid) {
          if (currentSectionIndex !== i) {
            currentSectionIndex = i;
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

      if (currentPos < totalHeight && isAutopilotActive) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        finishAutopilot();
      }
    }

    animationFrameId = requestAnimationFrame(step);
  }

  function finishAutopilot() {
    stopAutopilot(false);
    if (typeof window.showToast === "function") {
      window.showToast("Recruiter smooth walkthrough completed!", "success");
    }
  }

  function stopAutopilot(fromUserGesture = false) {
    isAutopilotActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (controllerBar) {
      controllerBar.classList.remove("active");
    }

    setTourButtonsRunning(false);

    if (fromUserGesture && typeof window.showToast === "function") {
      window.showToast("Autopilot stopped.", "info");
    }
  }

  function setupOverrideHandlers() {
    const handleUserInteraction = (e) => {
      if (!isAutopilotActive) return;

      // Allow clicking buttons inside controller bar without stopping
      if (e.target.closest("#ap-controller-bar")) {
        return;
      }

      stopAutopilot(true);
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("mousedown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (isAutopilotActive && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Escape"].includes(e.key)) {
        stopAutopilot(true);
      }
    }, { passive: true });
  }

  function init() {
    setupOverrideHandlers();

    window.startAutopilotTour = function () {
      if (isAutopilotActive) return;
      runContinuousRecruiterScroll().catch((err) => {
        console.error("Autopilot Error:", err);
        stopAutopilot(false);
      });
    };

    window.stopAutopilotTour = function () {
      stopAutopilot(true);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
