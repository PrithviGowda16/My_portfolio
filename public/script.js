// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    }
  });
});

document.querySelector('a[href="#home"]').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========================================
// HAMBURGER MENU
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest('.navbar')) {
      if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
      }
    }
  }
});

// ========================================
// HOME SECTION - TYPING EFFECT
// ========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text.charAt(i);
      span.style.color = "rgba(166, 7, 7, 1)";
      element.appendChild(span);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => fadeToWhite(element), 2000);
    }
  }

  type();
}

function fadeToWhite(element) {
  const spans = element.querySelectorAll('span');
  spans.forEach((span, idx) => {
    setTimeout(() => {
      span.style.transition = "color 0.5s ease-in";
      span.style.color = "rgba(212, 207, 207, 1)";

      if (idx === spans.length - 1) {
        const heroButtons = document.querySelector('.hero-buttons');
        const socialIcons = document.querySelector('#home .social-icons');
        const navLinksElement = document.querySelector('.nav-links');

        if (heroButtons) {
          setTimeout(() => {
            heroButtons.classList.add('visible');
          }, 200);
        }

        if (socialIcons) {
          setTimeout(() => {
            socialIcons.classList.add('visible');
          }, 600);
        }

        if (navLinksElement) {
          setTimeout(() => {
            navLinksElement.classList.add('visible');
          }, 1000);
        }
      }
    }, idx * 50);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent.trim();
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 100);
    }, 500);
  }
});

// ========================================
// HOME SECTION - PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('#home.hero');
  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ========================================
// ABOUT SECTION - PROFILE IMAGE SHOW/HIDE
// ========================================
const profileImageContainer = document.querySelector('.image-container');
const aboutSection = document.querySelector('#about');

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        profileImageContainer.classList.add('show');
      } else {
        profileImageContainer.classList.remove('show');
      }
    });
  },
  {
    threshold: 0.3, // Image appears when 30% of about section is visible
  }
);

if (aboutSection && profileImageContainer) {
  imageObserver.observe(aboutSection);
}

// ========================================
// ABOUT SECTION - INTERSECTION OBSERVER
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.left-content, .right-content').forEach(el => {
  observer.observe(el);
});

// ========================================
// ABOUT SECTION - FADE IN ANIMATIONS
// ========================================
const fadeInElements = document.querySelectorAll('.description, .details-grid, .info-card');
fadeInElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    element.style.transition = 'all 0.8s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 800 + (index * 200));
});

// ========================================
// ABOUT SECTION - TECH TAG ANIMATIONS
// ========================================
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
  tag.classList.add('animate-in');
});

// ========================================
// ABOUT SECTION - SOCIAL LINKS
// ========================================
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.href) {
      e.preventDefault();
      window.open(link.href, '_blank');
    }
  });
});

// ========================================
// PROJECTS SECTION - CAROUSEL
// ========================================
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
  if (!track || cards.length === 0) return;
  
  const cardWidth = cards[0].offsetWidth + 30;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentIndex);
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });
}

// Initialize carousel
if (track) {
  updateCarousel();
}

// ========================================
// PROJECTS SECTION - MODAL
// ========================================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalDuration = document.getElementById('modalDuration');
const modalClient = document.getElementById('modalClient');
const modalTeam = document.getElementById('modalTeam');
const modalFeatures = document.getElementById('modalFeatures');

