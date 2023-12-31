const openAddModalBtn = document.getElementById("btnOpenAddModal");
const addModal = document.getElementById("addModal");
const addItemBtn = document.getElementById("addItemBtn");
const cancelAddBtn = document.getElementById("cancelAddItemBtn");
const nameInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");

function addItem() {
    const itemTitle = nameInput.value;
    const itemDescription = descriptionInput.value;

    if (itemTitle.trim() || itemDescription.trim() !== "") {
        const newItem = { title: itemTitle, description: itemDescription };
        const items = getItemsFromLocalStorage();
        items.push(newItem);
        saveItemsToLocalStorage(items);
        nameInput.value = "";
        descriptionInput.value = "";
        displayItems();
        cancelAddModal();
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

cancelAddBtn.addEventListener("click", cancelAddModal);

openAddModalBtn.addEventListener("click", openAddModal);

addItemBtn.addEventListener("click", addItem);