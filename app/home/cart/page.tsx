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
import uuid from 'react-uuid';
import Loader from "@/ui/loader/Loader";


export default function Cart() {
  const querystring = window.location.search
  const params = new URLSearchParams(querystring)
  const { user, error } = useUser();
  const {cart, setCart} = useCartContext()
  const [preferenceId, setPreferenceId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [orderState, setOrderState] = useState<Order>({
    products: cart,
    total: 0,
    isApproved: false,
    transaction: uuid(),
    userId: user?.sid as any
  });
  
  // console.log(params.get('payment_id'))
  // console.log(params.get('external_reference'))
  // console.log(params.get('merchant_order_id'))
  // console.log(params.get('status'))

  useEffect(() => {
    initMercadoPago('APP_USR-b801bb89-cabb-4fe2-b490-6d21539f34ba', {locale: 'es-CO'});
  },[])

  useEffect(() => {
    if(params.get('status') !== null && params.get('status') === 'approved') {
      setOpenModal(true)
      updateOrder(true, params.get('merchant_order_id')!)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.get('status')])


  
 

  const updateOrder = async (isApproved: boolean, transaction: string ) => {
    const idOrder = localStorage.getItem('idOrder');
    const {data} = await api.put(`/carts-by-id/${idOrder}`, {isApproved, transaction})
    return data
  }

  const closeModal =() => {
    if(params.get('status') !== null && params.get('status') === 'approved') {
    }
    setOpenModal(false)
    router.push('/home/products')
  }

  const setProductOrderMercadoPago = (order: ProductOrder[]) => {
    const MPOrder = order.map(product => {
      return {
        id: product._id,
        title: product.name,
        description: product.description,
        unit_price: Math.ceil(product.price),
        quantity: Number(product.quantity),
        picture_url: product.image
      }
    })
    return MPOrder
  }

  const setPayerMercadoPago = (user: any) => {
    return {
      name: user.name,
      surname: user.name,
      email: user.email,
      phone: {
        area_code: '+57',
        number: parseInt('999888777')
      }
    }
  }
  const updateTotal = () => {
    const newTotal = cart.reduce((acc, item) => acc + Number(item.price * item.quantity), 0);
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
    console.log('UPDATE',updatedCartItems)
    setCart(updatedCartItems);
    console.log('CART',cart)
    setOrderState({
      ...orderState,
      products: updatedCartItems
    })
    updateTotal();
  };

  const handleCheckout = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await api.post('/create_preference', {items: setProductOrderMercadoPago(cart), payer: setPayerMercadoPago(user)});
      if(response.data.id) {
        setPreferenceId(response.data.id)
        await payOrder(orderState.userId!)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }


  const cleanCart = () => {
    setCart([]);
    setPreferenceId(null)
    setTotal(0)
    setOrderState({
      products: [],
      total: 0,
      isApproved: false,
      transaction: '',
      userId: ''
    })
  }



  const payOrder = async (userId: string) => {
    try {
      setOrderState({
        ...orderState,
        products: cart,
        isApproved: false,
        transaction: uuid(),
        userId: user?.sid as any
      })
      const {data} = await api.post(`/carts/${userId}`, orderState)
      localStorage.setItem('idOrder', data.data._id)
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
          isLoading ? <Loader/>
          :
          total > 0 && !preferenceId &&
          <> 
            <div>
              <button className={styles.cart__paybutton} onClick={(e)=>{handleCheckout(e)}}>Checkout</button>
            </div>
          </>
        }
        <div> 
          {
          preferenceId && !isLoading && 
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
