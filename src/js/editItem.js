const jourSelect = document.getElementById('editJour');
const moisSelect = document.getElementById('editMois');
const editModal = document.getElementById("editModal");
const editBtn = document.getElementById("editItemBtn");
const anneeSelect = document.getElementById('editAnnee');
const heureSelect = document.getElementById('editHeure');
const minuteSelect = document.getElementById('editMinute');
const editCheckID = document.getElementById('editCheckID');
const editTitleInput = document.getElementById("editTitle");
const openEditModalBtn = document.querySelectorAll(".iEdit");
const cancelEditBtn = document.getElementById("cancelEditItemBtn");
const editDescriptionInput = document.getElementById("editDescription");
const editSelectorReminder = document.getElementById("editSelectorReminder");

var currentIndex = -1;

for (var i = 0; i < 24; i++) { heureSelect.options[heureSelect.options.length] = new Option(i, i); }

for (var i = 0; i < 60; i++) { minuteSelect.options[minuteSelect.options.length] = new Option(i, i); }

for (var i = 1; i <= 31; i++) { jourSelect.options[jourSelect.options.length] = new Option(i, i); }

for (var i = 1; i <= 12; i++) { moisSelect.options[moisSelect.options.length] = new Option(i, i); }

for (var i = 2050; i >= 2023; i--) { anneeSelect.options[anneeSelect.options.length] = new Option(i, i); }

function askReminder() {
  if (editCheckID.checked == false) {
    editSelectorReminder.style.display = 'none';
    console.log("C'est caché");
  } else {
    editSelectorReminder.style.display = 'flex';
    console.log("C'est pas caché");
  }
}

editCheckID.addEventListener("change", askReminder);

function saveEditChanges() {
  const newName = editTitleInput.value.trim();
  const newDescription = editDescriptionInput.value.trim();

  var day = jourSelect.options[jourSelect.selectedIndex].value;
  var month = moisSelect.options[moisSelect.selectedIndex].value - 1;
  var years = anneeSelect.options[anneeSelect.selectedIndex].value;
  var hours = heureSelect.options[heureSelect.selectedIndex].value - 1;
  var minutes = minuteSelect.options[minuteSelect.selectedIndex].value;
  var dateRappelObject = new Date(Date.UTC(years, month, day, hours, minutes)).getTime();
  //console.log(dateRappelObject.getUTCDate() + "/" + (dateRappelObject.getUTCMonth() + 1) + "/" + dateRappelObject.getUTCFullYear() + "-" + dateRappelObject.getUTCHours() + "h" + dateRappelObject.getUTCMinutes() + "min");
  var currentlyDate = new Date().getTime();

  if (currentlyDate >= dateRappelObject) {
    errorMessage();
    console.log(`ERREUR : La date doit être supérieure à celle de maintenant ! Date et heure aujourd'hui : ${new Date(currentlyDate)} Date et heure autre : ${new Date(dateRappelObject)}`);
  } else if (newName !== "" || newDescription !== "") {
    getItemsFromLocalStorage(function (items) {
      try {
        const itemsArray = JSON.parse(items);
        const currentItem = itemsArray[currentIndex];
        currentItem.title = newName;
        currentItem.description = newDescription;
        currentItem.reminder = dateRappelObject;

        const itemsString = JSON.stringify(itemsArray);
        saveItemsToLocalStorage(itemsString);
      } catch (error) {
        console.error('Erreur lors de l\'analyse de items:', error);
      }
      
      displayItems();
      cancelEditModal();
    });
  } else {
    errorMessageVoid();
    console.log('Vous devez remplir un champs.');
  }
  
}

function openEditModal(index) {
  console.log("Ouverture du modal d'édition pour l'index :", index);

  getItemsFromLocalStorage(function (items) {
    try {
      const editTitleInput = document.getElementById("editTitle");
      const editDescriptionInput = document.getElementById("editDescription");
      const itemsArray = JSON.parse(items);
      const currentItem = itemsArray[index];
      currentIndex = index;

      editTitleInput.value = currentItem.title;
      editDescriptionInput.value = currentItem.description;
      editModal.style.display = "block";

      if ('reminder' in currentItem) {
        const reminderDate = new Date(currentItem.reminder);

        var jour = reminderDate.getDate();
        var mois = reminderDate.getMonth() + 1;
        var annee = reminderDate.getFullYear();
        var heure = reminderDate.getHours();
        var minutes = reminderDate.getMinutes();

        document.getElementById('editJour').value = jour;
        document.getElementById('editMois').value = mois;
        document.getElementById('editAnnee').value = annee;
        document.getElementById('editHeure').value = heure;
        document.getElementById('editMinute').value = minutes;
      } else {
        console.log("Pas de date de rappel définie pour cet élément.");
      }

    } catch (error) {
      console.error('Erreur lors de l\'analyse de items:', error);
    }
  });
}


function cancelEditModal() {
  editModal.style.display = "none";
}

openEditModalBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => openEditModal(index));
});

editBtn.addEventListener("click", saveEditChanges);

cancelEditBtn.addEventListener("click", cancelEditModal);