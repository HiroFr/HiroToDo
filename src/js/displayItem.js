// Fonction pour récupérer les éléments depuis le localStorage
function getItemsFromLocalStorage() {
    const itemsJSON = localStorage.getItem("items");
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

// Fonction pour sauvegarder les éléments dans le localStorage
function saveItemsToLocalStorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
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
                <span class="zdtName">${item.title || "Il n'y a pas de titre"}</span> <!-- zone de texte -->
                <span class="zdtDesc">${convertLinksToAnchorTags(item.description)}</span> <!-- zone de texte -->
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

// Appel initial pour afficher les éléments existants (s'il y en a)
displayItems();