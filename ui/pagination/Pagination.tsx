import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css'
import { formatNumberWithCommas } from '@/util/helpers';

interface Props {
  itemsPerPage: number
  // items: Array<any>
  columns: Array<any>
  purchases: Array<any>
}

export default function Pagination({ itemsPerPage, columns, purchases }: Props){

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = purchases.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(purchases.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % purchases.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
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
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );

}