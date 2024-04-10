import { Model } from "./base/ModelData";
import { IBaseItem } from "../types";

export type CatalogChangeEvent = {
    catalog: LotItem[]
};
export class LotItem extends Model<IBaseItem> {
    id: string;
    description?: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    button: boolean;
}