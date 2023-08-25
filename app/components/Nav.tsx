'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping} from 'react-icons/ai'

export default function Nav({ user }: Session){
  const cartStore = useCartStore()
  return (
    <nav className="flex justify-between items-center py-8">
      <h1><Link href={'/'}>VergePDX Shop</Link></h1>
      <ul className='flex items-center gap-12 mb-10'>
        <li 
        className="border-black border-x-teal-800 text-3xl relative cursor-pointer"  onClick={() => cartStore.toggleCart()} 
        >
          <AiFillShopping />
          <span className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartStore.cart.length}
          </span>
        </li>
        {/*if there's no user, render a sign in button using next auth's signIn method*/}
        {!user && (
          <li><button onClick={() => window.open("google.com", "_blank")} className="bg-teal-600 text-white rounded-md py-2 px-4" >Sign In</button></li>
                // <button onClick={() => window.open("google.com", "_blank")}>click me</button>
                // onClick={() => signIn()}

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
      {cartStore.isOpen && <Cart />}
      
    </nav>
  )
}