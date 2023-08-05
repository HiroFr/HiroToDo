// Fonction pour récupérer les éléments depuis le localStorage
function getItemsFromLocalStorage() {
    const itemsJSON = localStorage.getItem("items");
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

// Fonction pour sauvegarder les éléments dans le localStorage
function saveItemsToLocalStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

function setupEditButtons() {
    const editButtons = document.querySelectorAll(".iEdit");
    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openEditModal(index));
    });
}

// Fonction pour ajouter un élément
function addItem() {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const itemTitle = nameInput.value;
    const itemDescription = descriptionInput.value;

    if (itemTitle.trim() || itemDescription.trim() !== "") {
        const newItem = { title: itemTitle, description: itemDescription };
        const items = getItemsFromLocalStorage();
        items.push(newItem);
        saveItemsToLocalStorage(items);
        nameInput.value = "";
        displayItems();
        setupEditButtons();
    }
}

// Fonction pour afficher les éléments
function displayItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    const items = getItemsFromLocalStorage();
    items.forEach((item, index) => {
        const addToDo = document.createElement("div");
        addToDo.innerHTML = `
        <div class="allElement"> <!-- note avec l'encoche, la zone de texte, le bouton supprimé et le bouton d'édition -->
            <div class="zdtDiv"> <!-- Boite pour le texte -->
                <span class="zdtName">${item.title}</span> <!-- zone de texte -->
                <span class="zdtDesc">${item.description}</span> <!-- zone de texte -->
            </div>
            <div class="moreIcon">
            <img class="iDelete" src="../assets/icon/delete.svg" alt="Supprimer"> <!-- icône Modifier -->
            <img class="iEdit" src="../assets/icon/edit.svg" alt="Modifier"> <!-- icône Supprimer -->
            </div>
        </div>`;
        itemList.appendChild(addToDo);
    });

    const deleteButtons = document.querySelectorAll(".iDelete");
    deleteButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => deleteItem(index));
    });
}

// Fonction pour supprimer un élément
function deleteItem(index) {
    const items = getItemsFromLocalStorage();
    items.splice(index, 1);
    saveItemsToLocalStorage(items);
    displayItems();
}

// Appel initial pour afficher les éléments existants (s'il y en a)
displayItems();

// Ajouter le gestionnaire d'événement pour le bouton Ajouter en dehors de la fonction displayItems()
document.getElementById("addItemBtn").addEventListener("click", addItem);


// Récupérer les éléments du DOM
const openEditModalBtn = document.querySelectorAll(".iEdit");
const editModal = document.getElementById("editModal");
const cancelBtn = document.getElementById("cancelItemBtn");
const editBtn = document.getElementById("editItemBtn");
const editTitleInput = document.getElementById("editTitle");
const editDescriptionInput = document.getElementById("editDescription");

let currentIndex = -1;

// Fonction pour ouvrir la modal d'édition
function openEditModal(index) {
    currentIndex = index;
    const items = getItemsFromLocalStorage();
    const currentItem = items[index];
    editTitleInput.value = currentItem.title;
    editDescriptionInput.value = currentItem.description;
    editModal.style.display = "block";
}

// Fonction pour enregistrer les modifications dans la modal d'édition
function saveEditChanges() {
    const newName = editTitleInput.value.trim();
    const newDescription = editDescriptionInput.value.trim();
    if (newName !== "" && newDescription !== "") {
        const items = getItemsFromLocalStorage();
        items[currentIndex].title = newName;
        items[currentIndex].description = newDescription;
        saveItemsToLocalStorage(items);
        displayItems();
        cancelEditModal();
        setupEditButtons();
    }
}

// Fonction pour fermer la modal d'édition
function cancelEditModal() {
    editModal.style.display = "none";
}

// Ajouter des gestionnaires d'événements pour les boutons d'édition
openEditModalBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => openEditModal(index));
});

// Ajouter le gestionnaire d'événement pour le bouton "Enregistrer les modifications"
editBtn.addEventListener("click", saveEditChanges);

cancelBtn.addEventListener("click", cancelEditModal);