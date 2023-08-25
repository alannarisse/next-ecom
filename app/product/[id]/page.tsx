import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamTypes"
import formatPrice from "@/util/PriceFormat"

export default async function Product({searchParams}: SearchParamTypes){
  return(
  <article className="grid grid-cols-2 gap-2">
    <div>
    <Image src={searchParams.image} alt={searchParams.name} width={650} height={650}/>
  </div>
  <div>
      <h1>{searchParams.name}</h1>
      <h2>{searchParams.unit_amount !== null ? formatPrice(searchParams.unit_amount) : 'contact us for price'}</h2>
      <p>{searchParams.artist}</p>
      <p>{searchParams.description}</p>
      <p>{searchParams.features}</p>
      <button className="py-2 px-4 bg-teal-700 text-white mt-3">Add to cart</button>
    </div>
  </article>
  )
}