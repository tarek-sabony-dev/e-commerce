import { GetProductById } from "@/app/actions/product-actions"
import { AddToCartButton, AddToWishlistButton } from "@/components/product/product-action-buttons"
import ProductImages from "@/components/product/product-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCents } from "@/lib/utils"
import { IconArrowBack, IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react"
import Link from "next/link"

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage ({ params } : ProductDetailsPageProps) {
  const { id } = await params
  const [product] = await GetProductById(Number(id))

  
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
            <ProductImages imageUrls={product.imageUrls} />
          </CardContent>
          <CardFooter className="w-full flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle>
                <h1 className="font-semibold text-4xl">{product.name}</h1>
              </CardTitle>
              <CardDescription>
                <p className="text-base">{product.description}</p>
              </CardDescription>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => {
                const rating = Number(product.rating);
                if (index < Math.floor(rating)) {
                  return <IconStarFilled key={index} size={20} />;
                } else if (index === Math.floor(rating) && rating % 1 !== 0) {
                  return <IconStarHalfFilled key={index} size={20} />;
                } else {
                  return <IconStar key={index} size={20} />;
                }
              })}
              <Badge variant={"outline"}>
                <p className="text-base">
                  {Number(product.rating)}
                </p>
              </Badge>
            </div>
            <div className="w-full flex justify-between">
              <Badge variant={"outline"} className="flex p-4 gap-4">
                <span className="text-4xl">
                {product.discountedPrice &&
                  <s>
                    {formatCents(product.price)}
                  </s>
                }
                {!product.discountedPrice &&
                  formatCents(product.price)
                }
              </span>
              {product.discountedPrice &&
                <>  
                  <Separator orientation="vertical" />
                  <span className="text-4xl">
                    {formatCents(product.discountedPrice)}
                  </span>
                </>
              }
              </Badge>
            </div>
          </CardFooter>
        </div>
        <div className="flex justify-end px-6 pb-6">
          <Badge variant={"outline"} className="flex p-4 gap-4">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </Badge>
        </div>
      </Card>
    </div>
  )
}
