// Contact Form Handler
if (document.getElementById("contactForm")) {
  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    console.log(" Form submitted"); // debug check
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Add loading state to button
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      
      const data = await res.json();
      alert(data.msg); // show backend response
      
      // Reset form on success
      if (res.ok) {
        document.getElementById("contactForm").reset();
      }
    } catch (err) {
      alert("Could not send message");
      console.error(err);
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to current page in navigation
const currentLocation = location.pathname;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
  if(item.getAttribute('href') === currentLocation){
    item.classList.add('active');
  }
});


// Add parallax effect to hero section (optional)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Typing effect for hero title with color change
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = ''; // clear

  function type() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text.charAt(i);
      span.style.color = "rgb(165, 5, 5)"; // start red
      element.appendChild(span);
      i++;
      setTimeout(type, speed);
    } else {
      // After typing finishes, wait 2s then fade to white one by one
      setTimeout(() => fadeToWhite(element), 2000);
    }
  }

  type();
}

// Fade letters to white one by one
function fadeToWhite(element) {
  const spans = element.querySelectorAll('span');
  spans.forEach((span, idx) => {
    setTimeout(() => {
      span.style.transition = "color 0.5s ease-in";
      span.style.color = "white";

      // When the last letter turns white
      if (idx === spans.length - 1) {
        const heroButtons = document.querySelector('.hero-buttons');
        const socialIcons = document.querySelector('.social-icons');
        const navLinks = document.querySelector('.nav-links');

        if (heroButtons) {
          setTimeout(() => {
            heroButtons.classList.add('visible');
          }, 200);
        }

        if (socialIcons) {
          setTimeout(() => {
            socialIcons.classList.add('visible');
          }, 600); // appear a bit later
        }

        if (navLinks) {
          setTimeout(() => {
            navLinks.classList.add('visible');
          }, 1000); // appear last
        }
      }
    }, idx * 50); // delay each letter
  });

  const first = document.querySelector('.name-first');
  const last = document.querySelector('.name-last');
  if (first && last) {
    first.classList.add('visible');
    last.classList.add('visible');
  }
}


// Initialize typing effect on page load
window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent.trim();
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 100);
    }, 500);
  }
});


// Add hover effect for social icons
const socialIcons = document.querySelectorAll('.social-icons a');
socialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Form validation enhancement
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Enhanced form validation
if (document.getElementById("contactForm")) {
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  
  emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value) && emailInput.value !== '') {
      emailInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      emailInput.style.borderColor = '';
    }
  });
  
  nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 2 && nameInput.value !== '') {
      nameInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      nameInput.style.borderColor = '';
    }
  });
  
  messageInput.addEventListener('input', () => {
    if (messageInput.value.length < 10 && messageInput.value !== '') {
      messageInput.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    } else {
      messageInput.style.borderColor = '';
    }
  });
}

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}




