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
    signOut: '/logout',
    error: '/error', // Redirect to a custom error page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Allow only users with emails ending in "@citchennai.net"
        if (profile.email.endsWith("@citchennai.net")) {
          return true; // Allow sign-in
        } else {
          console.log(`Unauthorized email: ${profile.email}`);
          return false; // Redirect to access-denied page if unauthorized
        }
      }
      return true; // Default to allow sign-in for other providers if added
    },
    async session({ session, token }) {
      session.user.id = token.sub;  // Attach user ID to session
      session.user.role = "user";   // Set a default role, customize if needed
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
    maxAge: 30 * 24 * 60 * 60, // Session expiration: 30 days
  },
};

const handler = NextAuth(authOptions);

// Allow both GET and POST requests to support all NextAuth actions
export { handler as GET, handler as POST };
