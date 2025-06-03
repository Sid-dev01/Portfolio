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