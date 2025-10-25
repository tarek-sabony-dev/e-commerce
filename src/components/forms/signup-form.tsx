'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().nonempty({ message: "Enter name..." }),
  email: z.email().nonempty({ message: "Enter email..." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().nonempty({ message: "Enter password..." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Email already in use') {
          form.setError('email', { message: 'Email already in use' });
        } else {
          form.setError('root', { message: result.error || 'Failed to create account' });
        }
        return;
      }

      // Success - automatically sign in the user
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/'
      });

      if (signInResult?.error) {
        form.setError('root', { message: 'Account created but login failed. Please try signing in manually.' });
        return;
      }

      if (signInResult?.ok) {
        // Redirect to home page
        setTimeout(() => {
          window.location.href = signInResult.url || '/';
        }, 1000);
      }
    } catch (error) {
      form.setError('root', { message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="username"                
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@gmail.com"                
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id="confirm-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal">
            <Button 
              className="w-full" 
              type="submit" 
              form="signup-form"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <IconBrandGoogleFilled />
            Sign up with Google
          </Button>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  )
}
