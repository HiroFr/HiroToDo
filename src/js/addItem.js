function setupEditButtons() {
    const editButtons = document.querySelectorAll(".iEdit");
    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openEditModal(index));
    });
}

// Fonction pour ajouter un élément
function addItem() {
    const nameInput = document.getElementById("title");
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
        cancelAddModal();
        setupEditButtons();
    }
}

// Open modal
function openAddModal() {
    addModal.style.display = "block";
}

// Cancel modal
function cancelAddModal() {
    addModal.style.display = "none";
}

const openAddModalBtn = document.getElementById("btnOpenAddModal");
const addModal = document.getElementById("addModal");
const addItemBtn = document.getElementById("addItemBtn");
const cancelAddBtn = document.getElementById("cancelAddItemBtn");

cancelAddBtn.addEventListener("click", cancelAddModal);

openAddModalBtn.addEventListener("click", openAddModal);

addItemBtn.addEventListener("click", addItem);