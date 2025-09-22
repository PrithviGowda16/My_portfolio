// =========================
// Navigation Functionality
// =========================

const currentLocation = location.pathname;
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentLocation) {
    link.classList.add("active");
  }
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// Carousel Functionality

const track = document.getElementById("carouselTrack");
const cards = document.querySelectorAll(".project-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Update carousel position
function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 30; // card width + gap
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  cards.forEach((card, index) => {
    card.classList.toggle("active", index === currentIndex);
  });
}

// Next button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

// Previous button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

// View code fuctionality
document.getElementById("viewCodeBtn").addEventListener("click", function() {
    window.open("https://github.com/your-repo-link", "_blank");
});


// Modal Functionality

// Modal elements
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalDuration = document.getElementById("modalDuration");
const modalClient = document.getElementById("modalClient");
const modalTeam = document.getElementById("modalTeam");
const modalFeatures = document.getElementById("modalFeatures");

// Sample project data (you can replace with your own)
const projectData = [
  {
    title: "Web Development",
    description: "Modern web applications with cutting-edge technologies and responsive design.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000",
    tech: "Django, React, PostgreSQL",
    duration: "3-6 months",
    // client: "Businesses",
    team: "3-5 developers",
    features: ["Responsive Design", "SEO Optimized", "Scalable Backend"]
  },
  {
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps with intuitive user experiences.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000",
    tech: "Flutter, Kotlin, Swift",
    duration: "4-8 months",
    // client: "Startups",
    team: "2-4 developers",
    features: ["Cross-Platform", "Push Notifications", "Offline Support"]
  },
  {
    title: "AI Solutions",
    description: "Intelligent systems powered by machine learning and data analytics.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000",
    tech: "Python, TensorFlow, OpenCV",
    duration: "2-5 months",
    // client: "All industries",
    team: "2-3 developers",
    features: ["Prediction Models", "Automation", "Data Analytics"]
  },
  {
    title: "E-Commerce Platforms",
    description: "Complete online shopping solutions with payment integration and analytics.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000",
    tech: "Django, Stripe API, MySQL",
    duration: "5-7 months",
    // client: "Retailers",
    team: "3-6 developers",
    features: ["Shopping Cart", "Payment Gateway", "Order Tracking"]
  },
  {
    title: "Data Visualization",
    description: "Interactive dashboards and reports for business intelligence.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000",
    tech: "Power BI, Tableau, D3.js",
    duration: "2-4 months",
    // client: "Enterprises",
    team: "2-3 developers",
    features: ["Interactive Dashboards", "Real-time Data", "Custom Reports"]
  }
];

// Handle Read More button click
document.querySelectorAll(".read-more-btn").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const project = projectData[index];

    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTech.textContent = project.tech;
    modalDuration.textContent = project.duration;
    modalClient.textContent = project.client;
    modalTeam.textContent = project.team;

    // Features list
    modalFeatures.innerHTML = "";
    project.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    modalOverlay.classList.add("active");
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

// Close modal when clicking outside content
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

// Initialize
updateCarousel();
