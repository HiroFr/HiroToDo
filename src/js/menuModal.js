const menuModal = document.getElementById("menuModal");
const openMenuModalBtn = document.getElementById("openMenuModalBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");

function openMenuModal() {
  menuModal.style.display = "block";
}

function backToMenu() {
  menuModal.style.display = "none";
}

openMenuModalBtn.addEventListener("click", openMenuModal);
backToMenuBtn.addEventListener("click", backToMenu);