import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pathName, password } = body;

  if (!pathName || !password) {
    return NextResponse.json({ success: false, message: 'PathName and password are required' }, { status: 400 });
  }

  try {
    const user = await db.select().from(users).where(eq(users.pathName, pathName)).limit(1);
    
    if (user.length === 0 || !user[0].password) {
      return NextResponse.json({ success: false, message: 'User not found or password not set' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (isPasswordCorrect) {
      return NextResponse.json({ success: true, message: 'Password verified successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while verifying the password' }, { status: 500 });
  }
}