const openDeleteModalBtn = document.querySelectorAll(".iDelete");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteItemBtn");
const deleteBtn = document.getElementById("deleteItemBtn");
const deleteTitleInput = document.getElementById("deleteTitle");
let currentIndexToDelete = -1;

function openDeleteModal(index) {
    const items = getItemsFromLocalStorage();
    currentIndexToDelete = index;
    deleteTitleInput.value = items[index].title;
    deleteModal.style.display = "block";
}

function deleteItem() {
    const items = getItemsFromLocalStorage();
    items.splice(currentIndexToDelete, 1);
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