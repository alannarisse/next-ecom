'use client'

import {motion} from 'framer-motion'
import Image from 'next/image'
import crazy from '@/public/cray-duck.webp'
import Link from 'next/link'
import { useCartStore } from '@/store'
import {useEffect} from 'react'

export default function OrderConfirmed(){
  const cartStore = useCartStore()
  useEffect(() => {
    cartStore.setPaymentIntent('')
    cartStore.clearCart()
  },[])
  const checkoutOrder = () => {
    setTimeout(() => {cartStore.setOnCheckout('cart')},1000);
    cartStore.toggleCart()
  }
  return(
    <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}}>
      <div>
        <h1 className="mb-4 text-xl">Your order was placed!</h1>
        <h2 className="mb-4">Check your email for the receipt.</h2>
        <Image src={crazy} alt="dog water skiing"/>
      </div>
      <div>
        <Link href={'/dashboard'}>
        <button
        onClick={checkoutOrder}
        className="bg-primary  mt-4 rounded-md py-2 px-4">Check Your Order</button>
        </Link>
        
      </div>
    </motion.div>
  )
}