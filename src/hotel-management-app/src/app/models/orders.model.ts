// src/app/models/order.model.ts
export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    orderId: number;
    restaurantId: number;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    date: string;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  }
  