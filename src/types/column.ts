import { Rect } from "./rect";
import { SubImage } from "./sub-image";

export interface Column extends Rect {
  images: SubImage[];
}