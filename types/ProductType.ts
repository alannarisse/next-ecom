
type MetaDataType = {
  features: string | null
  artist: string | null
}

export type ProductType = {
  name: string
  image: string
  unit_amount: number | null
  quantity?: number | 1
  id: string
  description: string | null
  metadata: MetaDataType
}

