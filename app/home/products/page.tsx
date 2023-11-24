"use client"
import { Suspense, useEffect, useState, useContext } from "react"
import ProductCard from "@/ui/productCard/ProductCard"
import styles from "./product.module.css"
import api from "@/api/axiosInstance"
import { Product, ProductResponse } from "@/interface/Product"
import { CartContext, useCartContext } from "@/context/cartContext"

export default function Product() {
  const [productList, setProductList] = useState<Product[]>([])
  // const [cart, setCart] = useState<Product[]>([])
  const {cart, setCart} = useCartContext()
  useEffect(() => {
    getProductData()
  },[])
  const getProductData = async () => {
    try {
      const response = await api.get('/products')
      setProductList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  const addProductToCart = (product: any) => {
    console.log('first')
    setCart([...cart, product])
  } 
  console.log(cart)

  return (
    <div className={styles.products__container}>
      {
        productList.map((product, index) => {
          return (
            <Suspense fallback={<div>...cargando</div>} key={index}>
              <ProductCard
                key={index}
                _id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                quantity={product.quantity}
                description={product.description}
                onAddToCart={addProductToCart}
              />
            </Suspense>
          )
        })
      }
    </div>
  )
}
