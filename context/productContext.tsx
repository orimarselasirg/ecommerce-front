'use client'
import React, {Dispatch, SetStateAction, createContext, useContext, useState, useEffect} from 'react';
import api from '../api/axiosInstance';
import { Product, ProductsCreate } from '../interface/Product';

type ProductContextProps = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  createProduct: (product: ProductsCreate) =>Promise<any>
  createProductWithImage: (image: any) =>Promise<string>
  orderByParams:(param: boolean | string | number, order: string) => any
  searchByParams:(param: boolean | string | number, search: string) => any
  clearSearch:() => any
  setProducts:Dispatch<SetStateAction<Product[]>>
  products:Product[]
  productsOrdered:Product[]
  getAllProducts:() => void
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsOrdered, setProductsOrdered] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
  },[])

  const createProduct = async (product: ProductsCreate): Promise<any> => {
    setIsLoading(true);
    try {
      return api.post("/products", product)
    } catch (error) {
      return error
    } finally{
      setIsLoading(false);
    }
  }

  const createProductWithImage = async (image: any): Promise<any> => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("picture", image);
      const response = await api.post("/products/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data.data
      
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false);
    }
  }

  const getAllProducts = async (): Promise<void>  => {
    setIsLoading(true)
    try {
      const {data} = await api.get("/products");
      setProducts(data.data)
      setProductsOrdered(data.data)
    } catch (error) {
      console.log(error)
      throw error
    }finally{
      setIsLoading(false)
    }
  }

  const orderByParams = (param: string | boolean | number, order: string) => {
   if(param === 'name'){
    if(order === 'asc'){
      const orderesProducts = products.sort((a:any, b: any) => a.name.localeCompare(b.name));
      
      setProductsOrdered(prevProducts => [...orderesProducts]);
    } else if(order === 'desc'){
      const orderesProducts = products.sort((a:any, b: any) => b.name.localeCompare(a.name));
      setProductsOrdered(prevProducts => [...orderesProducts]);
    }
   }
   if(param === 'isService'){
    if(order === 'asc'){
      const orderesProducts = products.sort((a:any, b: any) => b.isService - a.isService);
      
      setProductsOrdered(prevProducts => [...orderesProducts]);
    } else if(order === 'desc'){
      const orderesProducts = products.sort((a:any, b: any) => b.isService - a.isService);
      setProductsOrdered(prevProducts => [...orderesProducts]);
    }
   }
   if(param === 'price'){
    if(order === 'asc'){
      const orderesProducts = products.sort((a:any, b: any) => a.price - b.price);
      
      setProductsOrdered(prevProducts => [...orderesProducts]);
    } else if(order === 'desc'){
      const orderesProducts = products.sort((a:any, b: any) => b.price - a.price);
      setProductsOrdered(prevProducts => [...orderesProducts]);
      
    }
   }
   if(param === 'stock'){
    if(order === 'asc'){
      const orderesProducts = products.sort((a:any, b: any) => a.stock - b.stock);
      setProductsOrdered(prevProducts => [...orderesProducts]);
      
    } else if(order === 'desc'){
      const orderesProducts = products.sort((a:any, b: any) => b.stock - a.stock);
      setProductsOrdered(prevProducts => [...orderesProducts]);
      
    }
   }
  }

  const searchByParams = (param: any, search: string) => {
    if(search == ''){
      setProductsOrdered(prevProducts => [...products]);
    } else {
      if(param === 'price' || param === 'stock'){
        const orderesProducts = products.filter((a:any) => {return a[param] == search})
        setProductsOrdered(prevProducts => [...orderesProducts]);

      } else {
        const orderesProducts = products.filter((a:any) => {return a[param].toLowerCase().includes(search.toLowerCase())})
        setProductsOrdered(prevProducts => [...orderesProducts]);
      }
    }
  }

  const clearSearch = () => {
    setProductsOrdered(prevProducts => [...products]);
  }
  
  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        createProductWithImage,
        isLoading,
        setIsLoading,
        orderByParams,
        searchByParams,
        setProducts,
        productsOrdered,
        clearSearch,
        getAllProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)

