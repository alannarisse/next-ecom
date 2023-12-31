import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"
import { Playfair_Display, Lato } from 'next/font/google'

export default function Product({name,image,unit_amount,id,description,metadata}: ProductType){
  const { features, artist } = metadata

  return(
    <Link href={{pathname: `/product/${id}`, query: {name,image,unit_amount,id,description,features,artist}}}><div className="shadow-lg m-4 p-2">
      <Image src={image} alt={name} width={350} height={350} priority={true}/>
      <h1>{name}</h1>
      <h2>{artist}</h2>
      <p className="text-primary">{unit_amount !== null ? formatPrice(unit_amount) : 'contact us for price'}</p>
    </div>
    </Link>
  )
}