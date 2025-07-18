const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".login-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // schimbă tab activ
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // schimbă formular activ
    forms.forEach(form => form.classList.remove("active-form"));
    document.querySelector(`.form-${tab.dataset.tab}`).classList.add("active-form");
  });
});
