/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */

  static url = '/account';

  static get(id = '', callback){
    createRequest({url: this.url + '/' + id, data: {id:id}, callback, method: 'GET'});
  }
}
