'use client'
import { useState } from "react";
import ReactModal from "react-modal";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { ProductsCreate } from "../../../interface/Product";
import Loader from "../../../ui/loader/Loader";
import { useProductContext } from "../../../context/productContext";
import ProductCard from "../../../ui/productCard/ProductCard";
import styles from "./createproduct.module.css"

export default function CreateProduct() {
  const [imageProduct, setImageProduct] = useState<any>("")
  const [error, setError] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const {createProduct, createProductWithImage, isLoading} = useProductContext()
  const [product, setProduct] = useState<ProductsCreate>({
    name: "",
    description: "",
    isService: "false",
    price: '',
    stock: '',
    image: "",
  })

  const validateInputs = (inputs: string, name: string) => {
    const regexText = /^[a-zA-Z\s]+$/;
    const regexNumber = /^[1-9]\d*$/;
    if(name === "name" || name === "description") {
      return regexText.test(inputs);
    }
    if(name === "price" || name === "stock") {
      return regexNumber.test(inputs);
    }
  }

  const validateEmptyInputs = (campos: any) => {
    const nuevosMensajesDeError: Record<string, string> = {};
    for (const campo in campos) {
      if (!campos[campo]) {
        nuevosMensajesDeError[campo] = `El campo ${campo} no puede estar vacío`;
      }
    }
    setError((prevErrors) => {
      return {
        ...prevErrors,
        ...nuevosMensajesDeError,
      };
    });
    return Object.keys(nuevosMensajesDeError).length === 0;
  }
 
  
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
      if(validateInputs(e.target.value, e.target.name)){
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        })
      }
      if(validateEmptyInputs(e.target.value)){
        setError({
          name: "",
          description: "",
          price: "",
          stock: "",
          image: ""
        })
      }
    }
  }

  const saveProductorService = async (image: any) => {
      try {
        const response = await createProductWithImage(image)
        setProduct({
          ...product,
          image: response
        })
        await createProduct({...product, image: response})
      } catch (error) {
        console.log(error)
      }
    
  }
  
  const onSubmit = async (e: any) => {
    e.preventDefault()
    if(validateEmptyInputs(product)){
      try {
        await saveProductorService(product.image)
        setOpenModal(!openModal)
      } catch (error) {
        console.log(error)
        setOpenModal(!openModal)
      }
    } else {
      return
    }
  }

  const onCloseModal = async (e:any) => {
    e.preventDefault()
    setOpenModal(false)
  }

  const clearProductForm = () => {
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
      {
        isLoading ? <Loader/>:
        <div className={styles.createproduct__container}>
        <form onSubmit={onSubmit}>
        <p className={styles.title}>Crear Producto </p>
        <p className={styles.message} style={{marginBottom: 25}}>Llene la información solicitada para crear un producto. </p>
        <div className={styles.createproduct__input__header}>
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
            {
              error.name!== "" &&
              <p className={styles.createproduct__container__error}>{error.name}</p>
            }
            
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
            {
              error.price!== "" &&
              <p className={styles.createproduct__container__error}>{error.price}</p>
            }
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
                {
                  error.stock!== "" &&
                  <p className={styles.createproduct__container__error}>{error.stock}</p>
                }
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
              {
              error.description!== "" &&
              <p className={styles.createproduct__container__error}>{error.description}</p>
            }
        
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
              {
                error.image!== "" &&
                <p className={styles.createproduct__container__error}>{error.image}</p>
              }
            </div>
          </div>
          <div className={styles.createproduct__container__savebutton__container}>
            <button onClick={onSubmit} className={styles.createproduct__container__savebutton}>Guardar</button>
            <button onClick={(e)=>{onCloseModal(e); clearProductForm()}} className={styles.createproduct__container__clearbutton}>Limpiar Formulario</button>
          </div>
          
        </form>
        </div>
      }
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        style={{
          overlay: {alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'},
          content: {position: 'relative', width: 750, height: 700, backgroundColor: 'white', borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden'}
        }}
        closeTimeoutMS={0}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick={true}
      >
        <FaRegCheckCircle size={80}/>
        <h2 style={{marginTop: 25}}>Felicitaciones! el producto {product.name} ha sido creado con exito</h2>
        <ProductCard
          _id={'1'}
          name={product.name}
          price={product.price}
          image={product.image}
          quantity={product.stock}
          description={product.description}
          onAddToCart={()=>{}}
        />
        <div className={styles.modal_button_container}>
          <button onClick={(e)=>{onCloseModal(e); clearProductForm()}} className={styles.modalButton}>cerrar</button>
        </div>
      </ReactModal>

    </div>
  )
}
