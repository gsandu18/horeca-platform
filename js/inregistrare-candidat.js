// Înregistrare candidat
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const experienta = document.getElementById("experienta").value.trim();
  const message = document.getElementById("message");

  try {
    // Creează cont
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Salvează datele în Firestore
    await db.collection("candidati").doc(user.uid).set({
      fullname,
      email,
      experienta,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    message.textContent = "Înregistrare reușită! ✅";
    message.style.color = "green";
    document.getElementById("signup-form").reset();

  } catch (error) {
    message.textContent = "Eroare: " + error.message;
    message.style.color = "red";
  }
});

// Autentificare
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const loginMessage = document.getElementById("login-message");

  try {
    await auth.signInWithEmailAndPassword(email, password);
    loginMessage.textContent = "Autentificare reușită!";
    loginMessage.style.color = "green";
  } catch (error) {
    loginMessage.textContent = "Eroare: " + error.message;
    loginMessage.style.color = "red";
  }
});
<script type="module">
document.getElementById('formularCandidat').addEventListener('submit', async (e) => {
  e.preventDefault();

  const diploma = document.getElementById('diploma').value;
  const fileInput = document.getElementById('documentDiploma');
  const file = fileInput.files[0];

  const allowedDiplome = ["Bucătar", "Ospătar", "Barman", "Cofetar", "Recepționer"];
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

  if (!allowedDiplome.includes(diploma)) {
    alert("Te rugăm să selectezi o diplomă validă.");
    return;
  }

  if (!file || !allowedTypes.includes(file.type)) {
    alert("Documentul încărcat nu este valid. Acceptăm doar PDF, JPG, PNG.");
    return;
  }

  alert("Diploma este validă și poate fi încărcată! ✅");

  // Aici poți adăuga logica Firebase pentru stocare dacă vrei
});
</script>
