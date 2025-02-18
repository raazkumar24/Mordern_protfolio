document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const menu = document.querySelector(".links");
  const hamburger = document.querySelector(".hamburger");
  const projectsContainer = document.getElementById("projects");
  const dotsContainer = document.getElementById("dots");
  const card = document.querySelector(".contact-details");
  const toggleSwitch = document.getElementById("theme-toggle");

  // Toggle Menu
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Blur Effect on Scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Smooth Scrolling
  document.querySelector(".links").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      document.querySelector(e.target.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    }
  });

  // Adjust Space Between Header & Sections
  function adjustSpacing() {
    const headerHeight = header.offsetHeight;
    document.querySelectorAll(".space").forEach(section => {
      section.style.paddingTop = `${headerHeight}px`;
    });
  }
  adjustSpacing();
  window.addEventListener("resize", adjustSpacing);

  // Scroll to Section
  window.scrollToSection = function () {
    document.querySelector(".about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Project Display & Navigation
  async function displayProjects() {
    const projects = await fetchProjects(); // Fetch from api.js
    projectsContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    projects.forEach((project, index) => {
      projectsContainer.innerHTML += `
        <div class="project">
          <div class="image-container">
            <img src="${project.image || 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514'}" alt="Project Image">
            <div class="icons-overlay">
              <a class="github-icon" href="${project.github || '#'}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a class="external-link" href="${project.preview || '#'}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
            </div>
          </div>
          <div class="content">
            <h3>${project.name}</h3>
            <p>${project.description || "No description available"}</p>
            <div class="tags">${project.tags?.map(tag => `<span class="tag">${tag}</span>`).join("") || ""}</div>
          </div>
        </div>
      `;

      const dot = document.createElement("div");
      dot.classList.add("dot", index === 0 && "active");
      dot.addEventListener("click", () => scrollToProject(index));
      dotsContainer.appendChild(dot);
    });

    projectsContainer.addEventListener("scroll", updateActiveDotOnScroll);
  }

  function scrollToProject(index) {
    document.querySelectorAll(".project")[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  function updateActiveDotOnScroll() {
    let minDistance = Infinity, activeIndex = 0;
    document.querySelectorAll(".project").forEach((project, index) => {
      const distance = Math.abs(project.getBoundingClientRect().left + project.clientWidth / 2 - window.innerWidth / 2);
      if (distance < minDistance) [minDistance, activeIndex] = [distance, index];
    });
    document.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
  }

  displayProjects();

  // Experience & Qualification Toggle
  window.toggleContent = function (section) {
    ["experience", "qualification"].forEach(id => document.getElementById(id).classList.remove("active"));
    ["experienceBtn", "qualificationBtn"].forEach(id => document.getElementById(id).classList.remove("active"));

    document.getElementById(section).classList.add("active");
    document.getElementById(`${section}Btn`).classList.add("active");
  };

  // Contact Card 3D Effect
  if (card) {
    card.addEventListener("mousemove", (e) => {
      let { left, top, width, height } = card.getBoundingClientRect();
      let x = (e.clientX - left) / width - 0.5;
      let y = (e.clientY - top) / height - 0.5;
      card.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  // Contact Form Alert
  document.getElementById("contactForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("customAlert").style.display = "block";
  });

  window.closeAlert = function () {
    document.getElementById("customAlert").style.display = "none";
  };

  // Theme Toggle with Local Storage
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";

  toggleSwitch.addEventListener("change", () => {
    const theme = toggleSwitch.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll(".lazy");
  lazyImages.forEach(image => {
    const src = image.getAttribute("data-src");
    if (src) {
      image.setAttribute("src", src);
      image.classList.remove("lazy");
    }
  });


  // Back to top button
    const backBtn = document.querySelector(".back-btn");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    });
  
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  

  // Initialize Lucide Icons
  lucide.createIcons();
});
