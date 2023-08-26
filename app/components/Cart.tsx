'use client'

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import basket from '@/public/basket-icon.png'

export default function Cart() {
  const cartStore = useCartStore()
  console.log(cartStore.isOpen)
  console.log(cartStore.cart.length)
  return (
    <div onClick={() => cartStore.toggleCart()} className="fixed left-0 top-0 w-full h-screen bg-black/25">
      <div onClick={(e) => e.stopPropagation()}className="bg-white absolute right-0 top-o w-1/3 h-screen p-12 overflow-y-scroll text-gray-700">
        {cartStore.cart.length > 0 && (<h1>here's your shopping list</h1>)}
        {!cartStore.cart.length && (
                <div>
                  <h1>Cart is empty</h1>
                  <Image src={basket} width={200} height="200" alt="empty basket" />
                </div>
              )}

        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
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
             
              {cartStore.cart.length > 0 && (
              <button className="bg-teal-600 text-white mt-4 rounded-md py-2 px-4">Check Out</button>
              )} 
              
              
            
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}