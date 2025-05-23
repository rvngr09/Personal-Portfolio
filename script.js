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
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing immediately
    nav.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && e.target !== btn) {
      nav.classList.remove('active');
    }
  });
});
