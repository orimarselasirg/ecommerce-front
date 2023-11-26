import styles from './loader.module.css'
export default function Loader () {
  return(
    
      <div style={{height: 600, display: 'flex', alignItems: 'center'}}>
        <div className={styles.spinner}></div>
      </div>
  )
}