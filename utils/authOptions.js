import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from './dbAuthConnect';

import bcrypt from 'bcrypt';

import User from '@/models/user';
import dbConnect from './dbConnect';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // EmailProvider({
    //   server: `smtp://${process.env.EMAIL_SERVER_USER}:${process.env.EMAIL_SERVER_PASSWORD}@${process.env.EMAIL_SERVER_HOST}`,
    //   from: process.env.EMAIL_FROM,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password.');
        }
        if (!user.password) {
          throw new Error('Please login via the method you used to signup.');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/login',
  // },
};
