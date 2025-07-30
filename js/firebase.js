const firebaseConfig = {
  apiKey: "AlzaSyDvsEfnjVmOkPkExebfxOZ5e3ALRVG0Z-w",
  authDomain: "personal-horeca-e5f0e.firebaseapp.com",
  projectId: "personal-horeca-e5f0e",
  storageBucket: "personal-horeca-e5f0e.appspot.com",
  messagingSenderId: "332871951184",
  appId: "1:332871951184:web:YOUR_APP_ID" // <- Îl vei copia imediat și pe acesta (vezi mai jos)
};
// Inițializare Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔐 LOGIN CU GOOGLE (pentru Candidat sau Firmă)
function loginWithGoogle(userType) {
  console.log('Apăsat buton Google pentru:', userType);

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("Login reușit:", user.email);

      // ✅ Redirecționare după login
      if (userType === 'candidat') {
        window.location.href = "https://mail.google.com";  // sau 'dashboard.html'
      } else {
        window.location.href = "https://mail.google.com";  // sau 'firma.html'
      }
    })
    .catch((error) => {
      console.error("Eroare Google login:", error.message);
      alert("Eroare Google login: " + error.message);
    });
}

// 🔐 LOGIN CU EMAIL + PAROLĂ (pentru ambele tipuri)
function loginWithEmail() {
  const isCandidat = document.getElementById('candidatForm').classList.contains('active');

  const email = isCandidat
    ? document.getElementById('emailCandidat').value
    : document.getElementById('emailFirma').value;

  const password = isCandidat
    ? document.getElementById('parolaCandidat').value
    : document.getElementById('parolaFirma').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login email reușit:", user.email);

      if (isCandidat) {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "firma.html";
      }
    })
    .catch((error) => {
      console.error("Eroare login email:", error.message);
      alert("Eroare Email/Parolă: " + error.message);
    });
}
