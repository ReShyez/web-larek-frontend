import './scss/styles.scss';





//Получаем все эл. главной страницы страницы
const itemContainer = document.querySelector('.gallery');
const catalogItemTemplate = document.querySelector('#card-preview');
const cardTemplate = document.querySelector('#card-preview');

//Получаем все эл корзины
const basketTemplate = document.querySelector('#basket');
const basketItemTemplate =  document.querySelector('#card-basket');

// Получаем все эл формы
const orderFormTemplate = document.querySelector('#order');
const contactsTemplate = document.querySelector('#contacts');
const successTemplate = document.querySelector('#success');

//получаем модальное окно для отображения на нем информаии
const modalTemplate = document.querySelector('#card-basket');