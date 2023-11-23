import Image from 'next/image'
import styles from './productcard.module.css'
import { MdAddShoppingCart } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface Props {
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({description, image, price, title}: Props){
  return(
    <div className={styles.productcard__container}>
      <div style={{width: '100%', height: 300}}>
        <div className={styles.productcard__info__container__title}>
          <h3 className={styles.productcard__info__title}>{title}</h3>
        </div>
        <Image
          src={image}
          alt="product"
          className={styles.productcard__image}
          // width='100%'
          // height={120}
          // objectFit="cover"          
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
            <div className={styles.productcard__info__stock}>
              <MdAddShoppingCart size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}