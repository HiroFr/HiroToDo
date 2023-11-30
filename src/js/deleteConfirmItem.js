const openDeleteModalBtn = document.querySelectorAll(".iDelete");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteItemBtn");
const deleteBtn = document.getElementById("deleteItemBtn");


var currentIndexToDelete = -1;

function deleteItem() {
  getItemsFromLocalStorage(function (items) {
    try {
      const itemsArray = JSON.parse(items);
      itemsArray.splice(currentIndexToDelete, 1);
      const itemsSting = JSON.stringify(itemsArray);
      saveItemsToLocalStorage(itemsSting);
    } catch (error) {
      console.error('Erreur lors de l\'analyse de items:', error);
    }
    displayItems();
    cancelDeleteModal();
  });
}

function openDeleteModal(index) {
  console.log("Ouverture du modal de delete pour l'index :", index);
  
  getItemsFromLocalStorage(function (items) {
      try {
        const deleteTitleInput = document.getElementById("deleteTitle");
        const itemsString = JSON.parse(items);
        currentIndexToDelete = index;

        deleteTitleInput.value = itemsString[index].title;
        deleteModal.style.display = "block";
        
      } catch (error) {
        console.error('Erreur lors de l\'analyse de items:', error);
      }
  });
}

function cancelDeleteModal() {
  deleteModal.style.display = "none";
}

openDeleteModalBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => openDeleteModal(index));
});

deleteBtn.addEventListener("click", () => {
  if (currentIndexToDelete !== -1) {
      deleteItem(currentIndexToDelete);
  }
});

cancelDeleteBtn.addEventListener("click", cancelDeleteModal);