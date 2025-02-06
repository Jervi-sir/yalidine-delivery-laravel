import { useState } from "react";
import { Input } from "@/Components/ui/input"; // Import Input and Textarea components
import { Textarea } from "@/Components/ui/textarea";

// Define the Product type (adjust properties as needed)
export type Product = {
  id: number; // Or string if your IDs are strings
  name: string;
  description: string;
  price: number;
  weight: number;
  category_id: number; // Or string
  image: string | null; // Store the image path
};

interface ProductEditProps {
  product: Product;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

export const ProductEdit: React.FC<ProductEditProps> = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [weight, setWeight] = useState(product.weight);
  // ... other fields (category, image, etc.)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      ...product, // Keep the original product's ID
      name,
      description,
      price: Number(price), // Parse price as a number
      weight: Number(weight), // Parse weight as a number
      // ... other updated fields
    };

    onUpdate(updatedProduct); // Call the onUpdate function to update the product list
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-950 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 resize-none" // Prevent resizing
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
            className="mb-2"
          />
          <Input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e: any) => setWeight(e.target.value)}
            className="mb-2"
          />
          {/* ... other input fields */}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Product
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
