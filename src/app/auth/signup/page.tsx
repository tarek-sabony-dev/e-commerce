import { SignupForm } from '@/components/forms/signup-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
