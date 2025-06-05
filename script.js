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