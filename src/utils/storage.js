/* eslint-disable no-undef */
export const storage = {
  get: (key, callback) => {
    if (window.chrome?.storage?.local) {
      chrome.storage.local.get(key, (result) => callback(result[key]));
    } else {
      const value = localStorage.getItem(key);
      callback(value ? JSON.parse(value) : []);
    }
  },
  set: (key, value) => {
    if (window.chrome?.storage?.local) {
      chrome.storage.local.set({ [key]: value });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
