document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadData");

  downloadButton.addEventListener("click", function () {
    getItemsFromLocalStorage(function (items) {
      const itemsStringify = JSON.stringify(items, null, 2);
      const dataURL = "data:text/json;charset=utf-8," + encodeURIComponent(itemsStringify);
      

      chrome.downloads.download({
          url: dataURL,
          filename: "HiroData.json",
          conflictAction: "uniquify",
          saveAs: true
      });
    });
  });
});