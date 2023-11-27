'use client'
import { useProductContext } from '../../context/productContext'
import styles from './sidebar.module.css'
import RadioChecks from '../radioChecks/RadioChecks';
import { useState } from 'react';
import SelectOption from '../selectOptions/SelectOption';
import { IoMdExit } from "react-icons/io";
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Sidebar(){
  const {orderByParams, clearSearch, searchByParams} = useProductContext()
  const [order, setOrder] = useState<string>("asc")
  const [searchParam, setSerachParam] = useState<any>('name')
  const [inputSearch, setInputSearch] = useState<string>("")
  const { user, error, isLoading } = useUser();
  const onSearch = (e: any) => {
    setInputSearch(e.target.value)
  }
  
  const options = [
    {
      field: 'name',
      label: 'Nombre'
    },
    {
      field: 'isService',
      label: 'Servicio'
    },
    {
      field: 'price',
      label: 'Precio'
    },
    {
      field:'stock',
      label: 'Stock'
    }
  ]
  const setSearchParams = (param: string | boolean | number) => {
    setSerachParam(param)
  }
  
  return(
    <aside className={styles.sidebar__container}>

      <div className={styles.sidebar__container__content}>
      <RadioChecks
        order={order}
        setOrder={setOrder}
      />
      <SelectOption
        label='Ordenar por:'
        options={options}
        order={order}
        onChange={orderByParams}
      />

      <SelectOption
        label='Buscar por:'
        options={options}
        order={order}
        onChange={setSearchParams}
      />
        <div className={styles.sidebar__input__container}>
          <input type="text" placeholder='Ingresa tu busqueda aqui' className={styles.sidebar__input} onChange={onSearch}/>
        </div>
        <button className={styles.sidebar__searchbutton} onClick={()=>searchByParams(searchParam, inputSearch)}>Buscar</button>
        <button className={styles.sidebar__cleanbutton} onClick={()=>clearSearch()}>Reiniciar busqueda</button>
      </div>

        {
          user &&
          <button className={styles.sidebar__cleanbutton} style={{marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <a style={{marginRight: 20}} href="/api/auth/logout">
              Salir
            </a>
            <IoMdExit size={25}/>
          </button>
        }
    </aside>
  )
}