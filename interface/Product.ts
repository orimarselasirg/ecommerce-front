export interface ProductResponse {
  _id: string;
  description: string;
  isService: boolean;
  stock: number;
  price: number;
  image: string;
}

export interface ProductsCreate {
  name: string;
  description: string;
  isService: boolean | string;
  stock: number;
  price: number;
  image: string;
}