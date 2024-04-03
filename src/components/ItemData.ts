import { Model } from "./base/ModalData";
import { IBaseItem } from "../types";

export class LotItem extends Model<IBaseItem> {
    id: string;
    description?: string;
    image: string;
    name: string;
    category: string;
    price: number | null;
    button: boolean;
}