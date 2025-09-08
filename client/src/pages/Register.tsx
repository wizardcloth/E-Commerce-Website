import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type RegisterProps = {
  onRegister: (email: string, password: string, confirm: string) => void
  onSwitch: () => void
}

export default function Register({ onRegister, onSwitch }: RegisterProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister(email, password, confirm)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" onClick={onSwitch}>
            Sign In
          </Button>
        </p>
      </div>
    </div>
  )
}
