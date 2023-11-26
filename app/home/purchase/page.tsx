
'use client'
import { useCartContext } from '@/context/cartContext'
import { Purchase } from '@/interface/Purchase'
import { formatNumberWithCommas } from '@/util/helpers'
import {useContext, useEffect, useState} from 'react'
import styles from './puchases.module.css'
import Pagination from '@/ui/pagination/Pagination'
import ReactPaginate from 'react-paginate';

const columns = [
  {
    Header: 'Item',
    accessor: '',
  },
  {
    Header: 'Transacción',
    accessor: 'transaction',
  },
  {
    Header: 'Estado',
    accessor: 'isApproved',
  },
  {
    Header: 'Valor Total',
    accessor: 'total"',
  },
  {
    Header: 'Ver detalle',
    accessor: '',
  }
]

export default function Purchase() {
  const {cart, cartsByUsers} = useCartContext()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(()=>{
    getAllPurchases()
  },[])

  let itemPerPage = 10;

  const getAllPurchases = async (): Promise<void> => {
    const res = await cartsByUsers()
    setPurchases(res)
  }
  const endOffset = itemOffset + itemPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = purchases.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(purchases.length / itemPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemPerPage) % purchases.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.purchase__container}>
      <table className={styles.purchase__container__table}>
        <tr className={styles.purchase__table__header}>
          {
            columns.map((column, index) => (
              <th key={index} className={styles.purchase__table__itemheader}>{column.Header}</th>
            ))
          }
        </tr>
        {
          currentItems.map((purchase, index) => (
            
            <tr key={index}className={styles.purchase__table__body}>
              <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{index+1}</td>
              <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{purchase.transaction}</td>
              <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white', color: purchase.isApproved ? '#9c9cf8' : '#f57a7a'}}>{purchase.isApproved ? 'Aprobado' : 'Rechazado'}</td>
              <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>$ {formatNumberWithCommas(purchase.total)}</td>
              <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{'Ver Detalles'}</td>
            </tr>
          ))
        }
      </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" Siguiente >>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<< Anterior"
          renderOnZeroPageCount={() => { }}
          containerClassName={styles.pagination}
          activeClassName={styles.activeClassName}
          previousLinkClassName={styles.previousLinkClassName}
          nextLinkClassName={styles.nextLinkClassName}
          pageClassName={styles.pageClassName}
          
        />
      {/* </div> */}
    </div>
  )
}
