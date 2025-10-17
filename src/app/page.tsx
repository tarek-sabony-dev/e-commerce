'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function CategoriesPage() {
  return (
    <>
      <Button onClick={() => signIn('google')} >
        Login
      </Button>
    </>
  )
}
