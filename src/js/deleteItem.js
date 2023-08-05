function deleteItem(index) {
    const items = getItemsFromLocalStorage();
    items.splice(index, 1);
    saveItemsToLocalStorage(items);
    displayItems();
}