if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Enregistrement réussi
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // Enregistrement échoué
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

chrome.alarms.create('verifierRappel', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'verifierRappel') {
    verifierRappel();
  }
});

function verifierRappel() {
  chrome.storage.local.get(['items'], function(result) {
    const itemsString = result.items ? result.items : "[]";
      try {

        const currentDate = new Date().getTime();
        //const currentDateTime = new Date(currentDate);

        //console.log(" ------- ");
        //console.log(" ------- ");
        //console.log("a : " + currentDate);
        //console.log("a : " + currentDateTime);
        const items = JSON.parse(itemsString);

        items.forEach(function(item) {
            if (item.verify) {
            return;
        }

        const reminderDate = new Date(item.reminder);
          //console.log("b : " + reminderDate.getTime());
          //console.log("b : " + new Date(reminderDate));

        if (currentDate >= reminderDate.getTime()) {
          //console.log("Match trouvé !");
          //console.log(item.title);
          afficherNotification(item.title);

          item.verify = true;
          const itemsString = JSON.stringify(items);
          chrome.storage.local.set({items: itemsString}, function() {
            console.log('Items updated');
          });
        }
        });
      } catch (error) {
        console.error('Erreur lors de l\'analyse de items:', error);
      }
  });
}

function afficherNotification(message) {
  chrome.notifications.create({
      type: "basic",
      iconUrl: "../../assets/icon/icon128.png",
      title: "Rappel",
      message: message
  });
}

setInterval(verifierRappel, 6000);
