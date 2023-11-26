import styles  from './selectopion.module.css'

type options = {
  field: string,
  label: string,
}

interface Props {
  options: options[]
  onChange: (value_1: any, value_2: any) => void
  order: string
  label: string
}

export default function SelectOption({onChange, options, order, label}: Props){
  return (
    <div className={styles.select__container}>
      <label className={styles.select__text}>{label}</label>
      <select className={styles.select__input} onChange={(e)=>onChange(e.target.value, order)}>
        {
          options.map((option, index) => (
            <option value={option.field} key={index}> 
              {option.label}
            </option>  
          ))
        }
      </select>
    </div>
  )
}