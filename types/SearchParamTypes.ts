type Params = {
  id: string
}

type SearchParams = {
  name: string
  image: string
  unit_amount: number | null
  id: string
  description: string
  quantity: number | 1
  features: string
  artist: string
}

export type SearchParamTypes = {
  params: Params,
  searchParams: SearchParams
}