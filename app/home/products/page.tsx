"use client"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import ProductCard from "../../../ui/productCard/ProductCard"
import { Product } from "../../../interface/Product"
import { useCartContext } from "../../../context/cartContext"
import { useProductContext } from "../../../context/productContext"
import Loader from "../../../ui/loader/Loader"
import styles from "./product.module.css"


export default function Product() {
  const {cart, setCart} = useCartContext()
  const { productsOrdered, isLoading, products, getAllProducts } = useProductContext()
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getAllProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const addProductToCart = (product: any) => {
    setCart([...cart, product])
  } 

  let itemPerPage = 8;

  const endOffset = itemOffset + itemPerPage;
  const currentItems = productsOrdered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productsOrdered.length / itemPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemPerPage) % productsOrdered.length;
    setItemOffset(newOffset);
  };

  
  return (
    <div className={styles.products__container__container}>
        <ReactPaginate
        breakLabel="..."
        nextLabel=" Siguiente >>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<< Anterior"
        renderOnZeroPageCount={() => { }}
        containerClassName={styles.pagination}
        activeClassName={styles.activeClassName}
        previousLinkClassName={styles.previousLinkClassName}
        nextLinkClassName={styles.nextLinkClassName}
        pageClassName={styles.pageClassName}
      />
      <div className={styles.products__container}>
      {
        isLoading ? <Loader/>:
        currentItems.map((product, index) => {
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
    </div>
  )
}
