import NextAuth from "next-auth"
// import Providers from "next-auth/providers"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";
import Stripe from 'stripe'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      // the red underline is just typescript saying are you sure you want this undefined and not a string? which is fine. you can add 'as string' to tell typescript to leave you alone.
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({user}) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      })
      // create a stripe customer
      if(user.email && user.name){
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name
      })
      // also update our prisma user
      await prisma.user.update({
        where: {id: user.id},
        data: {stripeCustomerId: customer.id},
      })
      }
    }
  },
  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)