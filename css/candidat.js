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
