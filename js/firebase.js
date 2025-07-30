const firebaseConfig = {
  apiKey: "AlzaSyDvsEfnjVmOkPkExebfxOZ5e3ALRVG0Z-w",
  authDomain: "personal-horeca-e5f0e.firebaseapp.com",
  projectId: "personal-horeca-e5f0e",
  storageBucket: "personal-horeca-e5f0e.appspot.com",
  messagingSenderId: "332871951184",
  appId: "1:332871951184:web:7e65e3a1b1b61c46768255",
  measurementId: "G-7W3VJXW81D"
};
// Inițializare Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔐 LOGIN CU GOOGLE (pentru Candidat sau Firmă)
function loginWithGoogle(userType) {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      // ✅ Redirect către Gmail direct
      window.location.href = 'https://mail.google.com';
    })
    .catch(error => {
      alert("Eroare Google: " + error.message);
    });
}

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
