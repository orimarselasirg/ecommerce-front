"use client"
import { Suspense, useEffect, useState, useContext } from "react"
import ProductCard from "@/ui/productCard/ProductCard"
import styles from "./product.module.css"
import api from "@/api/axiosInstance"
import { Product, ProductResponse } from "@/interface/Product"
import { CartContext, useCartContext } from "@/context/cartContext"
import { useProductContext } from "@/context/productContext"


export default function Product() {
  const [productList, setProductList] = useState<Product[]>([])
  const {cart, setCart} = useCartContext()
  const { products, setProducts, productsOrdered } = useProductContext()

  // useEffect(() => {
  //   // getProductData()
  //   setProductList(products);
  //   console.log('first')
  // },[products])
  
  const addProductToCart = (product: any) => {
    setCart([...cart, product])
  } 

  
  return (
    <div className={styles.products__container}>
      {
        productsOrdered.map((product, index) => {
          return (
            
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
            
          )
        })
      }
    </div>
  )
}
