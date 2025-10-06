import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IconHeart, IconHeartFilled, IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export default function ProductCard() {
  return (
    <>
      <Card className="w-full h-full rounded-2xl">
        <CardHeader>
          <CardAction>
            <Button variant={"ghost"} size={"icon"}>
              <IconHeart className="size-6" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Separator/>
          <Image width={"400"} height={"400"} src={"/red-headphones.png"} alt="gloves" className="w-full hover:scale-105 transition-all" />
          <Separator />
        </CardContent>
        <CardFooter className="flex flex-col justify-center items-start gap-4 ">
          <div className="flex flex-col justify-center items-start gap-1">
            <h1 className="font-semibold">Premium boxing gloves.</h1>
            <p className="">Boxing gloves for the champion inside you.</p>
          </div>
          <div className="flex items-center gap-1">
            <IconStarFilled size={16} />
            <IconStarFilled size={16} />
            <IconStarFilled size={16} />
            <IconStarHalfFilled size={16} />
            <IconStar size={16} />
            <Badge variant={"outline"}>
              3.5
            </Badge>
          </div>
          <div className="w-full flex justify-between">
            <Button >
              <span>Add to Cart</span>
            </Button>
            <Badge variant={"outline"} className="flex gap-2">
              <span>
                <s>$512.55</s>
              </span>
              <Separator orientation="vertical" />
              <span>
                $499.99
              </span>
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
