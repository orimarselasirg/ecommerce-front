export interface ProductResponse {
  status: boolean;
  data: Product[]
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  isService: boolean;
  stock: number;
  price: number;
  image: string;
  quantity: number;
}

export interface ProductsCreate {
  name: string;
  description: string;
  isService: boolean | string;
  stock: string | number;
  price: string | number;
  image: string;
}