import * as React from "react";
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import OrderCreate from "../Orders/OrderCreate";
import { ProductEdit } from "./ProductEdit";

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

const fakeProducts: Product[] = [  // Fake product data
  {
    id: 1,
    name: "Product A",
    description: "Description of Product A",
    price: 25.99,
    weight: 1.5,
    category_id: 101,
    image: "/images/product_a.jpg", // Example image path
  },
  {
    id: 2,
    name: "Product B",
    description: "Description of Product B",
    price: 49.99,
    weight: 2.2,
    category_id: 102,
    image: "/images/product_b.png", // Example image path
  },
  {
    id: 3,
    name: "Product C",
    description: "Description of Product C",
    price: 19.99,
    weight: 0.8,
    category_id: 101,
    image: null, // No image for this product
  },
  // ... add more fake products as needed
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(fakeProducts); // Use fake data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  useEffect(() => {
  }, []); // Empty dependency array ensures this runs only once on mount


  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-right">Weight</div>,
      cell: ({ row }) => <div className="text-right">{row.getValue("weight")}</div>,
    },
    {
      accessorKey: "category_id", // Display Category ID or name
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category_id")}</div>, // Or fetch category name
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imagePath = row.getValue("image");
        return imagePath ? (
          <img src={`/storage/${imagePath}`} alt="Product Image" className="h-16 w-16 object-cover" /> // Adjust path as needed
        ) : (
          <div>No Image</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleQuickOrder(product)}>
                Quick Order
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(product)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Quick Order
  |--------------------------------------------------------------------------
  */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const handleQuickOrder = (product: Product) => {
    // 1. Store the selected product in state or context
    setSelectedProduct(product); // Assuming you have a setSelectedProduct state

    // 2. Open the order creation form (e.g., using a modal or redirect)
    setOrderFormOpen(true); // Assuming you have a setOrderFormOpen state

    // OR, if you're redirecting:
    // navigate('/orders/create', { state: { product: product } }); // Using react-router-dom navigate

    // 3. The OrderCreate component (or modal) should then pre-fill the form
    //    using the selected product data (see OrderCreate component example below)
  };


  /*
  |--------------------------------------------------------------------------
  | Edit
  |--------------------------------------------------------------------------
  */
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = (productId: number) => {
    // 1. Filter out the product to delete
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);

    // If you're using an API, you'd also send a DELETE request to your backend here:
    // fetch(`/api/products/${productId}`, { method: 'DELETE' })
    //   .then(...)
    //   .catch(...);
  };
  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsEditing(true); // Open the edit form
  };
  const handleUpdateProduct = (updatedProduct: Product) => {
    // 1. Update the product in the products array
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setIsEditing(false); // Close the edit form
    setProductToEdit(null);

    // If you're using an API, you would also send a PUT or PATCH request to your backend.
  };


  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  // if (loading) {
  //   return <div>Loading products...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <ClientLayout path={['Product', 'List']}>
      <Head title="Create a Product" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
        {orderFormOpen && (
          <OrderCreate
            // product={selectedProduct}
            // onClose={() => setOrderFormOpen(false)}
          />
        )}
        {isEditing && productToEdit && (
        <ProductEdit
          product={productToEdit}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdateProduct}
        />
      )}
      </div>
    </ClientLayout>

  );
};