document.addEventListener("DOMContentLoaded", function () {
  // Get the theme toggle checkbox
  const themeToggle = document.querySelector(".theme-controller");

  // Check local storage for theme preference
  let savedTheme = localStorage.getItem("theme");

  // if no preference set, use the preferred local colour scheme
  if (!savedTheme) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      savedTheme = "dark";
    } else {
      savedTheme = "light";
    }
  }

  // Update the toggle based on the preference
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    themeToggle.checked = true;
  }

  // Add event listener for checkbox change and store
  themeToggle.addEventListener("change", function () {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", this.checked ? "dark" : "light");
  });
});
