firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

emailjs.init("user_ABC123"); // <- adaugă aici user ID de la EmailJS

document.getElementById("validare-firma-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;

  const numeFirma = f.numeFirma.value.trim();
  const emailFirma = f.emailFirma.value.trim();
  const persoanaContact = f.persoanaContact.value.trim();
  const telefon = f.telefon.value.trim();
  const documentFile = f.document.files[0];

  const passwordGenerata = Math.random().toString(36).slice(-8);

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(emailFirma, passwordGenerata);
    const uid = userCredential.user.uid;

    const storageRef = storage.ref(`validari_firme/${uid}/${documentFile.name}`);
    const uploadResult = await storageRef.put(documentFile);
    const documentURL = await uploadResult.ref.getDownloadURL();

    await db.collection("firme").doc(uid).set({
      nume: numeFirma,
      email: emailFirma,
      contact: persoanaContact,
      telefon,
      documentURL,
      activ: false,
      dataInregistrare: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 🔗 Trimite email cu parola
    await emailjs.send("service_xxx", "template_yyy", {
      to_email: emailFirma,
      firma_name: numeFirma,
      password: passwordGenerata
    });

    alert("Cererea trimisă și parola trimisă pe email!");
    f.reset();

  } catch (err) {
    console.error("Eroare înregistrare azi:", err.message);
    alert("Eroare: " + err.message);
  }
});
