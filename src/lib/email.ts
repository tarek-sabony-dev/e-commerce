type SendVerificationArgs = { to: string; token: string };

const fromAddress = process.env.SMTP_FROM || process.env.EMAIL_FROM || 'no-reply@example.com';

export async function sendVerificationEmail({ to, token }: SendVerificationArgs) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const verifyUrl = `${baseUrl}/auth/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;

  // Prefer SMTP via nodemailer if configured
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (hasSmtp) {
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: 'Verify your email',
      text: `Verify your email by visiting: ${verifyUrl}`,
      html: `<p>Verify your email by clicking the link below:</p><p><a href="${verifyUrl}">Verify Email</a></p>`,
    });
    return;
  }

  // Dev fallback: log URL to console
  console.log('[DEV] Verification URL:', verifyUrl);
}


