// TAB SWITCH
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".login-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    forms.forEach(f => f.classList.remove("active-form"));
    document.querySelector(`.form-${tab.dataset.tab}`).classList.add("active-form");
  });
});

// LOGIN FIRMA
document.getElementById("login-firma").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const parola = e.target.parola.value;

  const firme = await fetch("firme.json").then(res => res.json());
  const firma = firme.find(f => f.email === email && f.parola === parola);

  const errorBox = document.getElementById("error-firma");

  if (!firma) {
    errorBox.textContent = "Email sau parolă greșită";
    errorBox.style.display = "block";
    return;
  }

  if (!firma.validata) {
    window.location.href = "asteptare-validare.html";
    return;
  }

  localStorage.setItem("firmaEmail", firma.email);
  localStorage.setItem("firmaNume", firma.nume);
  window.location.href = "dashbord-firma.html";
});

// LOGIN CANDIDAT
document.getElementById("login-candidat").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const parola = e.target.parola.value;

  const candidati = await fetch("candidati.json").then(res => res.json());
  const candidat = candidati.find(c => c.email === email && c.parola === parola);

  const errorBox = document.getElementById("error-cand");

  if (!candidat) {
    errorBox.textContent = "Date de autentificare incorecte";
    errorBox.style.display = "block";
    return;
  }

  localStorage.setItem("candidatEmail", candidat.email);
  localStorage.setItem("candidatNume", candidat.nume);
  window.location.href = "dashbord-candidat.html";
});p
<script>
  // Trecere între taburi
  const btnCandidat = document.getElementById("btn-candidat");
  const btnFirma = document.getElementById("btn-firma");
  const formCandidat = document.getElementById("form-candidat");
  const formFirma = document.getElementById("form-firma");

  btnCandidat.addEventListener("click", () => {
    btnCandidat.classList.add("active");
    btnFirma.classList.remove("active");
    formCandidat.classList.add("active");
    formFirma.classList.remove("active");
  });

  btnFirma.addEventListener("click", () => {
    btnFirma.classList.add("active");
    btnCandidat.classList.remove("active");
    formFirma.classList.add("active");
    formCandidat.classList.remove("active");
  });
</script>
</body>
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-firma");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const parola = loginForm.parola.value.trim();

    const firme = [
      { email: "test@firma.ro", parola: "123456", validata: true, nume: "Firma Test" },
      { email: "alta@firma.ro", parola: "parola123", validata: false, nume: "Firma Nouă" }
    ];

    const firma = firme.find(f => f.email === email && f.parola === parola);

    if (!firma) {
      alert("Email sau parolă greșită.");
      return;
    }

    if (!firma.validata) {
      window.location.href = "asteptare-validare.html";
      return;
    }

    localStorage.setItem("firmaEmail", firma.email);
    localStorage.setItem("firmaNume", firma.nume);
    window.location.href = "dashboard-firma.html";
  });
});
