// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyBx7JQBHi3aaIqQW2g_b11UjEBslkAQZ9c",
  authDomain: "horeca-app-928be.firebaseapp.com",
  projectId: "horeca-app-928be",
  storageBucket: "horeca-app-928be.appspot.com",
  messagingSenderId: "1008068918087",
  appId: "1:1008068918087:web:47105b8fbcf9bb297f2a62",
  measurementId: "G-VZ6LVDDQH5"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Logică înregistrare
document.getElementById("firmaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nume = document.getElementById("numeFirma").value;
  const email = document.getElementById("emailFirma").value;
  const parola = document.getElementById("parolaFirma").value;
  const oras = document.getElementById("orasFirma").value;
  const contact = document.getElementById("persoanaContact").value;
  const telefon = document.getElementById("telefonFirma").value;
  const domeniu = document.getElementById("domeniuActivitate").value;
  const logoFile = document.getElementById("logoFirma").files[0];

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, parola);
    const uid = userCred.user.uid;

    let logoUrl = "";
    if (logoFile) {
      const storageRef = ref(storage, `logo_firme/${uid}.jpg`);
      await uploadBytes(storageRef, logoFile);
      logoUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(db, "firme", uid), {
      nume, email, oras, contact, telefon, domeniu, logoUrl
    });

    window.location.href = `dash_1.html?uid=${uid}`;
  } catch (error) {
    alert("Eroare: " + error.message);
  }
});
