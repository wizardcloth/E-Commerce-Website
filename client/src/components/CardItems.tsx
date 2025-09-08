import { Button } from "@/components/ui/button"

type CartItemProps = {
  item: {
    product: { _id: string; name: string; price: number; image: string }
    quantity: number
  }
  onUpdateQuantity: (id: string, qty: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <div className="flex items-center gap-4">
        <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded object-cover" />
        <div>
          <h3 className="font-medium">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">${item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>
          -
        </Button>
        <span>{item.quantity}</span>
        <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}>
          +
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onRemove(item.product._id)}>
          Remove
        </Button>
      </div>
    </div>
  )
}
