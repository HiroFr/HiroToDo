function getItemsFromLocalStorage() {
    const itemsJSON = localStorage.getItem("items");
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

function saveItemsToLocalStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

function displayItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    const items = getItemsFromLocalStorage();
    items.forEach((item) => {
        const addToDo = document.createElement("div");
        addToDo.innerHTML = `
        <div class="allElement"> <!-- note avec l'encoche, la zone de texte, le bouton supprimé et le bouton d'édition -->
            <div class="zdtDiv"> <!-- Boite pour le texte -->
                <span title="${item.title}" class="zdtName">${item.title || "Aucun titre"}</span> <!-- zone de texte -->
                <span title="${item.description}" class="zdtDesc">${convertLinksToAnchorTags(item.description) || "Aucune Description"}</span> <!-- zone de texte -->
            </div>
            <div class="moreIcon">
            <img class="iDelete" src="../assets/icon/delete.svg" alt="Supprimer"> <!-- icône Modifier -->
            <img class="iEdit" src="../assets/icon/edit.svg" alt="Modifier"> <!-- icône Supprimer -->
            </div>
        </div>`;
        itemList.appendChild(addToDo);
    });
    
    const editButtons = document.querySelectorAll(".iEdit");
    editButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openEditModal(index));
    });

    const openDeleteModalBtn = document.querySelectorAll(".iDelete");
    openDeleteModalBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => openDeleteModal(index));
    });
}

function convertLinksToAnchorTags(text) {
    const linkRegex = /(?:https?|ftp):\/\/[^\s]+/g;

    const replacedText = text.replace(linkRegex, (match) => {
        return `<a class="links" href="${match}" target="_blank">${match}</a>`;
    });

    return replacedText;
}

displayItems();