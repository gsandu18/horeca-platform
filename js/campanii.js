import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIz...",
  authDomain: "horeca-app.firebaseapp.com",
  projectId: "horeca-app",
  storageBucket: "horeca-app.appspot.com",
  messagingSenderId: "...",
  appId: "1:...:web:..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("campanieForm");
const lista = document.getElementById("listaCampanii");

form.addEventListener("submit", async e => {
  e.preventDefault();
  const data = new FormData(form);
  try {
    await addDoc(collection(db, "campanii"), {
      titlu: data.get("titlu"),
      descriere: data.get("descriere"),
      locatie: data.get("locatie"),
      dataStart: data.get("dataStart"),
      creatLa: new Date()
    });
    alert("Campanie creată!");
    form.reset();
    incarcaCampanii();
  } catch (err) {
    alert("Eroare: " + err.message);
  }
});

let campaniiCache = []; // păstrează toate campaniile pentru filtrare locală

async function incarcaCampanii() {
  lista.innerHTML = "<li>Se încarcă...</li>";
  const snapshot = await getDocs(collection(db, "campanii"));
  campaniiCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  aplicaFiltrare();
}

function aplicaFiltrare() {
  const locatie = document.getElementById('filtruLocatie').value.toLowerCase();
  const dataStartMin = document.getElementById('filtruDataStart').value;

  const campaniiFiltrate = campaniiCache.filter(c => {
    const includeLoc = !locatie || c.locatie.toLowerCase().includes(locatie);
    const includeData = !dataStartMin || (c.dataStart >= dataStartMin);
    return includeLoc && includeData;
  });

  lista.innerHTML = campaniiFiltrate.length ? "" : "<li>Nicio campanie găsită.</li>";
  campaniiFiltrate.forEach(c => {
    lista.innerHTML += `
      <li>
        <h3>${c.titlu}</h3>
        <p>${c.descriere}</p>
        <span>Locație: ${c.locatie} • Start: ${c.dataStart}</span>
      </li>`;
  });
}

document.getElementById("aplicaFiltru").addEventListener("click", aplicaFiltrare);
document.getElementById("campanieForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const titlu = document.getElementById("titlu").value;
  const descriere = document.getElementById("descriere").value;
  const locatie = document.getElementById("locatie").value;
  const data = document.getElementById("dataStart").value;

  const campanie = { titlu, descriere, locatie, data };

  const lista = document.getElementById("listaCampanii");

  const card = document.createElement("div");
  card.className = "feedback-entry";
  card.innerHTML = `
    <h4>${titlu}</h4>
    <p><strong>Locație:</strong> ${locatie}</p>
    <p><strong>Start:</strong> ${data}</p>
    <p>${descriere}</p>
  `;
  lista.prepend(card);

  // localStorage save
  const existente = JSON.parse(localStorage.getItem("campanii")) || [];
  existente.unshift(campanie);
  localStorage.setItem("campanii", JSON.stringify(existente));

  this.reset();
});

// Load existing
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("campanii")) || [];
  const lista = document.getElementById("listaCampanii");
  saved.forEach(({ titlu, descriere, locatie, data }) => {
    const card = document.createElement("div");
    card.className = "feedback-entry";
    card.innerHTML = `
      <h4>${titlu}</h4>
      <p><strong>Locație:</strong> ${locatie}</p>
      <p><strong>Start:</strong> ${data}</p>
      <p>${descriere}</p>
    `;
    lista.appendChild(card);
  });
});
