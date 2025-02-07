import { Head, useForm } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/Components/ui/select";
import ProductImageUpload from './ProductImageUpload';
import InputError from '@/Components/InputError';

export default function ProductCreate({ categories }) {
  const { data, setData, post, processing, errors, reset, } = useForm({
    name: '', description: '', price: '', weight: '',
    category_id: '', images: [],
  });
  const [imageErrors, setImageErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    post(route('products.store'), {
      onSuccess: () => {
        reset(); // Reset the form data after successful submission
      },
      onError: (errors: any) => {
        if (errors.images) {
          setImageErrors(errors.images);
          delete errors.images; // Remove from general errors
        } else {
          setImageErrors([]); // Clear image errors if none from backend
        }
      },
      onFinish: () => {
        setData('images', []);
      }
    });
  };

  const handleImageChange = (newImages) => {
    setData('images', newImages);
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
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full"
              type="text"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          {/* Product Description */}
          <div>
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Enter product description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="mt-1 block w-full resize-none"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>

          {/* Product Price */}
          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input
              type="number"
              id="product-price"
              placeholder="Enter price"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.price} className="mt-2" />
          </div>

          {/* Product Weight */}
          <div>
            <Label htmlFor="product-weight">Weight</Label>
            <Input
              type="number"
              id="product-weight"
              placeholder="Enter weight"
              value={data.weight}
              onChange={(e) => setData('weight', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.weight} className="mt-2" />
          </div>

          {/* Product Category */}
          <div>
            <Label htmlFor="product-category">Category</Label>
            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputError message={errors.category_id} className="mt-2" />
          </div>

          {/* Product Image */}
          <ProductImageUpload onChange={handleImageChange} images={data.images} />
          <InputError message={imageErrors?.length > 0 ? imageErrors[0] : null} className="mt-2" /> {/* Display image errors */}

          {/* Submit Button */}
          <Button className="w-full mt-4" onClick={handleSubmit} disabled={processing}> {processing ? 'Creating...' : 'Create Product'}</Button>
        </div>
      </div>
    </ClientLayout>
  );
}