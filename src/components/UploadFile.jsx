/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { XIcon } from "lucide-react";
import { useState } from "react";
import useStore from "../store/store";
import { storage } from "../utils/storage";

export default function UploadFile({ onClose }) {
  const [file, setFile] = useState(null);
  const addItem = useStore((state) => state.addItem);
  const uploadItems = useStore((state) => state.uploadItems);

  const handleImport = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        if (Array.isArray(jsonData)) {
          uploadItems(jsonData);
        } else {
          addItem(jsonData);
        }
        storage.set("items", jsonData);
      } catch (err) {
        alert("Erreur lors de l'import : fichier invalide");
      }
    };
    reader.readAsText(file);
    onClose();
  };

  const handleDownload = () => {
    const items = useStore.getState().items;
    const itemsStringify = JSON.stringify(items, null, 1);
    const dataURL =
      "data:text/json;charset=utf-8," + encodeURIComponent(itemsStringify);

    if (window.chrome?.storage?.local) {
      chrome.downloads.download({
        url: dataURL,
        filename: "HiroData.json",
        conflictAction: "uniquify",
        saveAs: true,
      });
    } else {
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "HiroData.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-[642px] h-[600px] bg-zinc-800/25 z-50"
      id="uploadFileModal"
    >
      <div
        className="flex flex-col gap-4 py-5 px-6 w-[440px] h-[520px] bg-background dark:bg-background rounded-lg mx-auto my-13"
        id="uploadFileModalContent"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg">Import/Exporter un fichier</span>
          <XIcon
            className="cursor-pointer hover:text-secondary dark:hover:text-secondary"
            onClick={onClose}
          />
        </div>
        <p className="text-center text-md text-primary dark:text-primary w-80 mx-auto">
          Votre fichier se télécharge après avoir enregistré sa destination.
        </p>
        <button
          id="exportItemBtn"
          className="w-full cursor-pointer bg-validate dark:bg-validate border border-validate dark:border-validate p-2 rounded-lg text-general dark:text-general"
          onClick={handleDownload}
          type="button"
        >
          Exporter mes Notes / Todo
        </button>
        <div className="border-t border-secondary"></div>

        <div className="border-2 border-dashed p-2 rounded-lg border-bordercolor dark:border-bordercolor flex flex-col gap-6">
          <div className="flex flex-col items-center text-md text-cancel dark:text-cancel">
            <p>Attention !</p>
            <p className="text-center">
              Cela va remplacer vos précédentes prises de Notes / Todo !
            </p>
            <p className="text-center">Pensez à exporter avant de continuer.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="file"
              className="py-1 px-2 w-fit text-lg bg-btn dark:bg-btn text-general dark:text-general rounded-lg hover:cursor-pointer"
            >
              Choisir un fichier
            </label>
            <input
              className="hidden"
              type="file"
              name="file"
              id="file"
              accept=".json"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <span className="text-sm text-secondary dark:text-secondary">
              Uniquement en .JSON
            </span>
            <p className="text-md text-primary dark:text-primary">
              {file ? file.name : "Aucun fichier choisi"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="w-full cursor-pointer bg-cancel dark:bg-cancel border border-cancel dark:border-cancel p-2 rounded-lg text-general dark:text-general"
            type="button"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            id="importItemBtn"
            className="w-full cursor-pointer bg-validate dark:bg-validate border border-validate dark:border-validate p-2 rounded-lg text-general dark:text-general"
            onClick={handleImport}
            type="button"
          >
            Importer
          </button>
        </div>
      </div>
    </div>
  );
}
