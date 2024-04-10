import {Form} from "./common/Form";
import {IOrder} from "../types";
import {IEvents} from "./base/events";

export class Contact extends Form<IOrder> {
    protected phoneInpit: HTMLInputElement;
    protected emailInput: HTMLInputElement;
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.phoneInpit = this.container.elements.namedItem('phone') as HTMLInputElement;
        this.emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
    }

    set phone(value: string) {
        this.phoneInpit.value = value;
    }

    set email(value: string) {
        this.emailInput.value = value;
    }
}