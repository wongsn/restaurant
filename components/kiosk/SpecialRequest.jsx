import React, {useContext, useState, Fragment, useEffect, useReducer} from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext} from '../../pages/kiosk/index.js'


export const SpecialRequest = (props) => {
  let location = useLocation()
  console.log(location.itemProp.item)
  const initialState = JSON.parse(JSON.stringify(location.itemProp.item[0]))
  console.log(initialState === location.itemProp.item[0])
  // change to allow sets
  //change to index for diff prices
  const {cartItems, setCartItems} = useContext(CartContext)
  const [currentItem, setCurrentItem] = useState(initialState)
  const changeAddons = (itemIndex, didAdd) => {
    if (didAdd && currentItem.ingredients[itemIndex].quantity < currentItem.ingredients[itemIndex].limit) {
      currentItem.ingredients[itemIndex].quantity += 1
      currentItem.price[0].price += currentItem.ingredients[itemIndex].price_per_unit
    }
    else if (!didAdd && currentItem.ingredients[itemIndex].quantity > 0) {
      currentItem.ingredients[itemIndex].quantity -= 1
      currentItem.price[0].price -= currentItem.ingredients[itemIndex].price_per_unit
    }
    setCurrentItem({...currentItem, price: currentItem.price, ingredients: currentItem.ingredients})
  }

  const handleAddToCart = () => {
    // need to change to allow sets

    setCartItems([...cartItems, currentItem])
  }

  const data = currentItem.ingredients
                .map((ingredient, idx)=>{
                  return ( 
                      <Grid container key={idx} >
                        <Grid item xs={8}>
                          <div className="pr-5 py-5">
                           {ingredient.name}
                          </div>
                        </Grid>

                        <Grid item xs={4}>
                          <div className="pt-5">
                            <p>
                              {ingredient.quantity}
                            </p>
                            <p>
                              <a onClick={() => {changeAddons(idx, false)}}><RemoveIcon color="error"/></a>
                              <a onClick={() => {changeAddons(idx, true)}}><ControlPointIcon color="success"/></a>
                            </p>

                          </div>
                        </Grid>
                      </Grid>
                  )
                })

  return (

      <>

        <div className="pt-8 mt-11">

          <Typography variant="h3" color="initial">Any Special Requests?</Typography>
        {/* {location.itemProp.item.map((item, i) =>)} */}
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs>
              <div className="mt-8 shadow-lg h-96 rounded-3xl">
                { data }
              </div>
              <Typography variant="h6" color="initial">
               Subtotal: {currentItem.price[0].price}
              </Typography>
            </Grid>
          </Grid>

           {/* <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}>

           </motion.div> */}

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>


          <NavLink to="/menu">
            <Button variant="success" style={{backgroundColor: '#009900', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => { handleAddToCart()}}>
            <div className="p-11">
                  Add to Cart
            </div>
            </Button>
         </NavLink>

          </motion.div>

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>
            
            <NavLink to="/menu">
              <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md">
                <div className="p-11">
                    Cancel Item
                </div>
              </Button>
            </NavLink>

          </motion.div>
        </div>
      </>
  )
}

export default SpecialRequest