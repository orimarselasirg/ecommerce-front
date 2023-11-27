
'use client'
import { useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import { useUser } from '@auth0/nextjs-auth0/client';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useCartContext } from '../../../context/cartContext'
import { Purchase } from '../../../interface/Purchase'
import { formatNumberWithCommas } from '../../../util/helpers'
import Loader from '../../../ui/loader/Loader'
import styles from './puchases.module.css'


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

const productsColumns = [
  {
    name: 'Nombre producto'
  },
  {
    name: 'Cantidad'
  },
  {
    name: 'Precio unitario'
  },
  {
    name: 'Total'
  },
  {
    name: 'Ver imagen',
  }
]

export default function Purchase() {
  const { cartsByUsers, loading} = useCartContext()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [itemOffset, setItemOffset] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [purchaseDetail, setPurchaseDetail] = useState<Purchase>();
  const { user } = useUser();
  useEffect(()=>{
    getAllPurchases()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let itemPerPage = 10;


  const getAllPurchases = async (): Promise<void> => {
    const res = await cartsByUsers(localStorage.getItem('email')!)
    setPurchases(res)
  }
  const endOffset = itemOffset + itemPerPage;
  const currentItems = purchases.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(purchases.length / itemPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemPerPage) % purchases.length;
    setItemOffset(newOffset);
  };

  const openModalData = (purchase: Purchase) => {
    setPurchaseDetail(purchase)
    setOpenModal(!openModal)
  }

  return (
    <div className={styles.purchase__container}>
      {
        loading ? <Loader/>:
        <>
          <table className={styles.purchase__container__table}>
            <tr className={styles.purchase__table__header}>
              {
                columns.map((column, index) => (
                  <th key={index} className={styles.purchase__table__itemheader}>{column.Header}</th>
                ))
              }
            </tr>
            {
              currentItems.length > 0  && currentItems.map((purchase, index) => (
                <tr key={index}className={styles.purchase__table__body}>
                  <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{index+1}</td>
                  <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{purchase.transaction}</td>
                  <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white', color: purchase.isApproved ? '#9c9cf8' : '#f57a7a'}}>{purchase.isApproved ? 'Aprobado' : 'Rechazado'}</td>
                  <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>$ {formatNumberWithCommas(purchase.total)}</td>
                  <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white', cursor: 'pointer'}} onClick={()=>openModalData(purchase)}>{'Ver Detalles'}</td>
                </tr>
              ))     
            }
          </table>
            {
              currentItems.length === 0 && 
              <div className={styles.purchase__warning}>
                <h2 style={{marginTop: 50}}>
                Estimado usuario, en estos momentos no tiene compras realizadas.
              </h2>
              <IoMdInformationCircleOutline size={110} style={{marginTop: 50, marginBottom: 50}}/>
              </div>
            }
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
          <ReactModal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(!openModal)}
            style={{
              overlay: {alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'},
              content: {position: 'relative', width: 750, height: 700, backgroundColor: 'white', borderRadius: 5}
            }}
            closeTimeoutMS={200}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick={true}
          >
            <div className={styles.modal__container}>
              <h4 style={{textAlign: 'center', marginBottom:10}}>Detalles de la compra</h4>
              <div className={styles.modal__header}>
                <div>
                  <div className={styles.modal__header__item__container}>
                    <span className={styles.modal__title__body}>N° de Transacción</span>:
                    <span className={styles.modal__value__body}>{purchaseDetail?.transaction}</span>
                  </div>
                  <div className={styles.modal__header__item__container}>
                    <span className={styles.modal__title__body}>Estado de transacción </span>:
                    <span className={styles.modal__value__body}>{purchaseDetail?.isApproved ? 'Aprobada' : 'Rechazada'}</span>
                  </div>
                  <div className={styles.modal__header__item__container}>
                    <span className={styles.modal__title__body}>Monto Total de Compra</span>:
                    <span className={styles.modal__value__body}>$ {purchaseDetail?.total}</span>
                  </div>
                </div>
                <IoMdInformationCircleOutline size={110} className={styles.icon}/>
              </div>
              <div className={styles.modal__content}>
                <table className={styles.purchase__container__table} style={{width: '100%'}}>
                  <tr className={styles.purchase__table__header}>
                    {
                      productsColumns.map((column, index) => (
                        <th key={index} className={styles.purchase__table__itemheader}>{column.name}</th>
                      ))
                    }
                  </tr>
                  {
                    purchaseDetail?.products.length! > 0 && purchaseDetail?.products.map((purchase, index) => (
                      
                      <tr key={index}className={styles.purchase__table__body}>              
                        <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{purchase.name}</td>
                        <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>{purchase.quantity}</td>
                        <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>$ {purchase?.price}</td>
                        <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white'}}>$ {purchase?.price * 5}</td>
                        <td className={styles.purchase__table__itembody} style={{backgroundColor: index % 2 == 0 ? '#f0f8ff' : 'white', cursor: 'pointer'}}>
                          <a href={purchase.image} target="_blank">Ver Imagen</a>
                        </td>
                      </tr>
                    ))
                  }
                </table>
              </div>
            </div>
            <div className={styles.modal_button_container}>
              <button onClick={()=>setOpenModal(!openModal)} className={styles.modalButton}>cerrar</button>
            </div>
          </ReactModal>
        </>
      }
    </div>
  )
}
