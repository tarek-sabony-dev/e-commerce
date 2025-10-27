import CartGrid from "@/components/cart/cart-grid";
import CheckoutForm from "@/components/forms/checkout-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <CartGrid />
        </CardContent>
      </Card>
      <Card className="w-full shrink-[1.5] ">
        <CardHeader>
          <CardTitle className="text-3xl">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <CheckoutForm />
        </CardContent>
      </Card>
    </div>
  )
}
