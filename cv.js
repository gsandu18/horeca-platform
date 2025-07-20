document.getElementById("cv-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    nume: form.nume.value.trim(),
    email: form.email.value.trim(),
    telefon: form.telefon.value.trim(),
    experienta: form.experienta.value.trim(),
    studii: form.studii.value.trim(),
    competente: form.competente.value.trim()
  };

  const output = `
    <h2>CV - ${data.nume}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Telefon:</strong> ${data.telefon}</p>
    <h3>Experiență profesională</h3>
    <p>${data.experienta}</p>
    <h3>Studii</h3>
    <p>${data.studii}</p>
    <h3>Competențe</h3>
    <p>${data.competente}</p>
  `;

  const container = document.getElementById("cv-output");
  container.innerHTML = output;
  container.classList.remove("hidden");
});
