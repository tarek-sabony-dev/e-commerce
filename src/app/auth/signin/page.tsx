import { LoginForm } from '@/components/forms/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login in to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
