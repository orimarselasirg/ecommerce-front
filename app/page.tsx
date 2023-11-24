'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Router from 'next/router';

export default function Home() {
  const { user, error, isLoading } = useUser();
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
       <h1>Login</h1>
         <a href="/api/auth/login">
          login
       
        </a>
      
        {
          isLoading? (
            <div>Loading...</div>
          ) : error? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              {user? (
                <div>
                  <h1>Welcome {user.name}</h1>
                  <div>
                    <a href="/api/auth/logout">
                      Logout
                    </a>
                  </div>
                  <div>
                    <Link href='/home/products'>
                      Continuar
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          )
        }


       
      </div>
    </main>
  )
}
