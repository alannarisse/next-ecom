import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamTypes"
import formatPrice from "@/util/PriceFormat"
import AddCart from "./AddCart"

export default async function Product({searchParams}: SearchParamTypes){
  return(
  <article className="grid grid-cols-1 gap-2 lg:grid-cols-2 item-center">
    <div>
    <Image src={searchParams.image} alt={searchParams.name} width={650} height={650}className="w-full"
    />
  </div>
  <div>
      <h1>{searchParams.name}</h1>
      <h2>{searchParams.unit_amount !== null ? formatPrice(searchParams.unit_amount) : 'contact us for price'}</h2>
      <p>{searchParams.artist}</p>
      <p>{searchParams.description}</p>
      <p>{searchParams.features}</p>
      <AddCart {...searchParams} />
    </div>
  </article>
  )
}