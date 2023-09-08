import {PrismaClient} from '@prisma/client'
import {getServerSession} from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import formatPrice from '@/util/PriceFormat'
import Image from 'next/image'

export const revalidate = 0

const fetchOrders = async () => {
  const prisma = new PrismaClient()
  const user = await getServerSession(authOptions)
  if(!user){
    return null
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id, status: 'complete'
    },
    include: {products: true},
  })
  return orders
}

export default async function Dashboard(){
  const orders = await fetchOrders()
  if(orders === null)
  return <div>you need to be logged in to see your orders</div>
  if(!orders)
  return <div>No Orders Placed</div>
  return(
    <div>
      <h1>Your Order History</h1>
      <div className="font-md">
        {orders.map((order) => (
          <div key={order.id} className="mb-6">
            <h2>Order id: {order.id}</h2>
            <p>Order Placed Date: {new Date(order.createdDate).toString()}</p>
            <p>Status: <span className={`${order.status === 'complete' ? 'bg-primary' : 'bg-secondary'} py-1 mx-2 px-2 text-sm`}>{order.status}</span></p>
            <p>Total: {formatPrice(order.amount)}</p>
            <div className='flex gap-8'>
              {order.products.map((product) => (
                <div className="py-2 bg-base-200" key={product.id}>
                  <h2>{product.name}</h2>
                  <div>
                    <Image src={product.image!} width={36} height={36} alt={product.name}/>
                    <p>Price: {formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}