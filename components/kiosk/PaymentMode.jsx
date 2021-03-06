import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import { DineInContext } from '../../pages/kiosk';
import { useRouter } from 'next/router'

export const PaymentMode = (props) => {
  const router = useRouter()
  
  let location = useLocation()
  const subtotal = location.total

  const handleCashPayment = (ev) => {
    ev.preventDefault()
    const redirectURL = `http://localhost:3000/kiosk/payment_success?paymentIntent=null&paymentMethod=cash`
    router.push(redirectURL)
  }

  return (
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">
        Please select your mode of payment
      </Typography>

      <motion.div className="mt-8" 
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}>
        <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" >
          <NavLink to={
            {
              pathname:'/creditcardpayment',
              cart: location.cart,
              total: location.total
            }
          }>
            <div className="p-11">
              Credit Card / Mobile Payment
            </div>
          </NavLink>
        </Button>
      </motion.div>

      <motion.div className="mt-8"
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 1 }}>
          <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}}className="pt-8 shadow-md" onClick={ handleCashPayment }>
            <div className="p-11">
              <p> Cash Payment <br />
              </p>
            </div>
          </Button>
      </motion.div>

      <motion.div className="mt-11 flex justify-center" 
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 1.5 }}>
        <div className="p-11 shadow-md w-1/2">
          <p className="text-4xl">${subtotal.toFixed(2)} <br />
          </p>
        </div>
      </motion.div>

      <motion.div className="mt-11" 
      initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 2 }}>
        <NavLink to='/menu'>
          <Button variant="error" style={{backgroundColor: '#fe6f5e', color: '#000000'}} className="pt-8 shadow-md">
            <div className="p-11">
              Cancel
            </div>
          </Button>
        </NavLink>
      </motion.div>
    </div>
  )
}

export default PaymentMode