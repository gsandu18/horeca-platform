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
    `;

    const mailto = `mailto:${email}?subject=Candidatură HoReCa&body=${encodeURIComponent(body)}`;
    window.open(mailto);
  });

  alert("Aplicația a fost trimisă către firmele selectate!");
  this.reset();
});
