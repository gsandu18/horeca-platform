document.getElementById("cv-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    nume: document.getElementById("nume").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefon: document.getElementById("telefon").value.trim(),
    experienta: document.getElementById("experienta").value.trim(),
    studii: document.getElementById("studii").value.trim(),
    competente: document.getElementById("competente").value.trim()
  };

  // Validare obligatorie
  for (let key in data) {
    if (!data[key]) {
      alert("Toate câmpurile sunt obligatorii!");
      return;
    }
  }

  const output = `
    <h2>${data.nume}</h2>
    <p>${data.email}</p>
    <p><strong>Telefon:</strong> ${data.telefon}</p>
    <h3>Experiență profesională</h3><p>${data.experienta}</p>
    <h3>Studii</h3><p>${data.studii}</p>
    <h3>Competențe</h3><p>${data.competente}</p>
  `;

  const container = document.getElementById("generated-cv");
  container.innerHTML = output;

  // Salvează CV în localStorage
  localStorage.setItem("cvData", JSON.stringify(data));
});


  document.getElementById("profile-nume").textContent = nume;
  document.getElementById("candidat-nume").textContent = nume;
  document.getElementById("profile-email").textContent = email;
  document.querySelector("textarea[name='educatie']").value = educatie;
  document.querySelector("textarea[name='experienta']").value = experienta;

  if (pic) document.getElementById("profile-pic").src = pic;
  generateCV();

  document.getElementById("upload-pic").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("profilePic", reader.result);
      document.getElementById("profile-pic").src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const ed = e.target.educatie.value.trim();
    const exp = e.target.experienta.value.trim();
    localStorage.setItem("educatie", ed);
    localStorage.setItem("experienta", exp);
    generateCV();
    alert("Profil salvat cu succes!");
  });

  document.getElementById("download-cv").addEventListener("click", () => {
    html2pdf().from(document.querySelector("#generated-cv")).save(
      `CV_${nume.replace(/ /g,"_")}.pdf`
    );
  });

  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("candidatEmail");
    localStorage.removeItem("candidatNume");
    window.location.href = "login.html";
  });

  function generateCV() {
    const ed = localStorage.getItem("educatie") || "";
    const exp = localStorage.getItem("experienta") || "";
    document.getElementById("generated-cv").innerHTML = `
      <h2>${nume}</h2>
      <p><strong>Email:</strong> ${email}</p>
      ${ed ? `<p><strong>Educație:</strong> ${ed}</p>` : ""}
      ${exp ? `<p><strong>Experiență:</strong> ${exp}</p>` : ""}
    `;
  }
});
// În interiorul DOMContentLoaded...
const abil = localStorage.getItem("abilitati") || "";
const cert = localStorage.getItem("certificari") || "";
const projects = JSON.parse(localStorage.getItem("projects") || "[]");

// Setăm valorile existente
document.querySelector("textarea[name='abilitati']").value = abil;
document.querySelector("textarea[name='certificari']").value = cert;

projects.forEach(proj => addProjectItem(proj.title, proj.desc));

// Adăugăm funcționalitate buton adăugare proiect
document.getElementById("add-project").addEventListener("click", () => {
  addProjectItem("", "");
});

function addProjectItem(title, desc) {
  const container = document.getElementById("projects-container");
  const div = document.createElement("div");
  div.className = "project-item";
  div.innerHTML = `
    <input type="text" name="project-title" placeholder="Titlu proiect" value="${title}">
    <textarea name="project-desc" placeholder="Descriere proiect">${desc}</textarea>
  `;
  container.appendChild(div);
}

// Salvare profil extins
document.getElementById("profile-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const edVal = e.target.educatie.value.trim();
  const expVal = e.target.experienta.value.trim();
  const abilVal = e.target.abilitati.value.trim();
  const certVal = e.target.certificari.value.trim();

  localStorage.setItem("educatie", edVal);
  localStorage.setItem("experienta", expVal);
  localStorage.setItem("abilitati", abilVal);
  localStorage.setItem("certificari", certVal);

  // Preluam proiecte populate
  const projEls = document.querySelectorAll(".project-item");
  const projArr = Array.from(projEls).map(el => ({
    title: el.querySelector("input[name='project-title']").value.trim(),
    desc: el.querySelector("textarea[name='project-desc']").value.trim()
  })).filter(p => p.title || p.desc);

  localStorage.setItem("projects", JSON.stringify(projArr));

  generateCV();
  alert("Profil salvat cu succes!");
});

// Modificăm function generateCV:
function generateCV() {
  const ed = localStorage.getItem("educatie");
  const exp = localStorage.getItem("experienta");
  const abil = localStorage.getItem("abilitati");
  const cert = localStorage.getItem("certificari");
  const projs = JSON.parse(localStorage.getItem("projects") || "[]");

  let html = `<h2>${nume}</h2><p><strong>Email:</strong> ${email}</p>`;
  if (ed) html += `<p><strong>Educație:</strong> ${ed}</p>`;
  if (exp) html += `<p><strong>Experiență:</strong> ${exp}</p>`;
  if (abil) html += `<p><strong>Abilități:</strong> ${abil}</p>`;
  if (cert) html += `<p><strong>Certificări:</strong> ${cert}</p>`;

  if (projs.length) {
    html += `<h3>Proiecte</h3>`;
    projs.forEach(p => {
      html += `<p><strong>${p.title}</strong><br>${p.desc}</p>`;
    });
  }
  document.getElementById("generated-cv").innerHTML = html;
}
// Aplică tema salvată (light/dark)
if (localStorage.getItem("tema-site") === "dark-theme") {
  document.body.classList.add("dark-theme");
}

// Aplică accentul tematic (firma sau candidat)
const tip = localStorage.getItem("tipUser");
if (tip) {
  document.body.classList.add(`theme-${tip}`);
}

// Toggle între light / dark theme
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("tema-site", "dark-theme");
  } else {
    localStorage.removeItem("tema-site");
  }
});
