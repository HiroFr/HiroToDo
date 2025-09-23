/* eslint-disable no-undef */
function scheduleItemNotification(item) {
  if (item.notification?.enabled) {
    const notifDate = item.notification.timestamp;
    chrome.alarms.create("notif_" + item.id, { when: notifDate });

    chrome.storage.local.set({
      ["notification_" + item.id]: {
        title: item.title,
        message: item.description,
      },
    });
  }
}

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes.items) {
    const items = changes.items.newValue;
    if (items && items.length > 0) {
      items.forEach(scheduleItemNotification);
    }
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name.startsWith("notif_")) {
    const itemId = alarm.name.replace("notif_", "");
    const { ["notification_" + itemId]: notif } =
      await chrome.storage.local.get("notification_" + itemId);
    if (notif) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon/icon48.png",
        title: "Notification : " + notif.title,
        message: notif.message || "Pas de description",
        priority: 2,
      });
      chrome.storage.local.get("items", ({ items }) => {
        if (items && Array.isArray(items)) {
          const updatedItems = items.map((item) =>
            item.id === Number(itemId)
              ? {
                  ...item,
                  notification: {
                    enabled: false,
                    timestamp: "",
                    time: "",
                    date: "",
                  },
                }
              : item
          );
          chrome.storage.local.set({ items: updatedItems }, () => {});
        }
        chrome.storage.local.remove("notification_" + itemId);
      });
    }
  }
});
