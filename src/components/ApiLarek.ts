import { Api} from "./base/api";
import { IBaseItem, IOrder,IOrderResult  } from '../types/index';
import { IApi, IApiListResp } from "../types/index";
export class APILarek extends Api implements IApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }
  getItem(id: string): Promise<IBaseItem> {
    return this.get(`/product/${id}`).then((item: IBaseItem) => ({
      ...item,
      image: this.cdn + item.image,
    })
    );
  }
  getLots(): Promise<IBaseItem[]> {
    return this.get(`/product/`).then((data: IApiListResp<IBaseItem>) => 
    
    data.items.map((item) => ({
      ...item,
      image: this.cdn + item.image,
    }))
    );
  }

  takeOrder(order: IOrder) : Promise<IOrderResult> {
    return this.post('/order/', order).then((data: IOrderResult) => data)
  }
}

