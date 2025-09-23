import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import AddModal from "./AddModal";
import MenuBurger from "./MenuBurger";

export default function Navbar({ setQuery }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center pb-5">
        <AlignJustifyIcon
          className="cursor-pointer text-primary dark:text-primary"
          size={32}
          onClick={() => setShowMenu(true)}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-2 border-bordercolor dark:border-bordercolor p-1 text-lg">
            <SearchIcon
              className="cursor-pointer text-secondary dark:text-secondary"
              size={20}
            />
            <input
              className="border-none w-[150px] text-primary dark:text-primary bg-transparent placeholder:text-secondary dark:placeholder:text-secondary"
              id="searchInput"
              type="text"
              placeholder="Recherche ..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            id="btnOpenAddModal"
            className="text-lg font-light rounded-lg border border-btn dark:border-btn text-general dark:text-general bg-btn dark:bg-btn px-4 py-1 cursor-pointer"
            type="button"
            onClick={() => setIsOpenModalAdd(true)}
          >
            Ajouter une note +
          </button>
        </div>
      </div>
      {showMenu && <MenuBurger onClose={() => setShowMenu(false)} />}
      {isOpenModalAdd && <AddModal onClose={() => setIsOpenModalAdd(false)} />}
    </>
  );
}
