import { XIcon } from "lucide-react";
import useStore from "../store/store";

export default function DeleteModal({ onClose, item }) {
  const removeItem = useStore((state) => state.removeItem);

  if (!item) return null;

  const handleDelete = () => {
    removeItem(item.id);
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-[642px] h-[600px] bg-zinc-800/25 z-50"
      id="deleteModal"
    >
      <div
        className="flex flex-col gap-4 py-5 px-6 w-[440px] h-[196px] bg-background dark:bg-background rounded-lg mx-auto my-48"
        id="deleteModalContent"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg">Supprimer une note</span>
          <XIcon
            className="cursor-pointer hover:text-secondary dark:hover:text-secondary"
            onClick={onClose}
          />
        </div>
        <input
          className="bg-input dark:bg-input border border-bordercolor dark:border-bordercolor p-2 rounded-lg focus:border focus:border-zinc-400"
          id="deleteTitle"
          type="text"
          placeholder="Il n'y a pas de titre"
          value={item?.title || ""}
          readOnly
        />
        <div className="flex gap-2">
          <button
            id="cancelDeleteItemBtn"
            className="w-full cursor-pointer bg-cancel dark:bg-cancel border border-cancel dark:border-cancel p-2 rounded-lg text-general dark:text-general"
            onClick={onClose}
            type="button"
          >
            Annuler
          </button>
          <button
            id="deleteItemBtn"
            className="w-full cursor-pointer bg-validate dark:bg-validate border border-validate dark:border-validate p-2 rounded-lg text-general dark:text-general"
            type="button"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
