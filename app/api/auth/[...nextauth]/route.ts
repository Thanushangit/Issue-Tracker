import AuthOptions from "@/app/auth/AuthOptions"
import NextAuth from "next-auth"



export const authOptions = AuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }