'use client'

import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import {useCartStore} from '@/store' 
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import CheckOutForm from './CheckOutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
// gotta prefix with next stuff if its a client component

export default function Checkout(){
  const cartStore = useCartStore()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    //create a payment intent as soon as page loads
    fetch('/api/create-payment-intent', {
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      items: cartStore.cart,
      payment_intent_id: cartStore.paymentIntent, 
    }),
   }).then((res) => {
    if(res.status === 403){
      return router.push('/api/auth/signin')
    }
  return res.json()
   }).then((data)=> {
    //console.log(data)
    setClientSecret(data.paymentIntent.client_secret)
    cartStore.setPaymentIntent(data.paymentIntent.id)
   })
  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  //stripe docs payment elements for more
  return (
    <div>
      {!clientSecret && (
        <div>
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm clientSecret={clientSecret}/>
          </Elements>
        </div>
      )}
    </div>
  )
}