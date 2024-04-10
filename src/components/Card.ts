import { View } from "./base/View";
import { IClickEvent } from "./base/events";
import { ensureElement } from "../utils/utils";
import { ICard } from "../types";

export class Card extends View<ICard> {
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category?: HTMLSpanElement;
  protected _price: HTMLSpanElement;
  protected _button?: HTMLButtonElement;
  protected _index?: HTMLSpanElement;
  constructor(container:HTMLElement, event:IClickEvent) {
    super(container);
    
    //эти поля присутствуют во всех вариациях карточки
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);

    //"пропадающие поля"
    if(container.querySelector('.card__image')) {
    this._image = ensureElement<HTMLImageElement>('.card__image', container)
    }

    if(container.querySelector('.card__category')) {
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    }

    if(container.querySelector('.card__text')) {
      this._description = ensureElement<HTMLElement>('.card__text', container);
    }

    if(container.querySelector('.card__button')){
      this._button = container.querySelector('.card__button');
    }

    if(container.querySelector('.basket__item-index')) {
        this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    }

    if (event?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', event.onClick);
      } else {
        container.addEventListener('click', event.onClick);
      }
    }
  }
    set id(value: string) {
      this.container.dataset.id = value;
    }
    get id(): string {
      return this.container.dataset.id || '';
    }
    set index(value: number){
      this.setText(this._index, value + 1) 
    }
    set title (value: string) {
      this.setText(this._title, value);   
    }
    set image(value: string) {
      this.setImage(this._image, value);
    }
    set description(value: string) {
      this.setText(this._description, value);
    }
    set category(value: string) {
      this.setText(this._category, value);
    }
    set price(value: number) {
      if(value === null) {
        this.setText(this._price, `Бесценно`);
      } else {
        this.setText(this._price, `${value} синапсов`);
      }
      
    }
    delete() {
      if(this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this._title = null;
      this._image = null;
      this._description = null;
      this._price = null;
      this._category = null;
      this._index = null;
    }
}  