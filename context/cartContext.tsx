'use client'
import { Product } from '@/interface/Product';
import React, {createContext, useContext, Dispatch, SetStateAction,useState} from 'react';

interface CartContextProps {
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => []
})

export const CartProvider = ({children}: any) => {
  const [cart, setCart] = useState<Product[]>([])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)