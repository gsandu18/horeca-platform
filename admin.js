async function loadAdminDocs() {
  const res = await fetch('http://localhost:5000/api/docs/all'); // pentru admin
  const docs = await res.json();
  const container = document.getElementById('admin-doc-list');

  container.innerHTML = docs.map(doc => `
    <div class="admin-doc">
      <h4>${doc.nume}</h4>
      <p>Firmă ID: ${doc.firmaId}</p>
      <p>Status: <strong>${doc.status}</strong></p>
      <a href="http://localhost:5000/${doc.path}" target="_blank">🔗 Deschide document</a>
      <textarea placeholder="Comentariu admin" id="comment-${doc._id}"></textarea>
      <button class="approve" onclick="updateDoc('${doc._id}', 'aprobat')">Aprobă</button>
      <button class="reject" onclick="updateDoc('${doc._id}', 'respins')">Respinge</button>
    </div>
  `).join('');
}

async function updateDoc(id, status) {
  const comentariu = document.getElementById(`comment-${id}`).value;
  await fetch(`http://localhost:5000/api/docs/update/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, comentariu })
  });
  alert(`Document ${status === 'aprobat' ? 'aprobat' : 'respins'}!`);
  loadAdminDocs();
}

loadAdminDocs();
