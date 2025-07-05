// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },  // or 'database' for DB sessions
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (user && user.passwordHash) {
          const isValid = await compare(credentials.password, user.passwordHash)
          if (isValid) return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // on initial sign in, persist user.id
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      // make user.id available on session
      session.user.id = token.id
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'  // we’ll build this next
  }
})
