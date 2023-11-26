'use client'
import { useCartContext } from "@/context/cartContext"
import styles from './cart.module.css'
import CartItem from "@/ui/cartItem/CartItem"
import {useEffect, useState} from 'react';
import { formatNumberWithCommas } from "@/util/helpers";
import { Order, ProductOrder } from "@/interface/Cart";
import api from "@/api/axiosInstance";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ReactModal from 'react-modal';
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation'


export default function Cart() {
  const querystring = window.location.search
  const params = new URLSearchParams(querystring)
  const { user, error, isLoading } = useUser();
  const {cart, setCart} = useCartContext()
  const [preferenceId, setPreferenceId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [orderState, setOrderState] = useState<Order>({
    products: [],
    total: 0,
    isApproved: params.get('status') === 'approved' ? true : false,
    transaction: params.get('merchant_order_id') ?? '',
    userId: user?.subsid ?? '123'
  });

  console.log(user)
  
  console.log(params.get('payment_id'))
  console.log(params.get('external_reference'))
  console.log(params.get('merchant_order_id'))
  console.log(params.get('status'))

  useEffect(() => {
    initMercadoPago('APP_USR-b801bb89-cabb-4fe2-b490-6d21539f34ba', {locale: 'es-CO'});
  },[])

  useEffect(() => {
    if(params.get('status') !== null && params.get('status') === 'approved') {
      setOpenModal(true)
      // payOrder(orderState.userId!, orderState)
    }
  },[params.get('status')])


  
  const updateTotal = () => {
    const newTotal = cart.reduce((acc, item) => acc + Number(item.price * Number(item.quantity)-1), 0);
    setTotal(newTotal);
    setOrderState({
    ...orderState,
      total: newTotal
    });
  };

  const closeModal = () => {
    if(params.get('status') !== null && params.get('status') === 'approved') {
      payOrder(orderState.userId!, orderState)
    }
    setOpenModal(false)
    router.push('/home/products')
  }

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

  const handleCheckout = async () => {
    try {
      const response = await api.post('/create_preference', {});
      setPreferenceId(response.data.id)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const cleanCart = () => {
    setCart([]);
    setOrderState({
      products: [],
      total: 0,
      isApproved: false,
      transaction: '',
      userId: ''
    })
  }



  const payOrder = async (userId: string, order: Order) => {
    try {
      const response = await api.post(`/carts/${userId}`, order)
      console.log(response)
      setCart([])
      setOrderState({
        isApproved: '',
        products: [],
        total: 0,
        transaction: '',
        userId: ''
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
          total > 0 && !preferenceId &&
          <>
            <div>
              <button className={styles.cart__paybutton} onClick={()=>handleCheckout()}>Checkout</button>
            </div>
              
          </>
        }
        <div> 
          {
          preferenceId && 
            <Wallet initialization={{ preferenceId: preferenceId }} />
          }
        </div>
        {
          cart.length > 0 && 
          <div>
            <button className={styles.cart__paybutton} onClick={()=>cleanCart()}>Limpiar carrito</button>
          </div>
        }
      </div>
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOrderState({...orderState, isApproved: ''})}
        style={{
          overlay: {alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'},
          content: {position: 'relative', width: 600, height: 700, backgroundColor: 'white', borderRadius: 5}
        }}
        closeTimeoutMS={200}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick={true}
      >
        <div className={styles.modal__container}>
          <FaRegCheckCircle size={80} style={{marginBottom: 35}} color='#0e191f'/>

          <h3>El pedido y el pago ha sido generado exitosamente</h3>
          <p style={{textAlign: 'center', marginBottom: 30, marginTop: 50}}>Estimado comprador, el pedido estar siendo gestionado y muy pronto recibiras sus producto y servicios</p>
          
            <p style={{marginBottom: 55}}>a continuacion encontrara los datos de su pago</p>
            <div className={styles.rowinfo}>
              <p className={styles.rowtitle}>
                Estado del pago
              </p>
              <span>
                {params.get('status')}
              </span>
            </div>
            <div className={styles.rowinfo}>
              <p className={styles.rowtitle}>
                Número de transacción
              </p>
              <span>
                {params.get('merchant_order_id')}
              </span>
            </div>
            <div className={styles.rowinfo}>
              <p className={styles.rowtitle}>ID del pago</p>
              <span>
              {params.get('payment_id')}
              </span>
            </div>
          <button className={styles.modalButton} onClick={closeModal}>Cerrar</button>
        </div>
      </ReactModal>
    </div>
  )
}
