document.addEventListener("DOMContentLoaded", () => {
  const nume = localStorage.getItem("candidatNume") || "Candidat";
  const email = localStorage.getItem("candidatEmail") || "nedefinit";

  document.getElementById("profile-nume").textContent = nume;
  document.getElementById("candidat-nume").textContent = nume;
  document.getElementById("profile-email").textContent = email;

  // Creare CV automat
  const cvText = `
CV - ${nume}
==========================
Email: ${email}

Despre mine:
- Experiență relevantă în HoReCa
- Abilități: lucru în echipă, atenție la detalii, comunicare

Vreau să lucrez cu pasiune și profesionalism!
`;
  document.getElementById("generated-cv").value = cvText;

  // Generare PDF la click
  document.getElementById("download-cv").addEventListener("click", () => {
    const opt = {
      margin: 1,
      filename: `CV_${nume.replace(/ /g, "_")}.pdf`,
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const cvElement = document.getElementById("generated-cv");
    html2pdf().from(cvElement).set(opt).save();
  });

  // Logout
  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("candidatEmail");
    localStorage.removeItem("candidatNume");
    window.location.href = "login.html";
  });
});
