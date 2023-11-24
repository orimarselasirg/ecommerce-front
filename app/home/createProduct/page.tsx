'use client'
import { useState, useEffect, useContext } from "react";
import styles from "./createproduct.module.css"
import { useForm, SubmitHandler } from "react-hook-form"
import Image from "next/image";
import api from "../../../api/axiosInstance"
import { ProductResponse, ProductsCreate } from "@/interface/Product";


type Inputs = {
  name: string;
  description: string;
  isService: string;
  price: number;
  stock: number;
  image: string;
}

export default function CreateProduct() {
  const [isService, setIsService] = useState<boolean>(false)
  const [imageProduct, setImageProduct] = useState<any>("")
  const [error, setError] = useState(null)
  const [product, setProduct] = useState<ProductsCreate>({
    name: "",
    description: "",
    isService: "false",
    price: 0,
    stock: 0,
    image: "",
  })
 
  // console.log(isLoading)

  
  const onChange = (e: any) => {
  if(e.target.name === "image"){
    const file= e.target.files[0]
      if(file){
        const imageUrl = URL.createObjectURL(file)
        setImageProduct(imageUrl)
        setProduct({
          ...product,
          image: file
        })
      }
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      })
    }
  }

  const createProductWithImage = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("picture", image);
      const response = await api.post("/products/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setProduct({
        ...product,
        image: response.data.data
      })
      await createProduct({...product, image: response.data.data})
    } catch (error) {
      console.log(error)
    }
  }
  console.log(product)

  const createProduct = async (product: ProductsCreate) => {
    try {
      await api.post("/products", product)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    await createProductWithImage(product.image)
    setProduct({
      name: "",
      description: "",
      isService: "false",
      price: 0,
      stock: 0,
      image: ""
    })
    setImageProduct("")
  }
  return (
    <div className={styles.createproduct__container__container}>

      <div className={styles.createproduct__container}>
        <form onSubmit={onSubmit}>
        <p className={styles.title}>Crear Producto </p>
        <p className={styles.message} style={{marginBottom: 25}}>Llene la información solicitada para crear un producto. </p>
        <div className={styles.createproduct__input__header}>
          {/* <label >Nombre producto</label> */}
          <div className={styles.createproduct__input__group}>

            <label className={styles.createproduct__container__label}>Nombre producto</label>
            <input  
              type="text"
              name="name"
              value={product.name}
              onChange={onChange}
              placeholder="Nombre producto o servicio"
              className={styles.createproduct__container__input}
            />
            
          </div>
          <div className={styles.createproduct__input__group}>
            <label className={styles.createproduct__container__label}>¿Producto o Servicio?</label>
            <select name="isService" id="" className={styles.createproduct__container__input} onChange={(e)=> onChange(e)}>
              <option value="false">Producto</option>
              <option value="true">Servicio</option>
            </select>
          </div>
        </div>

        <div className={styles.createproduct__input__header}>
          <div className={styles.createproduct__input__group}>
            <label className={styles.createproduct__container__label}>Precio</label>
            <input 
              name="price"
              type="number"
              value={product.price}
              onChange={onChange}
              placeholder="Precio"
              className={styles.createproduct__container__input}
            />
          </div>
          {
            product.isService === "false" && (
              <div className={styles.createproduct__input__group}>
                <label className={styles.createproduct__container__label}>Stock</label>
                <input 
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={onChange}
                  placeholder="Stock"
                  className={styles.createproduct__container__input}
                />
               
              </div>
            )
          }
        </div>
      
          <div className={styles.createproduct__container__inputs__body}>
            
            <div className={styles.createproduct__input__group}>
              <label className={styles.createproduct__container__label}>Descripción del producto</label>
              <textarea 
                name="description"
                onChange={onChange}
                value={product.description}
                placeholder="Ingresa una breve descripción del producto"
                className={styles.createproduct__container__input}
                style={{height: 100}}
              />
        
            </div>
            <div className={styles.createproduct__container__inpufile}>
              <label className={styles.createproduct__container__label} style={{textAlign: 'center', marginBottom: 15, marginTop: 10}}>Selecciona la imagen de tu producto o servicio</label>
              <input
                type="file"
                name="image"
                onChange={onChange}
              />
            </div>
            <div className={styles.createproduct__container__previewimage}>
              <Image
                src={imageProduct === "" ? require("../../../public/placeholder-image.jpeg"): imageProduct}
                width={200}
                height={200}
                alt="product"
                objectFit="cover"
                className={styles.createproduct__container__previewimage}
              />
            </div>
          </div>
          <div className={styles.createproduct__container__savebutton__container}>
            <button onClick={onSubmit} className={styles.createproduct__container__savebutton}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
