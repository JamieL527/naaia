import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "./db"
import { compare } from "bcrypt"

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        })
        if (!existingUser) {
          return null
        }

        // Check if the user's isActive flag is true
        if (!existingUser.isActive) {
          throw new Error("Your account is not active. Please sign up to complete your subscription.");
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        )

        if (!passwordMatch) {
          throw new Error("The email address or password is incorrect.");
        }

        return {
          id: `${existingUser.id}`,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          email: existingUser.email,
          isActive: existingUser.isActive,
          paymentAmount:existingUser.paymentAmount,
          paymentDate:existingUser.paymentDate,
          membershipExpiresAt:existingUser.membershipExpiresAt,
          priceId:existingUser.priceId
        }
      }
    })
  ],
        
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.id= user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.isActive=user.isActive;
        token.paymentDate=user.paymentDate.toISOString().split('T')[0] ;
        token.paymentAmount=user.paymentAmount;
        token.membershipExpiresAt = user.membershipExpiresAt.toISOString().split('T')[0] 
        token.priceId = user.priceId

        
        console.log(token)
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname
      session.user.isActive = token.isActive
      session.user.paymentDate=token.paymentDate
      session.user.paymentAmount=token.paymentAmount
      session.user.membershipExpiresAt= token.membershipExpiresAt
      session.user.priceId= token.priceId

      console.log(session)

      return session
    },
  }

}
