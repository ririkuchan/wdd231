document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "☰";
  toggleBtn.setAttribute("id", "menu-toggle");

  nav.insertAdjacentElement("beforebegin", toggleBtn);

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});
