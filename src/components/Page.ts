import { View } from "./base/View";
import { IPage } from "../types";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";


export class Page extends View<IPage> {
    protected itemCount: HTMLSpanElement;
    protected catalogList: HTMLDivElement;
    protected wrapper: HTMLElement;
    protected basket: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.itemCount = ensureElement<HTMLSpanElement>('.header__basket-counter');
        this.catalogList = ensureElement<HTMLDivElement>('.gallery');
        this.wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this.basket = ensureElement<HTMLElement>('.header__basket');

        this.basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this.itemCount, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this.catalogList.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this.wrapper.classList.add('page__wrapper_locked');
        } else {
            this.wrapper.classList.remove('page__wrapper_locked');
        }
    }
}