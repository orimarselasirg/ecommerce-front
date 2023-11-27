'use client'
import Image from 'next/image'
import styles from './productcard.module.css'
import { MdAddShoppingCart } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface Props {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  description: string;
  quantity: number | string;
  onAddToCart: ({description,price, title, image, _id}: any) => any;
}

export default function ProductCard({description, image, price, name, _id, quantity, onAddToCart}: Props){


  return(
    <div className={styles.productcard__container}>
      <div style={{width: 300, height: 300}}>
        <div className={styles.productcard__info__container__title}>
          <h3 className={styles.productcard__info__title}>{!name ? "Producto" : name}</h3>
        </div>
        <Image
          src={image === "test" || image === "" ? require("../../public/fotosequipo2.avif"): image}
          alt="product"
          className={styles.productcard__image}
          width= {200}
          height={200} 
          // width='100%'
          // height={120}
          objectFit="contain"          
        />
        <div className={styles.productcard__info__container__price}>
          <span className={styles.productcard__info__price}>${price}</span>
        </div>
        <div className={styles.productcard__info__container}>
          <p className={styles.productcard__info__container__text}>{description}</p>
          <div className={styles.productcard__info__container__icons}>
            <div className={styles.productcard__info__stock}>
              <FaCheck />
              <span>Stock</span>
            </div>
            <div className={styles.productcard__info__stock} onClick={()=>onAddToCart({description,price, name, image, _id, quantity})}>
              <MdAddShoppingCart size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}