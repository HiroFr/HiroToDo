import { PencilIcon, TrashIcon } from "lucide-react";

export default function Item({ item, onEdit, onDelete, bellIcon }) {

  return (
    <div>
      <div className="relative flex bg-accent gap-5 text-text-card dark:text-text-card rounded-2xl px-5 py-4 border border-transparent hover:outline-outlinecolor dark:hover:outline-outlinecolor hover:outline-2 hover:outline-offset-[-2px]">
      <div className="absolute top-0 left-0 rotate-348 text-secondary">
        {bellIcon}
      </div>
        <div className="w-48 h-fit overflow-hidden">
          <span
            title={item?.title}
            className={`block w-full whitespace-nowrap overflow-hidden text-ellipsis pt-2 text-lg${!item?.title ? " italic" : ""}`}
          >
            {item?.title || "Aucun titre"}
          </span>
          <span
            title={item?.description}
            className={`block w-full whitespace-nowrap overflow-hidden text-ellipsis pt-2 text-base${!item?.description ? " italic" : ""}`}
          >
            {item?.description || "Aucune description"}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <PencilIcon className="bg-validate dark:bg-validate text-general dark:text-general rounded cursor-pointer p-1" size={32} onClick={onEdit} />
          <TrashIcon className="bg-cancel dark:bg-cancel text-general dark:text-general rounded cursor-pointer p-1" size={32} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
