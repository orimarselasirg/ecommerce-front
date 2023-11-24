export interface Order {
  products: ProductOrder[];
  userId: string;
  transaction: string;
  isApproved: boolean;
  total: number;
}


export interface ProductOrder {
  _id: string;
  name: string;
  description: string;
  isService: boolean;
  price: number;
  image: string;
  quantity: number;
}