/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    return createRequest({
      data,
      method: 'GET',
      url: `${this.URL}/current`,
      callback: (response) => {
        if (response) {
          this.current();
        };
        callback(response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    return createRequest({
      data,
      method: 'POST',
      url: `${this.URL}/login`,
      callback: (response) => {
        if (!response.success) {
          alert(response.error || response.error.email);
          return;
        };
        if (response && response.user) {
          this.setCurrent(response.user);
        };
        callback(response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = f => f) {
    return createRequest({
      data,
      method: 'POST',
      url: `${this.URL}/register`,
      callback: (response) => {
        if (!response.success) {
          alert(response.error.email);
          return;
        };
        if (response && response.user) {
          this.setCurrent(response.user);
        };
        callback(response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({ 
      data, 
      method: 'POST',
      url: `${this.URL}/logout`,
      callback: (response) => {
        if (response) {
          this.unsetCurrent();
        };
        callback(response);
      },
    });
  }
}
