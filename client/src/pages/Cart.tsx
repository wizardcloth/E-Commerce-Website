import CartItem from "@/components/CardItems";

type CartProps = {
  cart: {
    product: { _id: string; name: string; price: number; image: string };
    quantity: number;
  }[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveFromCart: (id: string) => void;
};

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartProps) {
  const subtotal = cart.reduce((s, i) => {
    const price = i.product?.price ?? 0;
    return s + price * i.quantity;
  }, 0);

  if (cart.length === 0)
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center text-muted-foreground">
        <p className="text-xl">🛒 Your cart is empty</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
      {cart.map((item, index) =>
        item.product ? (
          <CartItem
            key={item.product._id || index}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveFromCart}
          />
        ) : null
      )}
      <div className="flex justify-between border-t pt-4">
        <span className="font-semibold">Subtotal</span>
        <span className="font-bold">${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
