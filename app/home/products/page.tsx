import ProductCard from "@/ui/productCard/ProductCard"
import styles from "./product.module.css"

const producrsList = [
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },
  {
    title: "Queso",
    price: 20000,
    image: require("../../../public/productos-elaborados-12.jpg"),
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quaerat quidem quasi, quibusdam quod, quod, quod, quod."
  },

]

export default function Product() {
  return (
    <div className={styles.products__container}>
      {
        producrsList.map((product, index) => {
          return (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          )
        })
      }
    </div>
  )
}
