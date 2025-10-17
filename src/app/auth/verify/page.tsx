import Link from 'next/link';
import { db } from '@/db/db';
import { users, verificationTokens } from '@/db/schema';
import { and, eq, gt } from 'drizzle-orm';

type Props = {
  searchParams: { token?: string; email?: string };
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const token = searchParams.token ?? '';
  const email = (searchParams.email ?? '').toLowerCase();

  let status: 'success' | 'error' = 'error';
  let message = 'Invalid or expired verification link.';

  if (token && email) {
    const now = new Date();

    const [row] = await db
      .select()
      .from(verificationTokens)
      .where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token), gt(verificationTokens.expires, now)));

    if (row) {
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, email));
      await db.delete(verificationTokens).where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token)));
      status = 'success';
      message = 'Your email has been verified. You can now sign in.';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">{status === 'success' ? 'Email Verified' : 'Verification Failed'}</h1>
        <p className="text-muted-foreground">{message}</p>
        <div className="pt-2">
          <Link href="/auth/signin" className="text-blue-600 hover:underline">Go to Sign In</Link>
        </div>
      </div>
    </div>
  );
}


