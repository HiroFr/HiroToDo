// Fonction pour récupérer les éléments depuis le localStorage
function getItemsFromLocalStorage() {
    const itemsJSON = localStorage.getItem("items");
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

// Fonction pour sauvegarder les éléments dans le localStorage
function saveItemsToLocalStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

// Fonction pour ajouter un élément
function addItem() {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const itemName = nameInput.value;
    const itemDescription = descriptionInput.value;

    if (itemName.trim() && itemDescription.trim() !== "") {
        const newItem = { name: itemName, description: itemDescription };
        const items = getItemsFromLocalStorage();
        items.push(newItem);
        saveItemsToLocalStorage(items);
        nameInput.value = "";
        displayItems();
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
                <span class="zdtName">${item.name}</span> <!-- zone de texte -->
                <span class="zdtDesc">${item.description}</span> <!-- zone de texte -->
            </div>
            <div class="moreIcon">
            <img class="iDelete" src="../assets/icon/delete.svg" alt="Supprimer"> <!-- icône Modifier -->
            <img class="iEdit" src="../assets/icon/edit.svg" alt="Modifier"> <!-- icône Supprimer -->
            </div>
        </div>`;
        itemList.appendChild(addToDo);
    });

    // Ajouter les gestionnaires d'événements pour les boutons Modifier et Supprimer
    const editButtons = document.querySelectorAll(".iEdit");
    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => editItem(index));
    });

    const deleteButtons = document.querySelectorAll(".iDelete");
    deleteButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => deleteItem(index));
    });
}

// Fonction pour éditer un élément
function editItem(index) {
    const newName = prompt("Modifier la note :");
    if (newName !== null && newName.trim() !== "") {
        const items = getItemsFromLocalStorage();
        items[index].name = newName;
        saveItemsToLocalStorage(items);
        displayItems();
    }
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
