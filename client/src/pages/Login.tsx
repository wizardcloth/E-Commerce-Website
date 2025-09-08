import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type LoginProps = {
  onLogin: (email: string, password: string) => void
  onSwitch: () => void
}

export default function Login({ onLogin, onSwitch }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Button variant="link" onClick={onSwitch}>
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  )
}
