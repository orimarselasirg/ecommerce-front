'use client'
import { useCartContext } from "@/context/cartContext"
import styles from './cart.module.css'
import CartItem from "@/ui/cartItem/CartItem"
import {useState} from 'react';
import { formatNumberWithCommas } from "@/util/helpers";
import { Order, ProductOrder } from "@/interface/Cart";
import api from "@/api/axiosInstance";

export default function Cart() {
  const {cart, setCart} = useCartContext()
  const [total, setTotal] = useState(0);
  const [orderState, setOrderState] = useState<Order>({
    products: [],
    total: 0,
    isApproved: true,
    transaction: '234234',
    userId: '123123123'
  });

  const updateTotal = () => {
    const newTotal = cart.reduce((acc, item) => acc + Number(item.price * Number(item.quantity)-1), 0);
    setTotal(newTotal);
    setOrderState({
    ...orderState,
      total: newTotal
    });
  };

  const handleQuantityChange = (itemId: any, newQuantity: number) => {
    const updatedCartItems = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCartItems);
    setOrderState({
      ...orderState,
      products: updatedCartItems
    })
    updateTotal();
  };

  const payOrder = async (userId: string, order: Order) => {
    try {
      const response = await api.post(`/carts/${userId}`, order)
      console.log(response)
      setCart([])
      setOrderState({
        isApproved: true,
        products: [],
        total: 0,
        transaction: '123123',
        userId: '123123123'
      })
      setTotal(0);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.cart__container}>
      <div className={styles.cart__container__card}>
        <h2 style={{marginBottom: 20}}>Mi Carrito de Compras</h2>
        <div className={styles.cartitem__container}>
          <p className={styles.cartitem__input} style={{width: 40}}>Item</p>
          <p className={styles.cartitem__input} style={{width: 140}}>Nombre producto</p>
          <p className={styles.cartitem__input} style={{width: 70}}>Precio</p>
          <p className={styles.cartitem__input} style={{width: 90}}>Cantidad</p>
          <p className={styles.cartitem__input} style={{fontWeight: 600}}>Total</p>
        </div>
        {
          cart.map((item, index) => (
            <CartItem key={index} id={index+1} title={item.name} price={item.price} onQuantityChange={(newQuantity) => handleQuantityChange(item._id, newQuantity)}/>
          ))
        }
        <div className={styles.cartitem__total}>
          <span style={{marginRight: 30}}>Total</span>
          <p>${formatNumberWithCommas(total)}</p>
        </div>
        {
          total > 0 &&
          <div>
            <button className={styles.cart__paybutton} onClick={()=>payOrder(orderState.userId, orderState)}>Pagar</button>
          </div>
        }
      </div>
    </div>
  )
}