const projectData = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive web applications using cutting-edge technologies. Focused on performance, accessibility, and user experience. Each project is crafted with attention to detail and best practices.',
    tech: 'React, Node.js, MongoDB, Express',
    duration: '3-6 months',
    client: 'Businesses & Startups',
    team: '3-5 developers',
    features: [
      'Responsive design across all devices',
      'Fast loading times and optimization',
      'SEO-friendly architecture',
      'Modern UI/UX principles'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  },
  {
    title: 'Mobile Applications',
    description: 'Creating intuitive and engaging mobile experiences for iOS and Android platforms. Native performance with cross-platform efficiency using React Native and Flutter.',
    tech: 'React Native, Flutter, Firebase',
    duration: '4-8 months',
    client: 'Startups & Enterprises',
    team: '2-4 developers',
    features: [
      'Cross-platform compatibility',
      'Native performance optimization',
      'Offline functionality',
      'Push notifications & real-time updates'
    ],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
  },
  {
    title: 'AI Solutions',
    description: 'Implementing intelligent systems powered by machine learning and artificial intelligence. From predictive analytics to natural language processing.',
    tech: 'Python, TensorFlow, PyTorch, scikit-learn',
    duration: '6-12 months',
    client: 'All Industries',
    team: '4-6 specialists',
    features: [
      'Machine learning model development',
      'Data preprocessing and analysis',
      'Model deployment and monitoring',
      'Custom AI integrations'
    ],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop'
  },
  {
    title: 'E-Commerce Platforms',
    description: 'Full-featured online shopping solutions with secure payment processing, inventory management, and analytics dashboards.',
    tech: 'Next.js, Stripe, PostgreSQL, Redis',
    duration: '5-10 months',
    client: 'Retailers & Businesses',
    team: '4-7 developers',
    features: [
      'Secure payment gateway integration',
      'Inventory and order management',
      'Customer analytics dashboard',
      'Multi-vendor support'
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
  },
  {
    title: 'Data Visualization',
    description: 'Interactive dashboards and data visualization tools that transform complex data into actionable insights for business intelligence.',
    tech: 'D3.js, PowerBI, Tableau, Python',
    duration: '2-6 months',
    client: 'Enterprises & Analytics Teams',
    team: '2-4 developers',
    features: [
      'Interactive charts and graphs',
      'Real-time data updates',
      'Custom reporting systems',
      'Data export and sharing'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  }
];

const readMoreBtns = document.querySelectorAll('.read-more-btn');
readMoreBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const project = projectData[index];
    
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    if (modalTech) modalTech.textContent = project.tech;
    if (modalDuration) modalDuration.textContent = project.duration;
    if (modalClient) modalClient.textContent = project.client;
    if (modalTeam) modalTeam.textContent = project.team;
    if (modalImage) modalImage.src = project.image;
    
    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
      });
    }
    
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// View Code Button
const viewCodeBtn = document.getElementById('viewCodeBtn');
if (viewCodeBtn) {
  viewCodeBtn.addEventListener('click', function() {
    window.open('https://github.com/PrithviGowda16', '_blank');
  });
}

// ========================================
// CONTACT SECTION - FORM VALIDATION
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

if (emailInput) {
  emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value) && emailInput.value !== '') {
      emailInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      emailInput.style.borderColor = '';
    }
  });
}

if (nameInput) {
  nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 2 && nameInput.value !== '') {
      nameInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      nameInput.style.borderColor = '';
    }
  });
}

if (messageInput) {
  messageInput.addEventListener('input', () => {
    if (messageInput.value.length < 10 && messageInput.value !== '') {
      messageInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      messageInput.style.borderColor = '';
    }
  });
}

// ========================================
// CONTACT SECTION - FORM SUBMISSION
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Replace with your actual API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (res.ok) {
        const data = await res.json();
        alert(data.msg || 'Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      // Fallback for when backend is not available
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ========================================
// CONTACT SECTION - SOCIAL ICONS HOVER
// ========================================
const contactSocialIcons = document.querySelectorAll('#contact .social-icons a');
contactSocialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================================
// GENERAL - PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

console.log('Portfolio JavaScript loaded successfully!');

// ========================================
// SECTION FADE-IN / FADE-OUT ON SCROLL
// ========================================
const fadeSections = document.querySelectorAll('.section');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  },
  {
    threshold: 0.4, // adjust for earlier or later fading
  }
);

fadeSections.forEach((section) => fadeObserver.observe(section));

