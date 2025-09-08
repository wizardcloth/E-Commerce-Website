import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

type HeaderProps = {
  user: { email: string }
  cartCount: number
  onLogout: () => void
}

export default function Header({ user, cartCount, onLogout }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="border-b bg-neutral-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/products" className="text-2xl font-bold text-blue-400">
          Shopy
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/products")}>
            Products
          </Button>

          <Button variant="outline" onClick={() => navigate("/cart")}>
            🛒 Cart {cartCount > 0 && <span className="ml-1">({cartCount})</span>}
          </Button>

          <span className="text-muted-foreground">Hi, {user.email}</span>

          <Button variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}
