// Înregistrare firmă
document.getElementById("firma-signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firmaName = document.getElementById("firma-name").value.trim();
  const email = document.getElementById("firma-email").value.trim();
  const password = document.getElementById("firma-password").value;
  const nevoi = document.getElementById("firma-nevoi").value.trim();
  const msg = document.getElementById("firma-message");

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("firme").doc(user.uid).set({
      firmaName,
      email,
      nevoi,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    msg.textContent = "Firmă înregistrată cu succes!";
    msg.style.color = "green";
    document.getElementById("firma-signup-form").reset();

  } catch (error) {
    msg.textContent = "Eroare: " + error.message;
    msg.style.color = "red";
  }
});

// Autentificare firmă
document.getElementById("firma-login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("firma-login-email").value.trim();
  const password = document.getElementById("firma-login-password").value;
  const msg = document.getElementById("firma-login-message");

  try {
    await auth.signInWithEmailAndPassword(email, password);
    msg.textContent = "Autentificare firmă reușită!";
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = "Eroare: " + error.message;
    msg.style.color = "red";
  }
});
