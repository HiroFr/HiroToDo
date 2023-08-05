// Récupérer les éléments du DOM
const openEditModalBtn = document.querySelectorAll(".iEdit");
const editModal = document.getElementById("editModal");
const cancelEditBtn = document.getElementById("cancelEditItemBtn");
const editBtn = document.getElementById("editItemBtn");
const editTitleInput = document.getElementById("editTitle");
const editDescriptionInput = document.getElementById("editDescription");

let currentIndex = -1;

function setupEditButtons() {
    const editButtons = document.querySelectorAll(".iEdit");
    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openEditModal(index));
    });
}

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

cancelEditBtn.addEventListener("click", cancelEditModal);