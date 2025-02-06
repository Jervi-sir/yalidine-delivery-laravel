import { useState, useEffect } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";

interface User {
    id: number;
    name: string;
    email: string;
    // ... other user properties
}


export default function ShowProfile() {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchUser = async () => {
        //     try {
        //         const response = await fetch('/api/user'); // Your API endpoint
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         const data = await response.json();
        //         setUser(data.user); // Assuming your API returns { user: { ... } }
        //     } catch (err) {
        //         setError(err);
        //         console.error("Error fetching user:", err)
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchUser();
    }, []);

    // if (loading) {
    //     return <div>Loading user data...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

  return (
    <ClientLayout path={['Profile']}>
      <Head title="Profile" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        {user && (
          <Card className="p-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* ... other user details */}
          </Card>
        )}
      </div>
    </ClientLayout>
  );
};

