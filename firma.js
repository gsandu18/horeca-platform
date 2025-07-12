document.getElementById('adauga-angajat').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const nume = form.numeAng.value;
  const punctaj = form.punctaj.value;
  const feedback = form.feedbackAng.value;

  const li = document.createElement('li');
  li.innerHTML = `<strong>${nume}</strong> – Scor: ${punctaj}/10 <br> Feedback: ${feedback}`;
  document.getElementById('lista-angajati').appendChild(li);
  form.reset();
});
