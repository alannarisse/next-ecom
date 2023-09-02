'use client'

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle, IoCloseSharp} from 'react-icons/io5'
import basket from '@/public/basket-icon.png'
import { motion, AnimatePresence } from 'framer-motion'
import Checkout from "./Checkout"

export default function Cart() {
  const cartStore = useCartStore()

  // total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount * item.quantity
  }, 0)
  // console.log(cartStore.isOpen)
  // console.log(cartStore.cart.length)
  return (
    <motion.div layout
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    onClick={() => cartStore.toggleCart()} className="fixed left-0 top-0 w-full h-screen bg-black/25">
      <motion.div layout onClick={(e) => e.stopPropagation()}className="bg-white absolute right-0 top-o w-full lg:w-1/3 h-screen p-12 overflow-y-scroll text-gray-700">
        <div onClick={() => cartStore.toggleCart()} className="absolute top-2 right-1"><IoCloseSharp /></div>
        
        {cartStore.cart.length > 0 && (<h1>here's your shopping list</h1>)}
        <AnimatePresence>
        {!cartStore.cart.length && (
                <motion.div
                animate={{scale:1, rotateZ:0,opacity:0.75}}
                initial={{scale:0, rotateZ:-10, opacity:0}}
                exit={{scale:0, rotateZ:-10, opacity:0}}
                >
                  <h1>Cart is empty</h1>
                  <Image src={basket} width={200} height="200" alt="empty basket" />
                </motion.div>
              )}
        </AnimatePresence>
        
        {/* Cart Items */}
        {cartStore.onCheckout === 'cart' && (
        <>
        {cartStore.cart.map((item) => (
          
          <motion.div layout key={item.id} className="flex py-4 gap-4">
            <Image className="rounded-md h-24" src={item.image} alt={item.name} width={120} height={120}/>
            <div>
              <h2>{item.name}</h2>
              {/* view and change quanitity */}
              <div className="flex gap-2">
              <h2>{item.quantity}</h2>
              
              <button onClick={() => cartStore.removeProduct(
                {
                id: item.id,
                image: item.image,
                name: item.name,
                unit_amount: item.unit_amount,
                quantity: item.quantity
                })
              }><IoRemoveCircle/></button>
              <button onClick={() => cartStore.addProduct(
                {
                id: item.id,
                image: item.image,
                name: item.name,
                unit_amount: item.unit_amount,
                quantity: item.quantity
                })
              }
                ><IoAddCircle/></button>
              </div>

              <p>{item.unit_amount && formatPrice(item.unit_amount)}</p>
            
              
             </div>

            
              
          </motion.div>
          
        ))}
        </>
        )}
          {cartStore.cart.length > 0 && (
              <>
              <p>Total: {formatPrice(totalPrice)}</p>

              <button 
              onClick={() => cartStore.setOnCheckout("checkout")}
              className="bg-teal-600 text-white mt-4 rounded-md py-2 px-4">
                Check Out
              </button>
              </>
              )} 
              {/* checkout form */}
              {cartStore.onCheckout === 'checkout' && <Checkout />}
            
      </motion.div>
    </motion.div>
  )
}