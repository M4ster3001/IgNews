import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    })
  ],
  callbacks: {
    async session(session) {
      const userActiveSubscription = {
        ref: { '@ref': {} },
        ts: 91239182938129312,
        data: {
          id: 'sub_123123989',
          userId: '1',
          status: 'active',
          price_id: 'price_1928391283912'
        }
      }

      return { ...session, activeSubscription: userActiveSubscription }
    }
  }
})
