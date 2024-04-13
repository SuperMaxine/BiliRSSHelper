const inputbox = document.getElementById('serverAddress');
const checkbox = document.getElementById('autoSync');
const button = document.getElementById('syncBtn');
const cookieShower = document.getElementById('cookieShower') // this is a textarea

chrome.storage.sync.get('serverAddress', function (data) {
  inputbox.value = data.serverAddress || '';
});

chrome.storage.sync.get('autoSync', function (data) {
  checkbox.checked = data.autoSync || false;
});

inputbox.addEventListener('change', function () {
  chrome.storage.sync.set({ serverAddress: inputbox.value }, function () {
    console.log('serverAddress is set to ' + inputbox.value);
  });
});

checkbox.addEventListener('change', function () {
  chrome.storage.sync.set({ autoSync: checkbox.checked }, function () {
    console.log('autoSync is set to ' + checkbox.checked);
  });
});

button.addEventListener('click', function () {
  // send SESSDATA in json to http://address:port/ using fetch
  fetch(inputbox.value, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ SESSDATA: cookieShower.value })
  }).then(function (response) {
    console.log(response);
    // if statusText is OK, then add icon next to the button
    if (response.statusText === 'OK') {
      button.innerHTML = 'Success';
    } else {
      button.innerHTML = 'Failed';
    }
  });
});

// write cookie to textarea
chrome.cookies.getAll({
  domain: '.bilibili.com',
}, function (cookies) {
  let cookieString = '';
  cookies.forEach(function (cookie) {
    if (cookie.name === 'SESSDATA') {
      // cookieString += cookie.name + '=' + cookie.value;
      cookieShower.value = cookie.value;
    }
  });
});


