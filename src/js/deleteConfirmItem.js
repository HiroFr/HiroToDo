// Récupérer les éléments du DOM
const openDeleteModalBtn = document.querySelectorAll(".iDelete");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteItemBtn");
const deleteBtn = document.getElementById("deleteItemBtn");
const deleteTitleInput = document.getElementById("deleteTitle");
let currentIndexToDelete = -1; // Garder une trace de l'index actuel à supprimer

function openDeleteModal(index) {
    const items = getItemsFromLocalStorage();
    currentIndexToDelete = index; // Mettre à jour l'index actuel à supprimer
    deleteTitleInput.value = items[index].title;
    deleteModal.style.display = "block";
}

function deleteItem() {
    const items = getItemsFromLocalStorage();
    items.splice(currentIndexToDelete, 1); // Utiliser l'index actuel
    saveItemsToLocalStorage(items);
    displayItems();
    cancelDeleteModal();
}

function cancelDeleteModal() {
    deleteModal.style.display = "none";
}

deleteBtn.addEventListener("click", () => {
    if (currentIndexToDelete !== -1) {
        deleteItem(currentIndexToDelete);
    }
});


cancelDeleteBtn.addEventListener("click", cancelDeleteModal);