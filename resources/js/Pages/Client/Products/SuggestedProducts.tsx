import { useState } from "react";
import { Product } from "./ProductList"; // Import your Product type
import { ClientLayout } from "../Layout/Layout"; // Import your layout
import { Head } from "@inertiajs/react"; // Import Head
import { Card } from "@/Components/ui/card"; // Assuming you have a Card component

export default function SuggestedProducts() {
  const [frequentProducts, setFrequentProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Product A",
      description: "Frequently shipped product A",
      price: 25.99,
      weight: 1.5,
      category_id: 101,
      image: "/images/product_a.jpg", // Example image path
    },
    {
      id: 2,
      name: "Product B",
      description: "Another frequently shipped product",
      price: 49.99,
      weight: 2.2,
      category_id: 102,
      image: "/images/product_b.png", // Example image path
    },
    // ... more fake frequent products
  ]);

  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([
    {
      id: 3,
      name: "Recommended Product C",
      description: "Product you might like",
      price: 19.99,
      weight: 0.8,
      category_id: 101,
      image: null, // No image for this product
    },
    {
      id: 4,
      name: "Recommended Product D",
      description: "Based on your past orders",
      price: 35.50,
      weight: 1.2,
      category_id: 103,
      image: "/images/product_d.jpg", // Example image path
    },
    // ... more fake recommended products
  ]);


  return (
    <ClientLayout path={['Products', 'Suggested']}>
      <Head title="Suggested Products" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Frequently Shipped Items</h2>
        {frequentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {frequentProducts.map((product) => (
              <Card key={product.id} className="p-4">
                <img
                  src={product.image ? `/storage/${product.image}` : "/images/placeholder.jpg"} // Placeholder
                  alt={product.name}
                  className="h-32 w-full object-cover mb-2 rounded-md"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No frequently shipped items yet.</p>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4">Recommended for You</h2>
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="p-4">
                <img
                  src={product.image ? `/storage/${product.image}` : "/images/placeholder.jpg"} // Placeholder
                  alt={product.name}
                  className="h-32 w-full object-cover mb-2 rounded-md"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No recommendations yet.</p>
        )}
      </div>
    </ClientLayout>
  );
};