// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Clicked: ${link.textContent}`); // Log action
            // Add your custom logic here (e.g., redirect or show content)
            alert(`Navigating to ${link.textContent} page...`); // Example
        });
    });
});
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav');
    const btn = document.querySelector('.mobile-menu-btn');
    if (!nav.contains(event.target) && event.target !== btn) {
        nav.classList.remove('active');
    }
});