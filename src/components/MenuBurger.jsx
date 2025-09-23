import { FileIcon, SunIcon, XIcon } from "lucide-react";
import { useState } from "react";
import UploadFile from "./UploadFile";
import useStore from "../store/store";

export default function MenuBurger({ onClose }) {
  const [openUpload, setOpenUpload] = useState(false);
  const theme = useStore((state) => state.theme);
  const toggle = useStore((state) => state.toggle);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[642px] h-[600px] bg-zinc-800/25 z-50"
        id="menuModal"
      >
        <div className="flex flex-col gap-4 py-5 px-6 w-fit h-[600px] bg-background dark:bg-background rounded-r-lg">
          <div className="flex items-center gap-2">
            <XIcon size={32} className="cursor-pointer" onClick={onClose} />
            <span className="p-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 text-lg text-general dark:text-general">
              Hiro
            </span>
            <span className="text-lg">ToDo</span>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="flex justify-between gap-2 items-center py-2 px-3 cursor-pointer hover:bg-hover dark:hover:bg-hover hover:rounded-lg"
              onClick={() => setOpenUpload(true)}
              id="openUploadButton"
            >
              <span className="text-lg">Import / Export</span>
              <FileIcon />
            </div>
            <div
              className="flex justify-between gap-2 items-center py-2 px-3 cursor-pointer hover:bg-hover dark:hover:bg-hover hover:rounded-lg"
              id="openUploadButton"
            >
              <span className="text-lg" title="Clique pour changer le thème" onClick={toggle}>
                {theme ? "Thème Clair" : "Thème Sombre"}
              </span>
              <SunIcon />
            </div>
          </div>
        </div>
      </div>
      {openUpload && <UploadFile onClose={() => setOpenUpload(false)} />}
    </>
  );
}
