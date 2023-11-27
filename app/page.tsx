'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Loader from '../ui/loader/Loader';
import styles from './page.module.css'
import { useUserContext } from '../context/userContext';
import { UserCreateInput } from '../interface/User';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState <UserCreateInput>();
  const {createUser, getUserByEmail} = useUserContext()
  const router = useRouter()

  useEffect(() => {
    setUserData({
      name: user?.name!,
      lastname: user?.name!,
      email: user?.email!,
      role: 'user',
      identification: user?.sid!,
      status: true
    })
  },[user])

  const creatUser = async (user: UserCreateInput) => {
    try {
      const res = await createUser(user)
      await getUserByEmail(user.email)
      localStorage.setItem('email', user.email)
      if(res.status || !res.status) {
        router.push('/home/products')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <main className={styles.main}>
    <div className={styles.description}>
      <h1 style={{fontSize: 40}}>Byte4bit Ecommerce</h1>
      {
        isLoading ? 
        <Loader/>
        :
        <div>
        <div className={styles.login__container}>
        <Image
            src={require("../public/pngegg.png")}
            alt="logo"
            width={150}
            height={150}
          />
          {
            !user &&
            <div>
              <div className={styles.login__container__signbutton}>
                <a href="/api/auth/login">
                  Sign Up or Sign In
                </a>
              </div>
              <Link className={styles.login__container__signbutton} href='/home/products'>
                Ingresa como invitado
              </Link>
            </div>
          }
          {
          user &&
            <div className={styles.loged__container}>
              <h1 style={{marginBottom: 30}}>Bienvenido {user.name}</h1>
              <div className={styles.login__container__signbutton}>
                <a href="/api/auth/logout">
                  Logout
                </a>
              </div>
              
                <button onClick={()=>creatUser(userData!)} className={styles.login__container__signbutton} >
                  Continuar
                </button>
            </div>
          }
          <span className={styles.login__note}>
            Estimado usuario, puede ingresar como invitado, sin embargo para disfrutar de una mejor experiencia y contar con
            todas las opciones de la tienda, le recomendamos registrarse.
          </span>
        </div>
      </div>
      }
    </div>
  </main>
  )
}
