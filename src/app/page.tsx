'use client'

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function CategoriesPage() {
  const sesstion = useSession()

  return (
    <>
      <Button onClick={() => signIn('google')} >
        Login
      </Button>
      <span>{sesstion.data?.user.email}</span>
    </>
  )
}
