import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth";

export default async function AccountPage() {
  const session = await getServerSession()

  return (
    <>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold text-center mb-8">Account Page</h1>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-lg grayscale">
                <AvatarImage src={session?.user.image || ""} alt={'user profile picture'} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-2xl leading-tight">
                <span className="truncate font-medium">{session?.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {session?.user.email}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input value={session?.user.name || "Giest user"} readOnly />
              <Input value={session?.user.email || "Giest email"} readOnly />
              <Button variant={"secondary"}>
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}