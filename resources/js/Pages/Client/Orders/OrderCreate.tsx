import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { OrderTable } from './DataTable';
import React from 'react';
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
export default function OrderCreate() {
  const [date, setDate] = React.useState<Date>();

  return (
    <ClientLayout path={['Order', 'Create']}>
      <Head title="Create an Order" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-md space-y-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Create Order</h2>

          {/* Client Name */}
          <div>
            <Label htmlFor="client-name">Client Name</Label>
            <Input id="client-name" placeholder="Enter client name" />
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="product1">Product 1</SelectItem>
                  <SelectItem value="product2">Product 2</SelectItem>
                  <SelectItem value="product3">Product 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input type="number" id="quantity" placeholder="Enter quantity" />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" placeholder="Enter price" />
          </div>

          {/* Order Date */}
          <div>
            <Label>Order Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left">
                  <CalendarIcon className="mr-2" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-4">Submit Order</Button>
        </div>
      </div>
    </ClientLayout>
  );
}
