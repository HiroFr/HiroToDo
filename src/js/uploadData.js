const openUploadButton = document.getElementById("openUploadButton");
const uploadModal = document.getElementById("uploadModal");
const cancelUploadButton = document.getElementById("cancelUploadBtn");
const uploadButton = document.getElementById("uploadButton");

const confirmModal = document.getElementById("confirmModal");
const uploadConfirmButton = document.getElementById("uploadConfirmButton");
const cancelUploadConfirmButton = document.getElementById("cancelUploadConfirmBtn");

const fileInput = document.getElementById('fileInput');

function openUploadBtn() {
  uploadModal.style.display = "block";
}

function openUploadConfirmBtn() {
  confirmModal.style.display = "block";
}

function cancelUploadBtn() {
  uploadModal.style.display = "none";
}

function cancelUploadConfirmBtn () {
  confirmModal.style.display ="none";
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
      chrome.runtime.reload();
  }
});

const nameFile = document.getElementById('displayNameFile');
const nameFileOther = document.getElementById('displayNameFileOther');

let selectedFileName = '';

fileInput.addEventListener('change', function(e) {
    const nomFichier = e.target.files[0].name;
    selectedFileName = nomFichier;
    if (nameFile) {
        nameFile.innerHTML = nomFichier;
    }
    displayFileNameElsewhere();
});

function displayFileNameElsewhere() {
    if (nameFileOther) {
        nameFileOther.innerHTML = selectedFileName;
    }
}

fileInput.addEventListener('change', function(){
  if(fileInput.value === ''){
    uploadConfirmButton.disabled = true;
    uploadConfirmButton.style.cursor = 'not-allowed';
    uploadConfirmButton.style.backgroundColor = '#B5B2BC';
    uploadConfirmButton.style.borderColor = '#B5B2BC';
    uploadConfirmButton.style.color = '#232225';
  } 
  else{
    uploadConfirmButton.disabled = false;
    uploadConfirmButton.style.cursor = 'pointer';
    uploadConfirmButton.style.backgroundColor = '#174933';
    uploadConfirmButton.style.borderColor = '#174933';
    uploadConfirmButton.style.color = '#EEEEF0';
  }
})

openUploadButton.addEventListener("click", openUploadBtn);
uploadConfirmButton.addEventListener("click", openUploadConfirmBtn);
cancelUploadButton.addEventListener("click", cancelUploadBtn);
cancelUploadConfirmButton.addEventListener("click", cancelUploadConfirmBtn);