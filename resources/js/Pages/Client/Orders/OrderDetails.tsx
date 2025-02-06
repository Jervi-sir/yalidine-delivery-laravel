import { useState, useEffect } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Order } from './DataTable'; // Import the Order type
import { usePage } from '@inertiajs/react'; // Import usePage
import { Input } from "@/Components/ui/input";

export default function OrderDetails({ order }) {
    const { props } = usePage();
    // const order: Order = props.order;

    const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || ""); // Initialize with order's tracking number or empty
    const [isEditingTracking, setIsEditingTracking] = useState(false);


  const handleUpdateTracking = async () => {

    try {
      const response = await fetch(`/api/orders/${order.id}`, { // Replace with your API endpoint
        method: "PUT", // Or PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tracking_number: trackingNumber }),
      });

      if (response.ok) {

        order.tracking_number = trackingNumber; // Update order tracking number
        setIsEditingTracking(false);

      } else {
        const errorData = await response.json();
        console.error("Error updating tracking number:", errorData);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error updating tracking number:", error);
    }
  };

  const handleCancelOrder = async () => {
      if (window.confirm("Are you sure you want to cancel this order?")) {
          try {
              const response = await fetch(`/api/orders/${order.id}`, {
                  method: 'DELETE',
              });

              if (response.ok) {
                  // Handle successful cancellation (e.g., redirect, update order status)
                  console.log("Order cancelled successfully");
              } else {
                  const errorData = await response.json();
                  console.error("Error cancelling order:", errorData);
              }
          } catch (error) {
              console.error("Error cancelling order:", error);
          }
      }
  };

  return (
    <ClientLayout path={['Order', 'Details', order.id]}> {/* Dynamic path */}
      <Head title={`Order Details - ${order.id}`} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order Details - {order.id}</h2>

        <div className="mb-4">
          <p><strong>Recipient:</strong> {order.recipient}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Amount:</strong> {order.amount}</p>
          {/* ... other order details */}
        </div>

        <div className="mb-4">
          <label htmlFor="tracking_number"><strong>Tracking Number:</strong></label>
          {isEditingTracking ? (
            <div>
                <Input
                  type="text"
                  id="tracking_number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="mt-2"
                />
                <Button onClick={handleUpdateTracking} className="mt-2">Update</Button>
                <Button onClick={() => setIsEditingTracking(false)} variant="ghost" className="mt-2">Cancel</Button>
            </div>
          ) : (
            <div>
                <p>{order.tracking_number || "Not assigned yet"}</p>
                <Button onClick={() => setIsEditingTracking(true)} className="mt-2">Edit Tracking</Button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { /* Handle Print Label */ console.log("Print label for order:", order.id); }}>
            Print Label
          </Button>
          <Button onClick={handleCancelOrder} className="bg-red-500 hover:bg-red-700 text-white">
            Cancel Order
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
};

