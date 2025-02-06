import { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // ... other profile fields
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user'); // Your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUser(data.user); // Assuming your API returns { user: { ... } }
                setName(data.user.name);
                setEmail(data.user.email);
            } catch (err) {
                setError(err);
                console.error("Error fetching user:", err)
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... validation

    try {
      const response = await fetch("/api/user", { // Your update profile API endpoint
        method: "PUT", // Or PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // ... other profile fields
      });

      if (response.ok) {
        // Update user data or redirect
        console.log("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        console.error("Profile update error:", errorData);
        // Handle error (e.g., display an error message)
      }
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ClientLayout path={['Profile', 'Edit']}>
      <Head title="Edit Profile" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
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
          {/* ... other profile fields */}
          <Button type="submit" className="w-full">Update Profile</Button>
        </form>
      </div>
    </ClientLayout>
  );
};






