import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Providers from "next-auth/providers/github";

export default NextAuth({
  providers: [
    Providers({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }) as Provider,
  ],
});
