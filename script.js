document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const menu = document.querySelector(".links"); // Selecting ul
  const hamburger = document.querySelector(".hamburger");

  // Toggle Menu on Click
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Scroll Event to Keep Blur Effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  const links = document.querySelectorAll(".links a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Space between header and section
  function spaceBetweenHeader() {
    const headerHeight = header.offsetHeight;
    const sections = document.querySelectorAll(".space");
    sections.forEach((section) => {
      section.style.paddingTop = `${headerHeight}px`; // Use padding instead of margin for better spacing
    });
  }

  spaceBetweenHeader(); // Run when page loads
  window.addEventListener("resize", spaceBetweenHeader); // Adjust spacing on window resize
});

// Function to scroll to a specific section
function scrollToSection() {
  const nextSection = document.querySelector(".about"); // Change this to your target section's class or ID
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}

// const projectsContainer = document.getElementById("projects");
// const dotsContainer = document.getElementById("dots");

// Fetch GitHub Repos
// async function fetchProjects() {
//     const response = await fetch("https://api.github.com/users/raazkumar24/repos");
//     const projects = await response.json();

//     // Clear previous projects & dots
//     projectsContainer.innerHTML = "";
//     dotsContainer.innerHTML = "";

//     // Display only the first 5 projects
//     const displayedProjects = projects.slice();

//     // Create project cards
//     displayedProjects.forEach((project, index) => {
//         const projectElement = document.createElement("div");
//         projectElement.classList.add("project");
//         projectElement.innerHTML = `
//             <div class="image-container">
//                <img src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514"
//      alt="Project Image"
//      onerror="this.src='https://via.placeholder.com/350x200?text=No+Image'">

//                 <div class="icons-overlay">
//                     <a class="github-icon" href="${project.html_url}" target="_blank">
//                         <i class="fab fa-github"></i>
//                     </a>
//                     <a class="preview-icon" href="#" target="_blank">
//                         <i class="fas fa-external-link-alt"></i>
//                     </a>
//                 </div>
//             </div>
//             <div class="content">
//                 <h3>${project.name}</h3>
//                 <p>${project.description ? project.description : "No description available"}</p>
//                 <div class="tags">
//                     <span class="tag">JavaScript</span>
//                     <span class="tag">React</span>
//                     <span class="tag">CSS</span>
//                 </div>
//             </div>
//         `;
//         projectsContainer.appendChild(projectElement);
//     });

//     // Create dots
//     displayedProjects.forEach((_, index) => {
//         const dot = document.createElement("div");
//         dot.classList.add("dot");
//         if (index === 0) dot.classList.add("active"); // First dot is active by default
//         dot.addEventListener("click", () => {
//             scrollToProject(index);
//         });
//         dotsContainer.appendChild(dot);
//     });

//     // Add scroll event listener to update active dot
//     projectsContainer.addEventListener("scroll", updateActiveDotOnScroll);
// }

// // Scroll to a specific project
// function scrollToProject(index) {
//     const projects = document.querySelectorAll(".project");
//     if (projects[index]) {
//         projects[index].scrollIntoView({
//             behavior: "smooth",
//             block: "nearest",
//             inline: "start"
//         });
//     }
// }

// // Update active dot based on scroll position
// function updateActiveDotOnScroll() {
//     const projects = document.querySelectorAll(".project");
//     const dots = document.querySelectorAll(".dot");

//     let activeIndex = 0;
//     let minDistance = Infinity;

//     // Find the project closest to the center of the viewport
//     projects.forEach((project, index) => {
//         const rect = project.getBoundingClientRect();
//         const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);

//         if (distance < minDistance) {
//             minDistance = distance;
//             activeIndex = index;
//         }
//     });

//     // Set the active dot
//     setActiveDot(activeIndex);
// }

// // Set the active dot
// function setActiveDot(index) {
//     const dots = document.querySelectorAll(".dot");
//     dots.forEach((dot, i) => {
//         if (i === index) {
//             dot.classList.add("active");
//         } else {
//             dot.classList.remove("active");
//         }
//     });
// }

// // Initialize
// fetchProjects();

const projectsContainer = document.getElementById("projects");
const dotsContainer = document.getElementById("dots");
document.addEventListener("DOMContentLoaded", () => {
  async function displayProjects() {
    const projects = await fetchProjects(); // Fetch from api.js

    projectsContainer.innerHTML = "";
    dotsContainer.innerHTML = "";

    projects.forEach((project, index) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      projectElement.innerHTML = `
            <div class="image-container">
               <img src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514" 
                   alt="Project Image" 
                   onerror="this.src='https://via.placeholder.com/350x200?text=No+Image'">

                <div class="icons-overlay">
                   <a class="github-icon" href="https://github.com/" target="_blank">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
</a>

                  <a class="external-link" href="https://your-preview-link.com" target="_blank">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
</a>

                </div>
            </div>
            <div class="content">
                <h3>${project.name}</h3>
                <p>${
                  project.description
                    ? project.description
                    : "No description available"
                }</p>
                <div class="tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">React</span>
                    <span class="tag">CSS</span>
                </div>
            </div>
        `;
      projectsContainer.appendChild(projectElement);
    });

    // Create dots for navigation
    projects.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        scrollToProject(index);
      });
      dotsContainer.appendChild(dot);
    });

    projectsContainer.addEventListener("scroll", updateActiveDotOnScroll);
  }

  function scrollToProject(index) {
    const projects = document.querySelectorAll(".project");
    if (projects[index]) {
      projects[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }

  function updateActiveDotOnScroll() {
    const projects = document.querySelectorAll(".project");
    const dots = document.querySelectorAll(".dot");

    let activeIndex = 0;
    let minDistance = Infinity;

    projects.forEach((project, index) => {
      const rect = project.getBoundingClientRect();
      const distance = Math.abs(
        rect.left + rect.width / 2 - window.innerWidth / 2
      );

      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }
    });

    setActiveDot(activeIndex);
  }

  function setActiveDot(index) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Initialize
  displayProjects();
});
lucide.createIcons(); // Initialize Lucide Icons


function toggleContent(section) {
  document.getElementById('experience').classList.remove('active');
  document.getElementById('qualification').classList.remove('active');
  document.getElementById('experienceBtn').classList.remove('active');
  document.getElementById('qualificationBtn').classList.remove('active');
  
  document.getElementById(section).classList.add('active');
  document.getElementById(section + 'Btn').classList.add('active');
}

// const element = document.querySelector(".contact-details");

// document.addEventListener("mousemove", (e) => {
//     let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
//     let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
//     element.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(100px)`;
// });

// element.addEventListener("mouseenter", () => {
//     element.style.transition = "none";
// });

// element.addEventListener("mouseleave", () => {
//     element.style.transition = "transform 0.5s ease-out";
//     element.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(100px)";
// });

document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".contact-details");

  card.addEventListener("mousemove", (e) => {
    let { left, top, width, height } = card.getBoundingClientRect();
    let x = (e.clientX - left) / width - 0.5;
    let y = (e.clientY - top) / height - 0.5;

    let rotateX = y * -15; // Invert for correct motion
    let rotateY = x * 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  document.getElementById("customAlert").style.display = "block"; // Show alert
});

function closeAlert() {
  document.getElementById("customAlert").style.display = "none"; // Hide alert
}




document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === "dark";

  toggleSwitch.addEventListener("change", () => {
    let theme = toggleSwitch.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});
