const openEditModalBtn = document.querySelectorAll(".iEdit");
const editModal = document.getElementById("editModal");
const cancelEditBtn = document.getElementById("cancelEditItemBtn");
const editBtn = document.getElementById("editItemBtn");
const editTitleInput = document.getElementById("editTitle");
const editDescriptionInput = document.getElementById("editDescription");

let currentIndex = -1;

function openEditModal(index) {
    currentIndex = index;
    const items = getItemsFromLocalStorage();
    const currentItem = items[index];
    editTitleInput.value = currentItem.title;
    editDescriptionInput.value = currentItem.description;
    editModal.style.display = "block";
}

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
    }
}

function cancelEditModal() {
    editModal.style.display = "none";
}

openEditModalBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => openEditModal(index));
});

editBtn.addEventListener("click", saveEditChanges);

cancelEditBtn.addEventListener("click", cancelEditModal);