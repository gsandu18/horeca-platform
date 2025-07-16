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
const starsDiv = document.getElementById('rating');
let selectedRating = 0;

starsDiv.innerHTML = [...Array(5)].map((_, i) => `<span data-star="${i + 1}">★</span>`).join('');

starsDiv.addEventListener('click', (e) => {
  if (e.target.dataset.star) {
    selectedRating = parseInt(e.target.dataset.star);
    updateStars(selectedRating);
  }
});

function updateStars(count) {
  document.querySelectorAll('#rating span').forEach((star, idx) => {
    star.classList.toggle('active', idx < count);
  });
}

document.getElementById('submit-feedback').addEventListener('click', () => {
  const employee = document.getElementById('employee').value;
  const feedbackText = document.getElementById('feedback').value;

  if (!employee || !feedbackText || selectedRating === 0) {
    alert("Completează toate câmpurile!");
    return;
  }

  const entry = document.createElement('div');
  entry.innerHTML = `
    <p><strong>${employee}</strong> — <span style="color:gold;">${'★'.repeat(selectedRating)}</span></p>
    <p>${feedbackText}</p>
    <hr/>
  `;
  document.getElementById('feedback-list').appendChild(entry);

  // Reset
  document.getElementById('employee').value = '';
  document.getElementById('feedback').value = '';
  selectedRating = 0;
  updateStars(0);
});
const logoInput = document.getElementById('logo-upload');
const logoPreview = document.getElementById('logo-preview');

logoInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logoPreview.src = e.target.result;
      logoPreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});
const docForm = document.getElementById('docUploadForm');
const docInput = document.getElementById('doc-file');
const docList = document.getElementById('doc-list');

docForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const file = docInput.files[0];
  if (!file) return alert('Selectează un document');

  const listItem = document.createElement('li');
  listItem.textContent = `${file.name} ✅ (simulat)`;
  docList.appendChild(listItem);

  docInput.value = '';
});
list.innerHTML = docs.map(doc => `
  <p><strong>${doc.nume}</strong> – Status: 
  <span style="color:${doc.status === 'aprobat' ? 'green' : doc.status === 'respins' ? 'red' : '#999'}">
    ${doc.status}
  </span>
  ${doc.comentariu ? `<br/>Comentariu: ${doc.comentariu}` : ''}
  ${doc.actualizat_de ? `<br/>Verificat de: ${doc.actualizat_de}` : ''}
  </p><hr/>`
).join('');
