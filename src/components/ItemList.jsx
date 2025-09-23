import { ArrowUpDownIcon, BellRingIcon, FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useStore from "../store/store";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import Item from "./Item";

export default function ItemList({ query }) {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const loadItems = useStore((state) => state.loadItems);
  const items = useStore((state) => state.items);
  const [sort, setSort] = useState(false);

  const filteredItems = query
    ? items.filter((item) => item.title.includes(query))
    : items.sort((a, b) => b.id - a.id);

  let displayItems = filteredItems;
  if (sort) {
    displayItems = [...filteredItems].sort((a, b) => a.id - b.id);
  }

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const nbrNotif = displayItems.filter(
    (item) => item.notification.enabled
  ).length;

  return (
    <>
      <div className="py-2 flex justify-between">
        <div className="px-2 flex items-center bg-accent rounded-lg">
          <span className="pr-2 flex gap-1 items-center border border-transparent border-r-primary">
            <FileTextIcon size={16} />{displayItems.length}
          </span>
          <span className="pl-2 flex gap-1 items-center border border-transparent">
            <BellRingIcon size={16} />{nbrNotif}
          </span>
        </div>
        <button onClick={() => setSort(!sort)} className="py-1 px-2 flex gap-1 items-center bg-accent rounded-lg cursor-pointer">
          <ArrowUpDownIcon size={16} /> {sort ? "le plus récent" : "le plus ancien"}
        </button>
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {displayItems && displayItems.length > 0 ? (
          displayItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              bellIcon={item.notification.enabled ? <BellRingIcon /> : ""}
              onEdit={() => {
                setSelectedItem(item);
                setIsOpenModalEdit(true);
              }}
              onDelete={() => {
                setSelectedItem(item);
                setIsOpenModalDelete(true);
              }}
            />
          ))
        ) : (
          <div className="m-auto">
            <p>Aucune Note/ToDo à afficher.</p>
          </div>
        )}
      </div>
      {isOpenModalEdit && (
        <EditModal
          onClose={() => setIsOpenModalEdit(false)}
          item={selectedItem}
        />
      )}
      {isOpenModalDelete && (
        <DeleteModal
          onClose={() => setIsOpenModalDelete(false)}
          item={selectedItem}
        />
      )}
    </>
  );
}
