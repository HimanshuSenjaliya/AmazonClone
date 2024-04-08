import React, { useEffect, useState } from 'react'
import './buynow.css'

const Subtotal = ({item}) => {

  const [price , setPrice] = useState(0)

  useEffect(()=> {
    totalAmount()
  },[item])

  const totalAmount = () => {
    let price = 0;
    item.map((item)=>{
      price += item.price.cost
    })
    setPrice(price)
  }

  return (
    <div className='sub_item'>
        <h3>SubTotal ({item.length} items) : <strong style={{fontWeight : 700 , color : '#111'}}> &#8377;{price}</strong></h3>
    </div>
  )
}

export default Subtotal