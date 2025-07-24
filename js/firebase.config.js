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
const db = firebase.firestore();
