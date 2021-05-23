function makeGETRequest(url, callback) {
  let xhr;
  //Проверка браузера (у ИЕ другой объект за это отвечает)
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.onreadystatechange = function() {
      if (xhr.onreadystatechange === 4) {
          callback(xhr.responseText);
      }
  };

  xhr.open('GET', url, true);
  xhr.send();
}



