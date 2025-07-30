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

// 🔐 Login cu Google (Candidat sau Firmă)
function loginWithGoogle(userType) {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log("Autentificat ca:", user.email);
      if (userType === 'candidat') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'firma.html';
      }
    })
    .catch(error => {
      alert("Eroare Google: " + error.message);
    });
}

// 🔐 Login cu Email și Parolă
function loginWithGoogle(userType) {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log("Autentificat ca:", user.email);

      // 🔁 Redirect direct către Gmail
      window.location.href = "https://mail.google.com";
    })
    .catch(error => {
      alert("Eroare Google: " + error.message);
    });
}
