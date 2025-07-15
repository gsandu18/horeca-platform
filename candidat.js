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
<link rel="stylesheet" href="css/styles.css" />
