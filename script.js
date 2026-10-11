
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

document.getElementById("year").textContent = new Date().getFullYear();

// Dark / light mode
themeToggle.addEventListener("click", () => {
  const isDark = html.dataset.theme !== "dark";

  html.dataset.theme = isDark ? "dark" : "light";
  themeToggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
});

// Contact form validation
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  let firstInvalidField = null;

  if (!name) {
    nameError.textContent = "Please enter your name.";
    firstInvalidField ||= document.getElementById("name");
  }

  if (!email) {
    emailError.textContent = "Please enter your email address.";
    firstInvalidField ||= document.getElementById("email");
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailError.textContent =
        "Please enter a valid email address, for example name@example.com.";
      firstInvalidField ||= document.getElementById("email");
    }
  }

  if (!message) {
    messageError.textContent = "Please write a message before submitting.";
    firstInvalidField ||= document.getElementById("message");
  }

  if (firstInvalidField) {
    formStatus.textContent = "Please correct the highlighted fields.";
    formStatus.classList.add("error");
    firstInvalidField.focus();
    return;
  }

  formStatus.textContent =
    `Thank you, ${name}! Your message passed validation. Nothing was sent.`;
  formStatus.classList.add("success");
  contactForm.reset();
});
