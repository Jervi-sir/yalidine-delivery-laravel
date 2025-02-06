import { useState } from "react";
import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/register", { // Your registration API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Redirect or update context upon successful registration
        window.location.href = "/login"; // Example redirect
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
      console.error("Registration error:", err);
    }
  };

  return (
        <ClientLayout>
          <Head title="Register" />
          <div className="flex items-center justify-center h-screen">
            <div className="max-w-md w-full p-6 border rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </div>
          </div>
        </ClientLayout>
      );
};
