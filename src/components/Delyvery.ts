import {Form} from "./common/Form";
import {IOrder} from "../types";
import {IEvents} from "./base/events";
export class Delivery extends Form<IOrder> {
    protected addressInput: HTMLInputElement;
    protected payButtons: HTMLButtonElement[];
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
        this.payButtons = Array.from(container.querySelectorAll('.button_alt'))
        this.payButtons.forEach((el) => {
          el.addEventListener('click', () => {
            this.setPayMethod(el.name);
            events.emit('pay:change', { name: el.name });
          });
        })
    }
    set address(value: string) {
      this.addressInput.value = value;
    }

    setPayMethod(name: string) {
      this.payButtons.forEach((el) => {
        this.toggleClass(el, 'button_alt-active', el.name === name);
      });
    }
}

