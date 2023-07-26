import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/Product'
import axios from 'axios';

const Product = () => {
const {state, dispatch} = useContext(ProductContext) as any ;
console.log("state", state);


useEffect(()=>{
const fetchProduct =  async ()=>{
try {
    const {data} = await axios.get("http://localhost:3000/products")
    dispatch({type:"FETCH_PRODUCT", payload: data})
    return data;
} catch (error) {
    
}
}

fetchProduct();
},[]);


const deleteProduct = async (id:any) =>{
try {
    await axios.delete("http://localhost:3000/products/" + id)
    dispatch({type:"REMOVE_PRODUCT", payload: id})
} catch (error) {
    
}
}
const addProduct = async (product: any)=>{
    try {
        const {data} = await axios.post("http://localhost:3000/products/", product)
        dispatch({type:"ADD_PRODUCT", payload: data})
    } catch (error) {
        
    }
}
const updateProduct = async (product: any)=>{
    try {
        const {data} = await axios.put("http://localhost:3000/products/" + product.id, product)
        dispatch({type:"UPDATE_PRODUCT", payload: data})
    } catch (error) {
        
    }
}

  return (

    <div>
        {state?.products.map((item:any)=>{
            return   <div key={item.id}>
                <h1 className="text-3xl font-bold underline">  {item.name}</h1>
          
            <button className="border-2 border-rose-600" onClick={()=>{ deleteProduct(item.id)}}>DELETE</button>
            <button onClick={()=>{ updateProduct({ id: item.id, name: "test up"})}}>update</button>
           
       </div>  
        })

        }
         <button onClick={()=>{ addProduct({name: "test"})}}>add</button>
    </div>
  )
}

export default Product