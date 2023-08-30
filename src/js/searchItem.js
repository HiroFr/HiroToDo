const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === "") {
        displayAllElements();
    } else {
        filterItemsByTitle(searchTerm);
    }
});

function filterItemsByTitle(searchTerm) {
    const allElements = document.querySelectorAll(".allElement");

    allElements.forEach(element => {
        const title = element.querySelector(".zdtName").textContent.toLowerCase();
        
        if (!title.includes(searchTerm)) {
            element.style.display = "none";
        }
    });
}

filterItemsByTitle("");

function displayAllElements() {
    const allElements = document.querySelectorAll(".allElement");

    allElements.forEach(element => {
        element.style.display = "flex";
    });
}