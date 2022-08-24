const createRequest = (options = {}) => {

  let formData = new FormData();
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  if (options.method.toUpperCase() != 'GET') {
    for (let item in options.data) {
      formData.append(item, options.data[item]);
    }
  } else {
    let parameters = '';
    let array = [];

    for (let item in options.data) {
      array.push(item + '=' + options.data[item]);
    }
    parameters = array.join('&');
    options.url = options.url + '?' + parameters;
  }

  try {
    xhr.open(options.method, options.url);
    xhr.send(formData);
  }
  catch (event) {
    options.callback(event);
  }

  xhr.onload = function () {
    let response = null;
    let error = null;
    
    if (xhr.status != 200) {
      error = xhr.statusText;
    } else {
      response = xhr.response;
    }
    options.callback(error, response);
  }
};