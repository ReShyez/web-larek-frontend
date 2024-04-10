import { Model } from "./base/ModelData";
import { ensureElement, ensureAllElements } from "../utils/utils";
import { LotItem } from "./ItemData";
import { IAppState, IBaseItem, IOrder, IPostOrder, FormErrors, ChooseItems, PayMethod } from "../types";

export type CatalogChangeEvent = {
  catalog: LotItem[]
};

export class AppState extends Model<IAppState> {
  catalog: IBaseItem[] = [];
  basket: IBaseItem[] = [];
  order: IPostOrder = {
    payment: 'online',
    phone: '',
    email: '',
    address: '',
    totalCost: 0,
    items: []
  };
  preview: string | null;
  formErrors: FormErrors = {};
  
  setCatalog(items: LotItem[]) {
    this.catalog = items.map(item => new LotItem(item, this.events));
    this.emitChanges('smallCard:view', { catalog: this.catalog })
  }
  
  checkItem(item: LotItem): boolean {
    return this.basket.includes(item);
  }

  addItem(item: LotItem) {
    this.basket.push(item);
    this.emitChanges('chooselist:chenged');
  }

  removeItem(item: IBaseItem){
    this.basket = this.basket.filter((el) => {
      return el.id !== item.id
    });
    this.emitChanges('chooselist:chenged');
  }

  getScore(){
    return this.basket.length;
  }

  getCost(): number {
    const cost = this.basket.reduce( (cost, item) => {
      return cost + item.price
    }, 0)
    return cost
  }

  setPayment(value: string) {
    this.order.payment = value;
    if (this.validateDelivery()) {
      this.events.emit('order:ready', this.order);
    }
  }

  validateDelivery() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
        errors.address = 'Введите адресс';
    }
    if (!this.order.payment) {
        errors.payment = 'Выберите способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
}

  validateContacts() {
      const errors: typeof this.formErrors = {};
      if (!this.order.email) {
          errors.email = 'Необходимо указать email';
      }
      if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
      }
      this.formErrors = errors;
      this.events.emit('formErrors:change', this.formErrors);
      return Object.keys(errors).length === 0;
  }

  setDeliveryField<T extends keyof IOrder>(field: T, value: IOrder[T]) {
      this.order[field] = value;
      console.log(this.order)
      if (this.validateDelivery()) {
          this.events.emit('order:ready', this.order);
      }
  }

  setContactsField<T extends keyof IOrder>(field: T, value: IOrder[T]) {
      this.order[field] = value;

      if (this.validateContacts()) {
          this.events.emit('order:ready', this.order);
      }
  }
  
  pushToOrder(){
    this.basket.map((item)=> {
      this.order.items.push(item.title);
    })
  }
}