import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { useState } from "react";
import useStore from "../store/store";
import Notification from "./Notification";

export default function AddModal({ onClose }) {
  const addItem = useStore((state) => state.addItem);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notif, setNotif] = useState(false);
  const [showNotifDetails, setShowNotifDetails] = useState(true);
  const [notifDate, setNotifDate] = useState(0);
  const [notifTime, setNotifTime] = useState(0);

  const handleSave = () => {

    if (title !== "" || description !== "") {
      addItem({
        title,
        description,
        notification: {
          enabled: notif,
          ...(notif
            ? { date: notifDate, time: notifTime, timestamp: new Date(`${notifDate}T${notifTime}`).getTime() }
            : { date: undefined, time: undefined }),
        },
      });
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-[642px] h-[600px] bg-zinc-800/25 z-50"
      id="addModal"
    >
      <div
        className="flex flex-col gap-4 py-5 px-6 w-[440px] h-[500px] bg-background dark:bg-background rounded-lg mx-auto my-13"
        id="addModalContent"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg">Ajouter une note</span>
          <XIcon
            className="cursor-pointer hover:text-secondary dark:hover:text-secondary"
            onClick={onClose}
          />
        </div>
        <p className="text-secondary text-xs italic">
          (Remplissez au moins un champ)
        </p>

        <input
          className="bg-input dark:bg-input border border-bordercolor dark:border-bordercolor p-2 rounded-lg focus:border focus:border-zinc-400"
          id="addTitle"
          type="text"
          placeholder="Ajouter un titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ resize: "none" }}
        />
        <div className="border-t border-secondary"></div>
        <textarea
          className="bg-input dark:bg-input border border-bordercolor dark:border-bordercolor p-2 rounded-lg h-70 focus:border focus:border-zinc-400"
          placeholder="Ajouter une description"
          name="description"
          id="addDescription"
          cols="20"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: "none" }}
        ></textarea>
        <div className="flex flex-col gap-2 bg-input dark:bg-input rounded-lg p-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="notification-time"
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                name="notification"
                id="notification"
                className="w-4 h-4"
                checked={notif}
                onChange={(e) => {
                  setNotif(e.target.checked);
                  setShowNotifDetails(true);
                }}
              />
              Ajouter une notification
            </label>
            {notif && (
              <button
                type="button"
                onClick={() => setShowNotifDetails((prev) => !prev)}
                className="ml-2"
              >
                {showNotifDetails ? (
                  <ChevronUpIcon className="text-gray-400" />
                ) : (
                  <ChevronDownIcon className="text-gray-400" />
                )}
              </button>
            )}
          </div>

          {notif && showNotifDetails && (
            <Notification
              date={notifDate}
              time={notifTime}
              onChangeDate={(e) => setNotifDate(e.target.value)}
              onChangeTime={(e) => setNotifTime(e.target.value)}
            />
          )}
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
            id="addItemBtn"
            className="w-full cursor-pointer bg-validate dark:bg-validate border border-validate dark:border-validate p-2 rounded-lg text-general dark:text-general disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleSave}
            disabled={title === "" && description === "" || (notif && (notifDate === 0 || notifTime === 0))}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
