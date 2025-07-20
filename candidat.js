document.addEventListener('DOMContentLoaded', function () {
  const formular = document.getElementById('formular-candidat');

  formular.addEventListener('submit', function (e) {
    e.preventDefault();

    const nume = document.getElementById('nume').value.trim();
    const email = document.getElementById('email').value.trim();
    const experienta = document.getElementById('experienta').value.trim();

    if (!nume || !email || !experienta) {
      alert('Te rugăm să completezi numele, emailul și experiența!');
      return;
    }

    // Redirecționează la pagina de mulțumire
    window.location.href = 'mulțumim.html';
  });
});
document.getElementById('form-candidat').addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(this);
  const firme = data.get('firme').split(',').map(f => f.trim());

  firme.forEach(firma => {
    const email = firma.toLowerCase().replace(/\s+/g, '') + '@horeca-firme.ro';
    const body = `
Nume: ${data.get('nume')}
Email: ${data.get('email')}
Experiență: ${data.get('experienta')}
Domenii preferate: ${data.get('domenii')}
Firme selectate: ${data.get('firme')}

document.getElementById("cv-form").addEventListener("submit", function (e) {
  const experienta = document.getElementById("experienta").value.trim();

  // verifică dacă există minimum 2 denumiri separate prin virgulă
  const entries = experienta.split(",").map(s => s.trim()).filter(s => s.length >= 3);

  if (entries.length < 2) {
    alert("⚠️ Te rugăm să menționezi cel puțin două locuri unde ai lucrat (ex: Restaurant X, Hotel Y).");
    e.preventDefault();
  }
});
    `;

    const mailto = `mailto:${email}?subject=Candidatură HoReCa&body=${encodeURIComponent(body)}`;
    window.open(mailto);
  });

  alert("Aplicația a fost trimisă către firmele selectate!");
  this.reset();
});
