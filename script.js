// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation toggle functionality
const toggle = document.getElementById('toggle');
const list = document.getElementById('list-links');

toggle.addEventListener('click', () => {
    list.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !list.contains(e.target)) {
        list.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav li').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const text = e.target.textContent.toLowerCase().replace(/\s+/g, '-');
        const section = document.getElementById(text);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            list.classList.remove('active');
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .tech-logos img').forEach(el => {
    observer.observe(el);
});

// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.list li a');

function setActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight/3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Carousel functionality
function scrollCarousel(direction) {
    const container = document.querySelector('.carousel-track');
    const cardWidth = 320; // Width of each card including gap
    const scrollAmount = cardWidth * direction;
    
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        scrollCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        scrollCarousel(1);
    }
});

// Add touch/swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;
const carouselTrack = document.querySelector('.carousel-track');

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            scrollCarousel(1);
        } else {
            // Swipe right
            scrollCarousel(-1);
        }
    }
}

// Add scroll buttons visibility based on scroll position
const carouselContainer = document.querySelector('.carousel-container');
const leftBtn = carouselContainer.querySelector('.carousel-btn.left');
const rightBtn = carouselContainer.querySelector('.carousel-btn.right');

carouselTrack.addEventListener('scroll', () => {
    // Show/hide left button
    leftBtn.style.opacity = carouselTrack.scrollLeft > 0 ? '1' : '0.5';
    
    // Show/hide right button
    const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
    rightBtn.style.opacity = carouselTrack.scrollLeft < maxScroll ? '1' : '0.5';
});

// Initialize button states
window.addEventListener('load', () => {
    leftBtn.style.opacity = '0.5';
    rightBtn.style.opacity = carouselTrack.scrollWidth > carouselTrack.clientWidth ? '1' : '0.5';
});