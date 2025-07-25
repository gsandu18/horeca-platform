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

async function incarcaCampanii() {
  lista.innerHTML = "<li>Se încarcă...</li>";
  const snapshot = await getDocs(collection(db, "campanii"));
  lista.innerHTML = "";
  snapshot.forEach(doc => {
    const c = doc.data();
    lista.innerHTML += `
      <li>
        <h3>${c.titlu}</h3>
        <p>${c.descriere}</p>
        <span>Locație: ${c.locatie} • Start: ${c.dataStart}</span>
      </li>`;
  });
}

incarcaCampanii();
