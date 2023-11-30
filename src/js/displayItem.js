function getItemsFromLocalStorage(callback) {
    chrome.storage.local.get(['items'], function(result) {
        callback(result.items ? result.items : "[]");
    });
}

function saveItemsToLocalStorage(items) {
    chrome.storage.local.set({items: items}, function() {
        if (chrome.runtime.lastError) {
            console.error('Une erreur s\'est produite lors de l\'enregistrement des données :', chrome.runtime.lastError);
        } else {
            console.log(items);
        }
    });
}


function displayItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    getItemsFromLocalStorage(function (items) {
            try {
                const itemsString = JSON.parse(items);
                itemsString.forEach(function(item) {
                const addToDo = document.createElement("div");
                addToDo.innerHTML = `
                <div class="allElement"> <!-- note avec l'encoche, la zone de texte, le bouton supprimé et le bouton d'édition -->
                    <div class="zdtDiv"> <!-- Boite pour le texte -->
                        <span title="${item.title}" class="zdtName">${item.title || "Aucun titre"}</span> <!-- zone de texte -->
                        <span title="${item.description}" class="zdtDesc">${convertLinksToAnchorTags(item.description) || "Aucune Description"}</span> <!-- zone de texte -->
                    </div>
                    <div class="moreIcon">
                        <img class="iEdit" src="../assets/icon/edit.svg" alt="Modifier"> <!-- icône Supprimer -->
                        <img class="iDelete" src="../assets/icon/delete.svg" alt="Supprimer"> <!-- icône Modifier -->
                    </div>
                </div>`;
                itemList.appendChild(addToDo);
            })
        } catch (error) {
            console.error('Erreur lors de l\'analyse de items:', error);
        }

        const openDeleteModalBtn = document.querySelectorAll(".iDelete");
        openDeleteModalBtn.forEach((btn, index) => {

            btn.addEventListener("click", () => openDeleteModal(index));
        });

        const openEditModalBtn = document.querySelectorAll(".iEdit");
        openEditModalBtn.forEach((btn, index) => {
            btn.addEventListener("click", () => openEditModal(index));
        });


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