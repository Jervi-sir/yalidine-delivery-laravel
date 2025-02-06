import { useState, useEffect } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { OrderTable } from "./DataTable"; // Re-use the OrderTable component
import { Order } from './DataTable'; // Import the Order type
import { usePage } from '@inertiajs/react'; // Import usePage
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";

export default function OrderHistory({ allOrders }) {
  const { props } = usePage();
  // const allOrders: Order[] = props.orders;
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(allOrders);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "shipped" | "delivered" | "canceled">("all");
  const [filterRecipient, setFilterRecipient] = useState("");

  useEffect(() => {
    // Apply filters whenever filter criteria change
    let filtered = allOrders;

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (filterRecipient) {
      filtered = filtered.filter((order) =>
        order.recipient.toLowerCase().includes(filterRecipient.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [filterStatus, filterRecipient, allOrders]);

  return (
    <ClientLayout path={['Order', 'History']}>
      <Head title="Order History" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>

        <div className="mb-4 flex gap-2">
          <Select value={filterStatus}>   {/* onValueChange={setFilterStatus} */}
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>


          <Input
            type="text"
            placeholder="Filter by Recipient"
            value={filterRecipient}
            onChange={(e) => setFilterRecipient(e.target.value)}
          />
        </div>

        <OrderTable orders={filteredOrders} /> {/* Pass the filtered orders to the table */}
      </div>
    </ClientLayout>
  );
};

