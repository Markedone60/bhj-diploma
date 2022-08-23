/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData;
  let url = options.url;

  if (!options.data) {
    return;
  };

  if (options.method == 'GET' && Object.keys(options.data).length != 0) {
    url = `${options.url}?${getUrl(options.data)}`;
  } else {
    Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
  }

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState == xhr.DONE) {
      const response = xhr.responseText;
      options.callback(JSON.parse(response));
    };
  });

  try {
    xhr.open(options.method, url);
    xhr.send(formData);
  } catch (error) {
    options.callback(error);
  }

  return xhr;
};

function getUrl(item) {
  return Object.entries(item).map(([key, value]) => `${key}=${value}`).join('&');
}