import styles from './radiochecks.module.css'

interface Props {
  order: string
  setOrder(order: string): void
}

export default function RadioChecks({order, setOrder}: Props){

  const changeOrder = (newOrder: string) => {
    setOrder(newOrder);
  };

  return (
    <div className={styles.radio__container}>
      <p className={styles.radio__text}>Tipo de ordenamiento</p>
      <label className={styles.radio__item}>
        <input
          type="radio"
          name="order"
          value="asc"
          checked={order === 'asc'}
          onChange={() => changeOrder('asc')}
        />
        Ascendente
      </label>
      <label className={styles.radio__item}>
        <input
          type="radio"
          name="order"
          value="desc"
          checked={order === 'desc'}
          onChange={() => changeOrder('desc')}
        />
        Descendente
      </label>
    </div>
   )
}