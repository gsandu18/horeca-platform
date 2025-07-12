const lista = document.querySelector('#lista-angajati ul');

document.getElementById('adauga-angajat').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const nume = form.numeAng.value;
  const punctaj = form.punctaj.value;
  const feedback = form.feedbackAng.value;

  const li = document.createElement('li');
  li.innerHTML = `<strong>${nume}</strong> – Scor: ${punctaj}/10<br>${feedback}`;
  lista.appendChild(li);

  form.reset();
});

document.getElementById('upload-docs').addEventListener('submit', e => {
  e.preventDefault();
  alert('Documentele au fost încărcate (simulare locală).');
});
