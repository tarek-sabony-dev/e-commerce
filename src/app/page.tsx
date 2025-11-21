import CurvedLoop from "@/components/curved-loop";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  
  return (
    <div className="flex flex-col gap-16 lg:gap-32 w-full px-4 py-28">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-bold text-center mb-8">Shop Smarter & <br /> Explore Endless Possibilities.</h1>
        <Button variant={"default"} className="h-14 px-8" asChild>
          <Link href={"/shop"}>
            <span className="text-xl">
              Start Shopping
            </span>
          </Link>
        </Button>
      </div>
      <CurvedLoop 
        marqueeText="Shop Smarter & Explore Endless Possibilities. ✦"
        speed={0.5}
        curveAmount={-100}
        interactive={true}
      />
    </div>
  )
}
