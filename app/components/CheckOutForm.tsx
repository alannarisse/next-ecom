'use client'

import {useState,useEffect} from 'react'
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'


export default function CheckOutForm({
  clientSecret,
}: {
  clientSecret: string
}){
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  return(
    <form id='payment-form'>
      <PaymentElement id="payment-element" options={{layout:'tabs'}} />
      <h1>Total</h1>
      <button id="submit" disabled={isLoading || !stripe || !elements}></button>
    </form>
  )
}