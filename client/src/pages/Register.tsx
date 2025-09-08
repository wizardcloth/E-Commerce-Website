import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterProps = {
  onRegister: (email: string, password: string, confirm: string) => void;
  onSwitch: () => void;
};

export default function Register({ onRegister, onSwitch }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(email, password, confirm);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-xs"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      />
      <div className="relative rounded-xl shadow-2xl/60 backdrop-blur-sm p-10 w-full max-w-md flex flex-col gap-4 mx-auto">
        <h2 className="mb-4 text-center text-2xl font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-400 border-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-gray-400 border-2"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="border-gray-400 border-2"
          />
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
  );
}
