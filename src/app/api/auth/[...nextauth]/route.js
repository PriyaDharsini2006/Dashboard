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
    error: '/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Additional checks based on Google profile if needed
        if (profile.email.endsWith("@citchennai.net")) {
          return 'true';  // Allow only users from CIT Chennai
        } else {
          console.log(`Invalid Email ${profile.email}`);
          return "/acess-denied"; // Redirect to error page if unauthorized
        }
      }
      return true; // Default to allow sign-in
    },
    async session({ session, token }) {
      // Customize session data by adding properties
      session.user.id = token.sub; // Add user ID to session object
      session.user.role = "user";  // Set default role (adjust as needed)
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
