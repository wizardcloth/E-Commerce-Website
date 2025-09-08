import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginProps = {
  onLogin: (email: string, password: string) => void;
  onSwitch: () => void;
};

export default function Login({ onLogin, onSwitch }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-xs"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      />
      <div className="relative rounded-xl shadow-2xl/60 backdrop-blur-sm p-10 w-full max-w-md flex flex-col gap-4 mx-auto">
        <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
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
          <Button type="submit" className="w-full space-y-2">
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
  );
}
