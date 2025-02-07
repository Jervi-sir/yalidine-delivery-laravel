import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/Components/ui/select";
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError'; // Import your InputError component

export default function OrderCreate({ products }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    recipient: '',
    product_id: '',
    quantity: '',
    amount: '',
    order_date: null, 
  });

  const [date, setDate] = useState(null); // Local state for the date picker
  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('orders.store'), {
      onSuccess: () => {
        reset(); // Reset the form
        setDate(null); // Clear the date picker
      },
      onError: (err) => {
        console.log(err)
      }
    });
  };


  return (
    <ClientLayout path={['Order', 'Create']}>
      <Head title="Create an Order" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-md space-y-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Create Order</h2>

          {/* Client Name */}
          <div>
            <Label htmlFor="recipient">Recipient Name</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient name"
              value={data.recipient}
              onChange={(e) => setData('recipient', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.recipient} className="mt-2" />
          </div>

          {/* Location Selection */}
          <div>
            <Label htmlFor="location">Select Location</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="city1">City 1</SelectItem>
                  <SelectItem value="city2">City 2</SelectItem>
                  <SelectItem value="city3">City 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Selection */}
          <div>
            <Label htmlFor="product">Select Product</Label>
            <Select
              value={data.product_id}
              onValueChange={(value) => setData('product_id', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <InputError message={errors.product_id} className="mt-2" />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              value={data.quantity}
              onChange={(e) => setData('quantity', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.quantity} className="mt-2" />
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={data.amount}
              onChange={(e) => setData('amount', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={errors.amount} className="mt-2" />
          </div>

          {/* Order Date */}
          <div>
            <Label>Order Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left">
                  <CalendarIcon className="mr-2" />
                  {data.order_date ? format(data.order_date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={data.order_date}
                  onSelect={(e) => setData('order_date', format(e, 'yyyy-MM-dd'))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <InputError message={errors.order_date} className="mt-2" />
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-4" onClick={handleSubmit} disabled={processing}>
            {processing ? 'Creating...' : 'Submit Order'}
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
}
