document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".bottom-nav a, .sidebar nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // stop default only if you handle navigation yourself

      // Remove active class from all
      navLinks.forEach(l => l.classList.remove("active"));

      // Add active to clicked
      link.classList.add("active");

      // ✅ Real navigation
      window.location.href = link.getAttribute("href");
    });
  });
});
