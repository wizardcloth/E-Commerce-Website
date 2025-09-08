import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <Card className="overflow-hidden">
      <img src={product.image} alt={product.name} className="h-35 w-full object-cover" />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-lg font-semibold text-primary">${product.price}</p>
      </CardContent>
      <CardFooter className="my-4">
        <Button className="hover: hover:shadow-lg hover:bg-emerald-400" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
