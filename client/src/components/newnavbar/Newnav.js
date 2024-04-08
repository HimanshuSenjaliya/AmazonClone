import React from 'react'
import './newnav.css'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className="nav_data">
            <div className="left_data">
                <p><ShoppingCartIcon/>All</p>
                <p>Moblie</p>
                <p>Best Seller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Prime</p>
                <p>Today's deal</p>
                <p>Amazon Pay</p>
            </div>
            <div className="right_data">
                <img src="./nav.jpg" alt="navtar" />
            </div>
        </div>
    </div>
  )
}

export default Newnav