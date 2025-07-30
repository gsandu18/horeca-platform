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
const filtruForm = document.getElementById("filtruForm");

// Salvează campanie
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const campanie = {
    titlu: titlu.value,
    descriere: descriere.value,
    locatie: locatie.value,
    data: dataStart.value
  };

  const existente = JSON.parse(localStorage.getItem("campanii")) || [];
  existente.unshift(campanie);
  localStorage.setItem("campanii", JSON.stringify(existente));
  this.reset();
  afiseazaCampanii(existente);
});

// Afișare campanii filtrate
filtruForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const loc = filtruLocatie.value.toLowerCase();
  const data = filtruData.value;

  const toate = JSON.parse(localStorage.getItem("campanii")) || [];

  const filtrate = toate.filter(c =>
    (!loc || c.locatie.toLowerCase().includes(loc)) &&
    (!data || c.data === data)
  );

  afiseazaCampanii(filtrate);
});

// Afișare generală
function afiseazaCampanii(listaCampanii) {
  lista.innerHTML = "";
  listaCampanii.forEach(c => {
    const div = document.createElement("div");
    div.className = "feedback-entry";
    div.innerHTML = `
      <h4>${c.titlu}</h4>
      <p><strong>Locație:</strong> ${c.locatie}</p>
      <p><strong>Start:</strong> ${c.data}</p>
      <p>${c.descriere}</p>
    `;
    lista.appendChild(div);
  });
}

// Inițial
window.addEventListener("DOMContentLoaded", () => {
  const campanii = JSON.parse(localStorage.getItem("campanii")) || [];
  afiseazaCampanii(campanii);
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
