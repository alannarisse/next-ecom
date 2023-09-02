'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping} from 'react-icons/ai'
import { Playfair_Display } from 'next/font/google'
import {motion, AnimatePresence} from 'framer-motion'

const playfair = Playfair_Display({weight: ['900','700'], subsets:['latin']})

export default function Nav({ user }: Session){
  const cartStore = useCartStore()
  return (
    <nav className="flex justify-between items-center py-8">
      <h1><Link className={playfair.className}href={'/'}>VergePDX Shop</Link></h1>
      <ul className='flex items-center gap-12 mb-10'>
        <li 
        className="border-black border-x-teal-800 text-3xl relative cursor-pointer"  onClick={() => cartStore.toggleCart()} 
        >
          <AiFillShopping />
          <AnimatePresence>
          {cartStore.cart.length > 0 && (
          <motion.span 
          animate={{scale:1}} 
          initial={{scale:0}} 
          exit={{scale:0}}
          className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartStore.cart.length}
          </motion.span>
          )}
          </AnimatePresence>
        </li>
        {/*if there's no user, render a sign in button using next auth's signIn method*/}
        {!user && (
          <li><button onClick={() => window.open("google.com", "_blank")} className="bg-teal-600 text-white rounded-md py-2 px-4" >Sign In</button></li>

        )}
        {user && (
          <>
          <li className="flex items-center gap-1"><Image 
          src={user?.image as string} 
          alt={user?.name as string} 
          width={48} 
          height={48}
          className="rounded-full"/> <span className="text-xs">{user?.name as string}</span></li>
          </>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      
    </nav>
  )
}