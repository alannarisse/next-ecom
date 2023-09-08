'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping} from 'react-icons/ai'
import { Playfair_Display } from 'next/font/google'
import {motion, AnimatePresence} from 'framer-motion'
import DarkLight from './DarkLight'

const playfair = Playfair_Display({weight: ['900','700'], subsets:['latin']})

export default function Nav({ user }: Session){
  const cartStore = useCartStore()
  return (
    <nav className="flex justify-between items-center py-8">
      <h1 className='font-playfair text-2xl'><Link className={playfair.className}href={'/'}>VergePDX Shop</Link></h1>
      <ul className='flex items-center gap-8 mb-10'>
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
          className="bg-primary text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartStore.cart.length}
          </motion.span>
          )}
          </AnimatePresence>
        </li>
        <li><DarkLight/></li>
        {/*if there's no user, render a sign in button using next auth's signIn method*/}
        {!user && (
          <li><button  onClick={() => signIn()} className="bg-primary rounded-md py-2 px-4" >Sign In</button></li>

        )}
        {user && (
          <>
            <li className="flex items-center gap-1">
            <div className="dropdown dropdown-bottom cursor-pointer">
            <label className="flex items-center gap-1"><Image tabIndex={0}
          src={user?.image as string} 
          alt={user?.name as string} 
          width={48} 
          height={48}
          className="rounded-full"/> <span className="text-xs">{user?.name as string}</span></label>
          <ul tabIndex={0} className="dropdown-content menu p-4 space-y-4 shadow-lg border-2 bg-base-100 w-62 rounded-box">
            <li><Link href={'/dashboard'}>Orders</Link></li>
            <li 
            onClick={() => {
              if(document.activeElement instanceof HTMLElement){
                document.activeElement.blur()
              }
              signOut()
            }
            
            }
            className="hover:bg-base-300 rounded-md p-1">Sign Out</li>
          </ul>
          </div>
          </li>
          </>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      
    </nav>
  )
}