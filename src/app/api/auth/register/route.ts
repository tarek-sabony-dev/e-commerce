import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users, verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailRaw: string | undefined = body?.email;
    const password: string | undefined = body?.password;
    const name: string | undefined = body?.name;

    if (!emailRaw || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const email = emailRaw.toLowerCase();

    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [created] = await db
      .insert(users)
      .values({ email, name, passwordHash })
      .returning();

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await db
      .insert(verificationTokens)
      .values({ identifier: email, token, expires });

    await sendVerificationEmail({ to: email, token });

    return NextResponse.json({ ok: true, userId: created.id });
  } catch (error) {
    console.error('Register error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


