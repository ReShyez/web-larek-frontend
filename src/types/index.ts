//Типы исправил. По UML схеме - правильно ли я понял что неправильно наследование указал? Нужно было в обратном порядке стрелку рисовать от потомка к родителю? 


export type ChooseItems = Pick<IBaseItem, 'id' | 'name' | 'price' | 'index'>
export enum PayMethod {
  Cash = 'Наличные',
  Card = 'Банковская карта'
  }
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IBaseItem {
  id: string;
  description?: Text;
  image: string;
  name: Text;
  category: Text;
  price: number | null;
  button: boolean;
  index?: number;
}

export interface ICard extends IBaseItem {
  Button: string;
}

export interface IBasket {
  items: HTMLElement[];
	total: number;
}



export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IOrder {
    payment: PayMethod;
    phone: Text;
    email: Text;
    address: Text;
    totalCost: number;
}

export interface IPostOrder extends IOrder {
  items: string[]
}

export interface IOrderResult {
  id: string;
  total: number;
}


export interface IFormState {
    valid: boolean;
    errors: string[];
}


export interface ICongradulateWindow {
  finnlyCoast: HTMLParagraphElement;
  closeButton: HTMLButtonElement;
  setCoast(value: number):void;
  closeWindow():void;
}



export interface IApi {
  cdn: string;
  getItem: (id:string) => Promise<IBaseItem>;
  getLots: () => Promise<IBaseItem[]>;
  takeOrder: (order: IOrder) => Promise<IOrderResult>
}

export type IApiListResp<Type> = {
  total: number,
  items: Type[]
}

export interface AppState {
  catalog: ICard[];
  basket: ChooseItems[];
  preview: string | null;
  order: IOrder | null;
  formErrors: FormErrors;

  setCatalog(items: ICard[]):void;
  setPreview(item: IBaseItem): void;
  buyItem(item: IBaseItem): void;
  deleteItem(id:string):void;
  checkChoose(id: string): boolean;
  getBusket():HTMLElement;
  clearBasket():void;
  getResult(): number;
  setOrder(): IOrder;
  choosePay(value:Text): void;
  setAdress(value: Text): void;
  setContact(field: keyof Pick<IOrder, 'email' | 'phone'>, value: string): void
  clearOrder(): void;
  checkDelyveryReady(): void;
  checkOrderReady(): void;
  validataDelyvery(): void;
  validateContact(): void;
}


export interface IModal {
  _content: HTMLElement;
  closeButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;

  open(): void;
  close(): void;
  render(): void

}