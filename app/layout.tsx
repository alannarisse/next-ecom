import './globals.css'
import Nav from './components/Nav'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({weight: ['900','700'], subsets:['latin']})
const lato = Lato({
  subsets:['latin'], 
  display:'swap',
  weight: ['400','700'],
})

export const metadata = {
  title: 'VergePDX Shop',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html className={`${lato.className} ${playfair.className}`}>
      <body className='mx-1 md:mx-16'>
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}
      </Hydrate>
      </body>
      </html>
  )
}
