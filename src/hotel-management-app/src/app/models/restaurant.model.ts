import { MenuItem } from "./menu.model";
export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    image: string;
    description: string;
    menu: MenuItem[];
    userId: string;
  }
  