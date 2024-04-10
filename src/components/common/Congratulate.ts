import { View } from "../base/View";
import { ensureElement } from "../../utils/utils";
import { IClickEvent } from "../base/events";
import { ICongradulateWindow,} from "../../types";


interface ISuccess {
  total: number;
}


export class Success extends View<ISuccess> {
  protected _close: HTMLElement;
  _total: HTMLSpanElement;
  constructor(container: HTMLElement, actions: IClickEvent) {
      super(container);
      this._total = ensureElement<HTMLElement>('.order-success__description', this.container)
      this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

      if (actions?.onClick) {
          this._close.addEventListener('click', actions.onClick);
      }
  }
  set total(value:null){
    this._total.textContent = `${value} синапсов`
  }
}