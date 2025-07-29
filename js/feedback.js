document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nume = document.getElementById("nume").value;
  const rol = document.getElementById("rol").value;
  const punctaj = document.getElementById("punctaj").value;
  const comentariu = document.getElementById("comentariu").value;

  const container = document.getElementById("listaFeedbackuri");
  const entry = document.createElement("div");
  entry.className = "feedback-entry";
  entry.innerHTML = `
    <h3>${nume} - ${rol}</h3>
    <p><strong>Punctaj:</strong> ${punctaj}</p>
    <p><strong>Comentariu:</strong> ${comentariu}</p>
  `;

  container.prepend(entry);

  this.reset();
});
