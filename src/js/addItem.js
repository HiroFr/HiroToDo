document.addEventListener('DOMContentLoaded', function() {

const nameInput = document.getElementById("title");
const jourSelect = document.getElementById('jour');
const moisSelect = document.getElementById('mois');
const checkID = document.getElementById('checkID');
const anneeSelect = document.getElementById('annee');
const heureSelect = document.getElementById('heure');
const addModal = document.getElementById("addModal");
const minuteSelect = document.getElementById('minute');
const addItemBtn = document.getElementById("addItemBtn");
const descriptionInput = document.getElementById("description");
const cancelAddBtn = document.getElementById("cancelAddItemBtn");
const openAddModalBtn = document.getElementById("btnOpenAddModal");
const selectorReminder = document.getElementById('selectorReminder');

for (var i = 0; i < 24; i++) { heureSelect.options[heureSelect.options.length] = new Option(i, i); }

for (var i = 0; i < 60; i++) { minuteSelect.options[minuteSelect.options.length] = new Option(i, i); }

for (var i = 1; i <= 31; i++) { jourSelect.options[jourSelect.options.length] = new Option(i, i); }

for (var i = 1; i <= 12; i++) { moisSelect.options[moisSelect.options.length] = new Option(i, i); }

for (var i = 2050; i >= 2023; i--) { anneeSelect.options[anneeSelect.options.length] = new Option(i, i); }

function askReminder() {
  if (checkID.checked == false) {
    selectorReminder.style.display = 'none';
    console.log("C'est caché");
  } else {
    selectorReminder.style.display = 'flex';
    console.log("C'est pas caché");
  }
}

checkID.addEventListener("change", askReminder);

function addItem() {
    const itemTitle = nameInput.value;
    const itemDescription = descriptionInput.value;
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
    console.log(`"ERREUR : La date doit être supérieur à celle de maintenant !` + ` ` + `Date et heure aujourd'hui : ${new Date(currentlyDate)}`+ ` ` + `Date et heure autre : ${new Date(dateRappelObject)}`);
    } else if (itemTitle.trim() || itemDescription.trim() !== "") {
        getItemsFromLocalStorage(function (items) {
          if (typeof items === 'string') {
            try {
                const itemsArray = JSON.parse(items);
                const newItem = checkID.checked == false ? 
                    { title: itemTitle, description: itemDescription } : 
                    { title: itemTitle, description: itemDescription, reminder: dateRappelObject };
                itemsArray.push(newItem);
                const itemsString = JSON.stringify(itemsArray);
                saveItemsToLocalStorage(itemsString);
                nameInput.value = "";
                descriptionInput.value = "";
            } catch (error) {
                console.error('Erreur lors de l\'analyse de items:', error);
            }
        } else {
            console.error('items n\'est pas une chaîne de caractères :', items);
        }
        displayItems();
        cancelAddModal();
      });
    } else {
      errorMessageVoid();
      console.log('Vous devez remplir un champs.');
    }
}

function openAddModal() {
    addModal.style.display = "block";
}

function cancelAddModal() {
    addModal.style.display = "none";
    nameInput.value = "";
    descriptionInput.value = "";
}

addItemBtn.addEventListener("click", addItem);
cancelAddBtn.addEventListener("click", cancelAddModal);
openAddModalBtn.addEventListener("click", openAddModal);

});