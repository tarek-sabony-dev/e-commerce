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

const formSchema = z.object({
  email: z.email().nonempty({ message: "Enter email..." }),
  password: z.string().nonempty({ message: "Enter password..." })
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/'
    })

    if (result?.error) {
      form.setError('email', { message: 'Invalid email or password' })
      form.setError('password', { message: 'Invalid email or password' })
      return
    }

    if (result?.ok) {
      window.location.href = result.url ?? '/'
    }
  }

  return (
    <>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="password"
                  autoComplete="off"
                  />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
            />
          <Field orientation="horizontal">
            <Button className="w-full" type="submit" form="login-form">
              Login
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <IconBrandGoogleFilled />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </>
  )
}
