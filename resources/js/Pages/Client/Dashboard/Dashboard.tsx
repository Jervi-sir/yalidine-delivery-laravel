import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

export default function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([
    {
      id: "ORD12349",
      recipient: "Omar Ali",
      status: "pending",
      amount: 300,
    },
    {
      id: "ORD12350",
      recipient: "Leila Karim",
      status: "shipped",
      amount: 450,
    },
    // ... more fake orders
  ]);

  const [walletBalance, setWalletBalance] = useState(1500); // Fake balance
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 1000,
      status: "completed",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 500,
      status: "pending",
    },
    // ... more fake transactions
  ]);

  return (
    <ClientLayout path={['Dashboard']}>
      <Head title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Recent Orders</h3>
              {recentOrders.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Recipient</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.recipient}</td>
                        <td>{order.status}</td>
                        <td>{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent orders.</p>
              )}
              <Button className="mt-2">View All Orders</Button> {/* Link to Order List page */}
            </Card>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" >
            <Card className="p-4">
              <h3 className="font-medium mb-2">Wallet Balance</h3>
              <p className="text-xl font-bold">${walletBalance}</p>
              <Button className="mt-2">View Wallet</Button> {/* Link to Wallet page */}
            </Card>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" >
            <Card className="p-4">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button>Create Order</Button> {/* Link to Create Order page */}
                <Button>Add Product</Button> {/* Link to Add Product page */}
                {/* Add more quick actions as needed */}
              </div>
            </Card>
          </div>
        </div>
        <div className="rounded-xl bg-muted/50 md:min-h-min">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Recent Transactions</h3>
            {recentTransactions.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No recent transactions.</p>
            )}
            <Button className="mt-2">View All Transactions</Button> {/* Link to Transactions page */}
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
