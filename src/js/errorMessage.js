function errorMessage() {
  const errorDiv = document.getElementById("error");
  errorDiv.style.display = "block";
  
  const errorDate = document.createElement("div");
  errorDate.innerHTML = `
  <div class="errorBox">
    <img src="../assets/icon/error.svg" alt="error">
    <span class="errorMessage">La date doit être supérieur à celle de maintenant.</span>
  </div>`;
  errorDiv.appendChild(errorDate);

  setTimeout(function() {
      errorDiv.style.display = "none";
  }, 5000);
};

function errorMessageVoid() {
  const errorDiv = document.getElementById("error");
  errorDiv.style.display = "block";
  
  const errorDate = document.createElement("div");
  errorDate.innerHTML = `
  <div class="errorBox">
    <img src="../assets/icon/error.svg" alt="error">
    <span class="errorMessage">Vous devez remplir un champs.</span>
  </div>`;
  errorDiv.appendChild(errorDate);

  setTimeout(function() {
      errorDiv.style.display = "none";
  }, 5000);
};