"use client"

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"

export default function AddCart({name,id,image,unit_amount,quantity}: AddCartType){
  const cartStore = useCartStore()
  // const [added, setAdded] = useState(false)
  return(
    <>
    <button onClick={() => cartStore.addProduct({name, id, image, unit_amount,quantity})} className="text-white px-4 py-2 my-12 font-medium rounded-md bg-teal-700">Add to cart</button>
    </>
  )
}