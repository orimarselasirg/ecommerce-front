'use client'
import { useState } from 'react'
import styles from './cartitem.module.css'

interface Props {
  id: number;
  title: string;
  price: number;
  onQuantityChange: (value: number) => void;
  
}

export default function CartItem({id, price, title, onQuantityChange}: Props){
  const [total, setTotal] = useState('0')

  const handleQuantityChange = (newQuantity: any) => {
    setTotal(newQuantity);
    onQuantityChange(newQuantity);
  };

  const formatNumberWithCommas = (number: any) => {
    return number.toLocaleString('es-ES');
  }
  return(
    <div className={styles.cartitem__container}>
      <p className={styles.cartitem__input} style={{width: 40}}>{id}</p>
      <p className={styles.cartitem__input} style={{fontWeight: 600, width: 140}}>{title}</p>
      <span className={styles.cartitem__input} style={{width: 70}}>${formatNumberWithCommas(price)}</span>
      <input type="number" onChange={(e)=>handleQuantityChange(e.target.value)} className={styles.cartitem__input__number}/>
      <p className={styles.cartitem__input} style={{fontWeight: 600}}>${formatNumberWithCommas(Number(total) * price)}</p>
    </div>
  )
}