import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign',
    signOut: '/logout'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        if (profile.email.endsWith("@citchennai.net")) {
          return true; 
        } else {
          console.log(`Unauthorized email: ${profile.email}`);
          return false; 
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = "user"; 
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
