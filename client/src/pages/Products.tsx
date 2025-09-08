

import { useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

type Props = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Sports"]

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 10000 },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300+", min: 300, max: 10000 },
]

export default function Products({ products, onAddToCart }: Props) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0])
  const [filtered, setFiltered] = useState<Product[]>(products)

  useEffect(() => {
    let filtered = products

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category)
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    )

    setFiltered(filtered)
  }, [search, category, priceRange, products])

  const handleAddToCart = (product: Product) => {
    onAddToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full max-w-md  border-zinc-800 placeholder:text-zinc-400"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="space-y-8 bg-white border-2 p-6 rounded-md lg:sticky lg:top-4 lg:col-span-1 lg:h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar ">
            <div>
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <RadioGroup value={category} onValueChange={setCategory} className="space-y-3">
                {CATEGORIES.map((c) => (
                  <div key={c} className="flex items-center space-x-2">
                    <RadioGroupItem value={c} id={c} />
                    <Label htmlFor={c} className="text-black pl-1.5 ">{c}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Price Range</h2>
              <RadioGroup
                value={priceRange.label}
                onValueChange={(label) =>
                  setPriceRange(PRICE_RANGES.find((r) => r.label === label)!)
                }
                className="space-y-3 "
              >
                {PRICE_RANGES.map((range) => (
                  <div key={range.label} className="flex items-center space-x-2">
                    <RadioGroupItem value={range.label} id={range.label} />
                    <Label htmlFor={range.label} className="text-black pl-1.5 ">{range.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="lg:col-span-3  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6  ">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p className="col-span-full text-1xl mt-10 text-center text-zinc-500">No products found.👀</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
