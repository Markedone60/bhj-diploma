/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebar = document.querySelector('.sidebar-mini');
    const button = document.querySelector('.sidebar-toggle');
    
    button.addEventListener('click', (event) => {
      
      event.preventDefault();

      if (sidebar.classList.contains('sidebar-open')) {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-collapse');
      } else sidebar.classList.add('sidebar-open');
    })
    
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginBtn = document.querySelector('.menu-item_login');
    const registerBtn = document.querySelector('.menu-item_register');
    const logoutBtn = document.querySelector('.menu-item_logout');

    loginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('login').open();
    })

    registerBtn.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('register').open();
    })

    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      let callback = function (response) {
        if (response.success == true) {
          App.setState('init');
        }
      };
      User.logout(callback);
    })
  }
}