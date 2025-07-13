document.getElementById('form-candidat').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const body = `Nume: ${data.get('nume')}
Email: ${data.get('email')}
Experiență: ${data.get('experienta')}
Domenii: ${data.get('domenii')}
Firme: ${data.get('firme')}`;
  const mailto = `mailto:?subject=Candidatură de la ${encodeURIComponent(data.get('nume'))}&body=${encodeURIComponent(body)}`;
  window.open(mailto);
  this.reset();
});
document.getElementById('formular-candidat').addEventListener('submit', function(e) {
  e.preventDefault();

  // Aici poți adăuga validarea + trimiterea la server dacă ai back-end
  
  // Simulăm succesul înregistrării
  window.location.href = 'mulțumim.html';
});
