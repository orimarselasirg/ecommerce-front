'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Loader from '../ui/loader/Loader';

export default function Home() {
  const { user, error, isLoading } = useUser();

 
  
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
                    
                      <Link href='/home/products' className={styles.login__container__signbutton} >
                        Continuar
                      </Link>
                    
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
