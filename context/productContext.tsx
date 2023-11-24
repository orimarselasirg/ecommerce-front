import React, {createContext, useContext, useState} from 'react';
import api from '@/api/axiosInstance';
import { ProductResponse, ProductsCreate } from '@/interface/Product';

type ProductContextProps = {
  // isLoading: boolean
  // setIsLoading: (value: boolean) =>  void
  // getAllProducts:() =>  Promise<any>
  // getAllpurchases:() =>  Promise<any>
  // test:() =>  void
  // getAllpurchasesByUser:(id: string) =>  Promise<any>
  // createProduct: (product: any) =>Promise<any>
  
}

// export const ProductContext = createContext({} as ProductContextProps);
export const ProductContext = createContext({
  getAllProducts:() =>  Promise<any>
});

export const ProductProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createProduct = async (product: ProductsCreate): Promise<any> => {
    // setIsLoading(true);
    // try {
    //   return api.post("/products", product)
    // } catch (error) {
    //   return error
    // } finally{
    //   setIsLoading(false);
    // }
  }
  const getAllProducts = async (): Promise<any>  => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
  const getAllpurchases = async (): Promise<any> => {
    // setIsLoading(true);
    // try {
    //   return api.get("/purchase")
    // } catch (error) {
    //   return error as any
    // } finally{
    //   setIsLoading(false);
    // }
  }
  const getAllpurchasesByUser = async (id: string): Promise<any> => {
    // setIsLoading(true);
    // try {
    //   return api.get("/purchase")
    // } catch (error) {
    //   return error as any
    // } finally{
    //   setIsLoading(false);
    // }
    console.log('hola')
  }
  function test (){
    // setIsLoading(true);
    // try {
    //   return 'test'
    // } catch (error) {
    //   return error as any
    // } finally{
    //   setIsLoading(false);
    // }
    console.log('first')
  }

  
  
  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
      
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

