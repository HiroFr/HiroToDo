document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadData");

  downloadButton.addEventListener("click", function () {
    // Code pour générer le contenu JSON à télécharger
    const itemsJSON = localStorage.getItem("items");
    const itemsStringify = JSON.stringify(itemsJSON, null, 2).replace(/^\[?"|\\r|\\n|\\|"$/g, ''); //indentation null, 2
    const dataURL = "data:text/json;charset=utf-8," + encodeURIComponent(itemsStringify);

    // Télécharger le fichier JSON
    chrome.downloads.download({
      url: dataURL,
      filename: "HiroData.json",
      conflictAction: "uniquify",
      saveAs: true
    });
  });
});