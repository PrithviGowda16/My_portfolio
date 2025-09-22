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

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Profile image animation on page load
window.addEventListener('DOMContentLoaded', () => {
  const profileImage = document.querySelector('.image-container');
  
  if (profileImage) {
    // Start animation after a short delay
    setTimeout(() => {
      profileImage.classList.add('animate-in');
    }, 500);
  }
});

// Intersection Observer for scroll animations
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

// Observe elements for scroll animations
document.querySelectorAll('.left-content, .right-content').forEach(el => {
  observer.observe(el);
});

// Navigation dots functionality
const navDots = document.querySelectorAll('.nav-dots .dot');
navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // Remove active class from all dots
    navDots.forEach(d => d.classList.remove('active'));
    // Add active class to clicked dot
    dot.classList.add('active');
    
    // You can add navigation logic here based on the index
    console.log(`Navigating to section ${index + 1}`);
  });
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-5px) scale(1.05)';
    item.style.boxShadow = '0 15px 30px rgba(174, 6, 3, 0.3)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
    item.style.boxShadow = 'none';
  });
});

// View Projects button functionality
const viewDetailBtn = document.querySelector('.view-detail-btn');
if (viewDetailBtn) {
  viewDetailBtn.addEventListener('click', () => {
    window.location.href = '/projects.html';
  });
}

// Social links functionality
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(link.href, '_blank'); // always opens correct link
  });
});


// Parallax effect for profile image — only when page is scrollable
window.addEventListener('scroll', () => {
  const profileImage = document.querySelector('.profile-image');
  if (!profileImage) return;

  // if page isn't scrollable (desktop locked) don't apply parallax
  if (document.documentElement.scrollHeight <= window.innerHeight) {
    profileImage.style.transform = '';
    return;
  }

  // apply parallax on scrollable pages (mobile/tablet)
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  const speed = scrolled * 0.08;  // subtle effect
  profileImage.style.transform = `translateY(${speed}px)`;
});


// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Tech tag animation
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
  tag.classList.add('animate-in');
});

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Apply ripple effect to view detail button
const buttons = document.querySelectorAll('.view-detail-btn');
buttons.forEach(addRippleEffect);

// Fade in animation for text content
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

console.log('About page JavaScript loaded successfully!');