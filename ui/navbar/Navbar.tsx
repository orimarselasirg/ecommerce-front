
'use client'
import Image from 'next/image'
import styles from './navbar.module.css'
import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';
import { useCartContext } from '@/context/cartContext';

const links = [
  // {
  //   name: "Inicio",
  //   href: "/home"
  // },
  {
    name: "Productos",
    href: "/home/products"
  },
  {
    name: "Mis compras",
    href: "/home/purchase"
  },
  {
    name: "Crear producto",
    href: "/home/createProduct"
  }
]

export default function Navbar(){
  const {cart} = useCartContext()
  return (
    <div className={styles.navbar__container}>
      <div className={styles.navbar__items__container}>
        <Image
          src={require("../../public/pngegg.png")}
          alt="logo"
          width={80}
          height={70}
        />
        <ul className={styles.navbar__items}>
          {
            links.map(link => (
              <Link className={styles.navbar__item} key={link.name} href={link.href}>{link.name}</Link>
            ))
          }
        </ul>
      </div>
      <div className={styles.navbar__profile}>
        <Link style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} href={'/home/cart'}>
          <IoCartOutline size={30} style={{marginRight: 20}}/>
          {
            cart.length > 0 &&
            <span className={styles.navbar__profile__cartinfo}>{cart.length}</span>
          }
        </Link>
        <Image
          src={require("../../public/cart.jpeg")}
          alt="logo"
          width={50}
          height={50}
          style={{borderRadius: '50%'}}
        />
      </div>
    </div>
  )
}
