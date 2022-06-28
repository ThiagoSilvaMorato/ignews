import { query as q } from "faunadb";

import NextAuth, { Account, Profile, User } from "next-auth";
import { Provider } from "next-auth/providers";
import Providers from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Providers({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
          redirect_uri: process.env.NEXTAUTH_URL,
        },
      },
    }) as Provider,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
