import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea"; // Import Textarea
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils" // Assuming you have this utility for classnames

export default function ProductCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // For image upload

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to API)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('category_id', category); // Assuming category_id is what your backend expects
    if (image) {
        formData.append('image', image);
    }
    // ... (Send formData to your Laravel API endpoint)
    console.log(formData);
  };

  return (
    <ClientLayout path={['Product', 'Create']}>
      <Head title="Create a Product" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-md space-y-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Create Product</h2>

          {/* Product Name */}
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Product Description */}
          <div>
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none" // Prevent textarea resizing
            />
          </div>

          {/* Product Price */}
          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input
              type="number"
              id="product-price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Product Weight */}
          <div>
            <Label htmlFor="product-weight">Weight</Label>
            <Input
              type="number"
              id="product-weight"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Product Category */}
          <div>
            <Label htmlFor="product-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  {/* ... more categories */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Image */}
          <div>
            <Label htmlFor="product-image">Image</Label>
            <Input
              type="file"
              id="product-image"
              onChange={(e) => setImage(e.target.files[0])} // Store the selected file
              className={cn("border-none shadow-none p-0")} // remove default styling
            />
            {image && ( // Display a preview of the selected image
              <img src={URL.createObjectURL(image)} alt="Product Preview" className="mt-2 max-w-full h-auto" />
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-4" onClick={handleSubmit}>Create Product</Button>
        </div>
      </div>
    </ClientLayout>
  );
}