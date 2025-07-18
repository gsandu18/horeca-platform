document.addEventListener("DOMContentLoaded", () => {
  const nume = localStorage.getItem("candidatNume") || "Candidat";
  const email = localStorage.getItem("candidatEmail") || "nedefinit";
  const educatie = localStorage.getItem("educatie") || "";
  const experienta = localStorage.getItem("experienta") || "";
  const pic = localStorage.getItem("profilePic");

  document.getElementById("profile-nume").textContent = nume;
  document.getElementById("candidat-nume").textContent = nume;
  document.getElementById("profile-email").textContent = email;
  document.querySelector("textarea[name='educatie']").value = educatie;
  document.querySelector("textarea[name='experienta']").value = experienta;

  if (pic) document.getElementById("profile-pic").src = pic;
  generateCV();

  document.getElementById("upload-pic").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("profilePic", reader.result);
      document.getElementById("profile-pic").src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const ed = e.target.educatie.value.trim();
    const exp = e.target.experienta.value.trim();
    localStorage.setItem("educatie", ed);
    localStorage.setItem("experienta", exp);
    generateCV();
    alert("Profil salvat cu succes!");
  });

  document.getElementById("download-cv").addEventListener("click", () => {
    html2pdf().from(document.querySelector("#generated-cv")).save(
      `CV_${nume.replace(/ /g,"_")}.pdf`
    );
  });

  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("candidatEmail");
    localStorage.removeItem("candidatNume");
    window.location.href = "login.html";
  });

  function generateCV() {
    const ed = localStorage.getItem("educatie") || "";
    const exp = localStorage.getItem("experienta") || "";
    document.getElementById("generated-cv").innerHTML = `
      <h2>${nume}</h2>
      <p><strong>Email:</strong> ${email}</p>
      ${ed ? `<p><strong>Educație:</strong> ${ed}</p>` : ""}
      ${exp ? `<p><strong>Experiență:</strong> ${exp}</p>` : ""}
    `;
  }
});
