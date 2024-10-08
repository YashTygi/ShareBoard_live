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
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.pathName, pathName));

    return NextResponse.json({ success: true, message: 'Password set successfully' });
  } catch (error) {
    console.error('Error setting password:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while setting the password' }, { status: 500 });
  }
}