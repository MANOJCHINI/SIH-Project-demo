// Predefined student credentials (for demo only)
const studentCredentials = {
  name: "Sanket",
  roll: "12345",
  password: "password123"
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing page

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if input matches stored credentials
    if (
      name === studentCredentials.name &&
      roll === studentCredentials.roll &&
      password === studentCredentials.password
    ) 
      window.location.href = "homePage.html"; 
     else {
      alert("Invalid credentials. Please try again.");
    }
  });
});
