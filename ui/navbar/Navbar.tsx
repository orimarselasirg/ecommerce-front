
'use client'
import Image from 'next/image'
import styles from './navbar.module.css'
import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';
import { useCartContext } from '@/context/cartContext';
import { useUser } from '@auth0/nextjs-auth0/client';

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
  const { user, error, isLoading } = useUser();
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
            !user && links.map(link => (
              link.name === "Productos" &&
              <Link className={styles.navbar__item} key={link.name} href={link.href}>{link.name}</Link>
              
            ))
          }
          {
            user && links.map(link => (
              
              <Link className={styles.navbar__item} key={link.name} href={link.href}>{link.name}</Link>
              
            ))
          }
        </ul>
      </div>
      <div className={styles.navbar__profile}>
        {
          !user &&
          <a href="/api/auth/login" style={{marginRight:30}}>
            Ingresar
          </a>
        }
        {
          user &&
          <p style={{marginRight: 20}}>
            Bienvenid@ {user?.name}
          </p>
        }
        {
          user &&
          <Link style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} href={'/home/cart'}>
            <IoCartOutline size={30} style={{marginRight: 20}}/>
            {
              cart.length > 0 &&
              <span className={styles.navbar__profile__cartinfo}>{cart.length}</span>
            }
          </Link>
        }
        <Image
          src={user?.picture ?? require("../../public/cart.jpeg")}
          alt="logo"
          width={50}
          height={50}
          style={{borderRadius: '50%'}}
        />
      </div>
    </div>
  )
}
