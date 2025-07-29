document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nume = document.getElementById("nume").value.trim();
  const rol = document.getElementById("rol").value.trim();
  const punctaj = document.getElementById("punctaj").value.trim();
  const comentariu = document.getElementById("comentariu").value.trim();

  if (!nume || !rol || !punctaj || !comentariu) return;

  const container = document.getElementById("listaFeedbackuri");

  const entry = document.createElement("div");
  entry.className = "feedback-entry";
  entry.innerHTML = `
    <h4>${nume} - ${rol}</h4>
    <p><strong>Punctaj:</strong> ${punctaj}</p>
    <p><strong>Comentariu:</strong> ${comentariu}</p>
  `;

  container.prepend(entry);
  this.reset();
});
