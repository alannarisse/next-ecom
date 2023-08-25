import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  name: string,
  id: string,
  images?: string[],
  description?: string,
  unit_amount: number,
  quantity: number
}
type CartState = {
  isOpen: boolean
  cart: CartItem[]
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
    }),
    {name: 'cart-store'}
  )
)