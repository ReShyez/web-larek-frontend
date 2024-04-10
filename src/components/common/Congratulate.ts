import { View } from "../base/View";
import { ensureElement } from "../../utils/utils";
import { IClickEvent } from "../base/events";
import { ICongradulateWindow,} from "../../types";

export class CongradulateWindow extends View<ICongradulateWindow> {
  protected finnlyCoast: HTMLParagraphElement;
  protected closeButton: HTMLButtonElement;

  constructor (protected template: HTMLElement, coast: number, event?: IClickEvent) {
    super(template);
    this.finnlyCoast = ensureElement<HTMLParagraphElement>('.order-success__description', template);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', template);
    
    //отслеживаем - если произошли какие то события клика то выполняем действия
    if(event?.onClick){
      this.setCoast(coast);
      this.closeButton.addEventListener('click', () => this.closeWindow())
    }
    
  }
  
  setCoast(value: number):void{
    this.setText(this.finnlyCoast, `Списано ${value}`)
  }

  closeWindow() {
    this.setDisabled(this.template, true)
    this.setText(this.finnlyCoast, ' ')
  }

}

