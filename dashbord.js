document.querySelectorAll('.sidebar li').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const section = btn.getAttribute('data-section');
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');
  });
});// Existing navigation code...
btns.forEach(btn => {
  // removed code...
});

// Optional: formulare de trimitere (ex: jobForm)
document.getElementById('jobForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Job publicat cu succes 🚀');
  e.target.reset();
});
