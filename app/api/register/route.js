import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';
import bcrypt from 'bcrypt';

import { sendEmail } from '@/utils/emailer';

export async function POST(req) {
  const _req = await req.json();
  await dbConnect();
  try {
    const { name, email, password } = _req;
    //check is email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          err: 'Email already exists',
        },
        { status: 409 }
      );
    } else {
      const savedUser = await new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();
      await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });
      return NextResponse.json({
        success: 'Registration successful. Please log in.',
      });
    }
  } catch (err) {
    console.log(error);
    return NextResponse.json({ error: 'Server error, try again', error }, { status: 500 });
  }
}
