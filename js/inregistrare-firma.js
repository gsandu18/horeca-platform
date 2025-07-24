firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const numeFirma = form.numeFirma.value.trim();
  const emailFirma = form.emailFirma.value.trim();
  const persoanaContact = form.persoanaContact.value.trim();
  const telefon = form.telefon.value.trim();
  const documentFile = form.document.files[0];

  const passwordGenerata = Math.random().toString(36).slice(-8);

  try {
    // ✅ 1. Creează cont firma
    const userCredential = await auth.createUserWithEmailAndPassword(emailFirma, passwordGenerata);
    const firmaUID = userCredential.user.uid;

    // ✅ 2. Încarcă document validare
    const storageRef = storage.ref(`validari_firme/${firmaUID}/${documentFile.name}`);
    const uploadResult = await storageRef.put(documentFile);
    const documentURL = await uploadResult.ref.getDownloadURL();

    // ✅ 3. Salvează date firmă în Firestore
    await db.collection("firme").doc(firmaUID).set({
      nume: numeFirma,
      email: emailFirma,
      contact: persoanaContact,
      telefon,
      documentURL,
      activ: false,
      dataInregistrare: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Cererea a fost trimisă. Veți primi un email după validare.");
    form.reset();
  } catch (err) {
    console.error("Eroare înregistrare firmă:", err.message);
    alert("A apărut o eroare: " + err.message);
  }
