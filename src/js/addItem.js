const openAddModalBtn = document.getElementById("btnOpenAddModal");
const addModal = document.getElementById("addModal");
const addItemBtn = document.getElementById("addItemBtn");
const cancelAddBtn = document.getElementById("cancelAddItemBtn");
const nameInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const iconFullScreen = document.getElementById("iconFullScreen");
const addModalContent = document.getElementById("modalContent");
const jourSelect = document.getElementById('jour');
const moisSelect = document.getElementById('mois');
const anneeSelect = document.getElementById('annee');
const heureSelect = document.getElementById('heure');
const minuteSelect = document.getElementById('minute');
const checkID = document.getElementById('checkID');
const selectorReminder = document.getElementById('selectorReminder');

for (var i = 1; i < 24; i++) {
    heureSelect.options[heureSelect.options.length] = new Option(i, i);
}

for (var i = 1; i < 60; i++) {
    minuteSelect.options[minuteSelect.options.length] = new Option(i, i);
}

for (var i = 1; i <= 31; i++) {
    jourSelect.options[jourSelect.options.length] = new Option(i, i);
}

for (var i = 1; i <= 12; i++) {
    moisSelect.options[moisSelect.options.length] = new Option(i, i);
}

for (var i = 2100; i >= 2023; i--) {
    anneeSelect.options[anneeSelect.options.length] = new Option(i, i);
}

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
    var hours = heureSelect.options[heureSelect.selectedIndex].value;
    var minutes = minuteSelect.options[minuteSelect.selectedIndex].value;

    //var dateRappel = `${years}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}T${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:00.000Z`;
    //console.log(dateRappel);
    var dateRappelObject = new Date(Date.UTC(years, month, day, hours, minutes));

    //console.log(dateRappelObject.getUTCDate() + "/" + (dateRappelObject.getUTCMonth() + 1) + "/" + dateRappelObject.getUTCFullYear() + "-" + dateRappelObject.getUTCHours() + "h" + dateRappelObject.getUTCMinutes() + "min");

    var currentlyDate = new Date();

    var jourToday = currentlyDate.getDate();
    var moisToday = currentlyDate.getMonth();
    var anneeToday = currentlyDate.getFullYear();
    var heureToday = currentlyDate.getHours();
    var minutesToday = currentlyDate.getMinutes();

    var jourOther = dateRappelObject.getUTCDate();
    var moisOther = dateRappelObject.getUTCMonth();
    var anneeOther = dateRappelObject.getUTCFullYear();
    var heureOther = dateRappelObject.getUTCHours();
    var minutesOther = dateRappelObject.getUTCMinutes();

    if (jourToday >= jourOther &&
        moisToday >= moisOther &&
        anneeToday >= anneeOther &&
        heureToday >= heureOther &&
        minutesToday >= minutesOther)
    {
        return console.log(`"ERREUR : La date doit être supérieur à celle de maintenant !` + ` ` + `Date et heure aujourd'hui : ${jourToday}/${moisToday}/${anneeToday}-${heureToday}h${minutesToday}min`+ ` ` + `Date et heure autre : ${jourOther}/${moisOther}/${anneeOther}-${heureOther}h${minutesOther}min`);
        //return addToDo.innerHTML = "";
    };
    
    if (itemTitle.trim() || itemDescription.trim() !== "") {
        const items = getItemsFromLocalStorage();
        if (checkID.checked == false) {
          const newItemWithoutReminder = {
            title: itemTitle,
            description: itemDescription
          };
          items.push(newItemWithoutReminder);
          console.log("newItemWithoutReminder");
        } else {
          const newItem = {
            title: itemTitle,
            description: itemDescription,
            reminder: dateRappelObject
          };
          items.push(newItem);
          console.log("newItemWithReminder");
        }
        saveItemsToLocalStorage(items);
        nameInput.value = "";
        descriptionInput.value = "";
        dateRappelObject.value = "";

        displayItems();
        cancelAddModal();
    }
}

function openAddModal() {
    addModal.style.display = "block";
}

/* function fullScreen() {
    if (addModalContent.style.width == "97%") {
        addModalContent.style.width = "30%";
        iconFullScreen.src = "../../assets/icon/fullscreen.svg";
    } else {
        addModalContent.style.width = "97%";
        iconFullScreen.src = "../../assets/icon/fullscreen_exit.svg";
    }
} */

function cancelAddModal() {
    addModal.style.display = "none";
    nameInput.value = "";
    descriptionInput.value = "";
}



cancelAddBtn.addEventListener("click", cancelAddModal);

openAddModalBtn.addEventListener("click", openAddModal);

addItemBtn.addEventListener("click", addItem);

/* iconFullScreen.addEventListener("click", fullScreen); */