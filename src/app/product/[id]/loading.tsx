import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IconArrowBack } from "@tabler/icons-react";
import Link from "next/link";

export default async function ProductDetailsLoading() {
  
  return (
    <div className="container mx-auto px-4 py-8 ">
      <Card className="w-full h-full rounded-2xl flex flex-col">
        <CardHeader>
          <CardAction>
            <Button variant={"ghost"} size={"icon"} asChild>
              <Link href={"/shop"}>
                <IconArrowBack className="size-6" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="w-full lg:min-w-[400px] aspect-square" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-[50px] aspect-square" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle>
                <Skeleton className="h-10 w-[200px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardDescription>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex items-center gap-1">
              <Skeleton className="w-28 h-5" />
                <Skeleton className="w-8 h-5" />
            </div>
            <div className="w-full flex justify-between">
              <Badge variant={"outline"} className="flex p-4 gap-4">
                <Skeleton className="w-24 h-8" />
                <Separator orientation="vertical" />
                <Skeleton className="w-24 h-8" />
              </Badge>
            </div>
          </CardFooter>
        </div>
        <div className="flex justify-end px-6 pb-6">
          <Badge variant={"outline"} className="flex p-4 gap-4">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
          </Badge>
        </div>
      </Card>
    </div>
  );
}


