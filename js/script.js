// === Firebase Config (înlocuiește cu al tău) ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIz...",
  authDomain: "horeca-app...",
  projectId: "horeca-app...",
  storageBucket: "horeca-app...",
  messagingSenderId: "...",
  appId: "1:...:web:...",
  measurementId: "G-..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// === Salvare profil candidat ===
document.getElementById('saveProfile').addEventListener('click', async () => {
  const educatie = document.getElementById('educatie').value;
  const experienta = document.getElementById('experienta').value;
  const abilitati = document.getElementById('abilitati').value;
  const certificari = document.getElementById('certificari').value;

  const user = auth.currentUser;
  if (!user) return alert("Trebuie să fii autentificat!");

  const uid = user.uid;

  await setDoc(doc(db, "candidati", uid), {
    educatie,
    experienta,
    abilitati,
    certificari,
    email: user.email
  });

  alert("Profil salvat cu succes! ✅");
});

// === Generare CV în PDF ===
document.getElementById('genereazaPDF').addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const educatie = document.getElementById('educatie').value;
  const experienta = document.getElementById('experienta').value;
  const abilitati = document.getElementById('abilitati').value;
  const certificari = document.getElementById('certificari').value;

  pdf.text("CV Generat", 20, 20);
  pdf.text("Educație:", 20, 40);
  pdf.text(educatie, 30, 50);
  pdf.text("Experiență:", 20, 70);
  pdf.text(experienta, 30, 80);
  pdf.text("Abilități:", 20, 100);
  pdf.text(abilitati, 30, 110);
  pdf.text("Certificări:", 20, 130);
  pdf.text(certificari, 30, 140);

  pdf.save("cv_candidat.pdf");
});

// === Logout ===
document.getElementById('logoutBtn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
