'use client'
import api from '@/api/axiosInstance';
import { Product } from '@/interface/Product';
import { Purchase, PurchaseResponse } from '@/interface/Purchase';
import React, {createContext, useContext, Dispatch, SetStateAction,useState} from 'react';

interface CartContextProps {
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
  cartsByUsers: () => Promise<Purchase[]>;
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => [],
  cartsByUsers: async () => [],
  loading: false,
  setLoading: () => false
})

export const CartProvider = ({children}: any) => {
  const [cart, setCart] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const cartsByUsers = async (): Promise<Purchase[]> => {
    setLoading(true)
    try {
        const {data} = await api.get<PurchaseResponse>('/carts')
        console.log(data)
        return data.data
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setLoading(false)
    }
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartsByUsers,
        loading,
        setLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)