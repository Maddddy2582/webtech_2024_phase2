
export interface deliveryOrder {
    id: number;
    orderId: number;
    restaurantId: number;
    customerName: string;
    restaurantName: string;
    userId: string;
    totalAmount: number;
    items: { name: string, quantity: number }[];
    status: 'Pending' | 'Completed' | 'Accepted' | 'Rejected' | 'Delivered' | 'Picked';
  }
  