export interface Order {
  products: ProductOrder[];
  userId: string | null;
  transaction: string | null;
  isApproved: string | null | boolean;
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