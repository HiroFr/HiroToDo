const openUploadButton = document.getElementById("openUploadButton");
const uploadModal = document.getElementById("uploadModal");
const cancelUploadButton = document.getElementById("cancelUploadBtn");
const uploadButton = document.getElementById("uploadButton");

function openUploadBtn() {
  uploadModal.style.display = "block";
}

function cancelUploadBtn() {
  uploadModal.style.display = "none";
}

document.getElementById('uploadButton').addEventListener('click', function () {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
          const jsonData = event.target.result;
          try {
            localStorage.setItem("items", jsonData);
              alert("La data à été importé avec succès !\nVous devez recharger l'extension.");
          } catch (error) {
              alert("Erreur lors de l'import.");
          }
      };
      reader.readAsText(file);
  }
});

document.getElementById('fileInput').addEventListener('change', function(e) {
  var nomFichier = e.target.files[0].name;
  var nameFile = document.getElementById("displayNameFile");
  if(nameFile) {
    nameFile.innerHTML = nomFichier;
  }
});

openUploadButton.addEventListener("click", openUploadBtn);
cancelUploadButton.addEventListener("click", cancelUploadBtn);