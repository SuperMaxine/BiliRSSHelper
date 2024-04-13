// background.js
chrome.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");
});

// Send SESSDATA to server every 30 minutes
chrome.alarms.create('sync', { periodInMinutes: 30 });

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'sync') {
    chrome.storage.sync.get('serverAddress', function (data) {
      if (data.serverAddress) {
        chrome.cookies.getAll({
          domain: '.bilibili.com',
        }, function (cookies) {
          let cookieString = '';
          cookies.forEach(function (cookie) {
            if (cookie.name === 'SESSDATA') {
              cookieString = cookie.value;
            }
          });
          fetch(data.serverAddress, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ SESSDATA: cookieString })
          }).then(function (response) {
            console.log(response);
          });
        });
      }
    });
  }
});