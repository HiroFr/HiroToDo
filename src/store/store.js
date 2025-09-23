import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { storage } from "../utils/storage";

const useStore = create(
  devtools((set) => ({
    items: JSON.parse(storage.get("items", (items) => items) || "[]"),
    addItem: (item) => {
      const newItem = { ...item, id: Date.now() };
      set((state) => {
        const updated = [...state.items, newItem];
        storage.set("items", updated);
        return { items: updated };
      });
    },
    uploadItems: (items) => {
      set({ items });
    },
    updateItem: (updateItem) =>
      set((state) => {
        const updateItems = state.items.map((item) =>
          item.id === updateItem.id ? updateItem : item
        );
        storage.set("items", updateItems);
        return { items: updateItems };
      }),
    removeItem: (id) =>
      set((state) => {
        const updated = state.items.filter((item) => item.id !== id);
        storage.set("items", updated);
        return { items: updated };
      }),
    loadItems: () => {
      storage.get("items", (items) => set(() => ({ items: items || [] })));
    },
    theme: JSON.parse(localStorage.getItem("theme")),
    toggle: () =>
      set((state) => {
        const newTheme = !state.theme;
        localStorage.setItem("theme", JSON.stringify(newTheme));
        return { theme: newTheme };
      }),
  }))
);

export default useStore;
