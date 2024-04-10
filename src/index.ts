import './scss/styles.scss';
import {API_URL, CDN_URL} from "./utils/constants";
import { CatalogChangeEvent, LotItem } from './components/ItemData';
import { Page } from './components/Page';
import { APILarek } from './components/ApiLarek';
import { AppState } from './components/AppData';
import {EventEmitter} from "./components/base/events";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import { Card } from './components/Card';
import { PopUp } from './components/common/PopUp';
import { Basket } from './components/common/Basket';
import { Contact } from './components/Contacts';
import { IOrder, PayMethod } from './types';
import { Delivery } from './components/Delyvery';
import { Success } from './components/common/Congratulate';
//Получаем все эл. главной страницы страницы
const catalogItemTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewItemTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const basketListItem = ensureElement<HTMLTemplateElement>('#card-basket');
const congradTempl = ensureElement<HTMLTemplateElement>('#success');
//получаем модальное окно для отображения на нем информаии
const events = new EventEmitter()
const appData = new AppState({}, events)
const api = new APILarek(CDN_URL, API_URL)
const page = new Page(document.body, events)
const popup = new PopUp(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Delivery(cloneTemplate<HTMLFormElement>('#delivery'), events)
const contact = new Contact(cloneTemplate<HTMLFormElement>('#contacts'), events)
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

api
  .getLots()
  .then(appData.setCatalog.bind(appData))
  .catch(err => {
      console.error(err);
});

events.on<CatalogChangeEvent>('smallCard:view', () => {
  page.catalog = appData.catalog.map(item => {
    const card = new Card(cloneTemplate(catalogItemTemplate), {
      onClick: () => events.emit('item:select', item)
    });
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category
    })
  })
})

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('item:select', (item: LotItem) => {
  const pickItem = (item: LotItem) => {
    const card = new Card(cloneTemplate(previewItemTemplate), {
      onClick: () => {
          events.emit('item:add', item);
      }
    });
    popup.render({
      content: card.render({
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        category: item.category,
        button: false
      })
    })
  } 

  if(item) {
    api
    .getItem(item.id)
    .then(() => {
      pickItem(item)
    })
  }
});

events.on('item:add', (item: LotItem) => {
  appData.addItem(item);

  popup.close();
});

events.on('item:delete',(item: LotItem) => {
  appData.removeItem(item);
});

events.on('basket:open',() => {
  popup.render({
		content: basket.render(),
    })
	});

events.on('chooselist:chenged',() =>{
  page.counter = appData.getScore();
  basket.total = appData.getCost();
  basket.items = appData.basket.map((item, index) => {
    const listItem = new Card(cloneTemplate(basketListItem), {onClick:() => {
    listItem.delete();
    events.emit('item:delete', item);
    }});
    return listItem.render({
      title: item.title,
      price: item.price,
      index: index
    })
  });
});

events.on('delivery:open', () => {
  appData.pushToOrder();
  popup.render({
    content: delivery.render({
      payment: 'online',
      address: '',
      valid: false,
      errors: [],
    })
  })
});


events.on('formErrors:change', (errors: Partial<IOrder>) => {
  const { email, phone, address, payment} = errors;
  delivery.valid = !address && !payment;
  delivery.errors = Object.values({address, payment}).filter(Boolean).join('; ');
  contact.valid = !email && !phone;
  contact.errors = Object.values({phone, email}).filter(Boolean).join('; ');
});



// Изменилось одно из полей
events.on(/^contacts\..*:change/, (data: { field: keyof IOrder, value: string }) => {
  appData.setContactsField(data.field, data.value);
});

events.on('delivery.address:change', (data: { field: keyof IOrder, value: string }) => {
  appData.setAddressField(data.field, data.value);
});

events.on('pay:change',(event: { name: string }) => {
  appData.setPayment(event.name);
})

events.on('delivery:submit', () => {
  popup.render({
    content: contact.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  })
})

events.on('contacts:submit', () => {
  api.takeOrder(appData.order)
      .then((res) => {
          const success = new Success(cloneTemplate(congradTempl), {
              onClick: () => {
                  popup.close();
                  appData.clearBasket();
                  
              }
          });
          popup.render({
              content: success.render({
                total: appData.getCost()
              })
          });
      })
      .catch((err) => {
          console.error(err);
      })
      .finally(()=>{
        appData.clearAll()
        basket.items = [];
        page.counter = 0;
      })
});