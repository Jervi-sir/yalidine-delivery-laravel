import { useState } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";

interface WalletTransaction {
  id: number;
  type: "deposit" | "withdrawal";
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string; // Add a date property
}

export default function WalletHistory() {
  const [usdtBalance, setUsdtBalance] = useState(2500); // Fake USDT balance
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 1,
      type: "deposit",
      amount: 1000,
      status: "completed",
      date: "2024-07-26",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 500,
      status: "pending",
      date: "2024-07-25",
    },
    // ... more fake transactions
  ]);

  return (
    <ClientLayout path={['Wallet']}>
      <Head title="Wallet" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Wallet</h2>

        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-2">USDT Balance</h3>
          <p className="text-xl font-bold">${usdtBalance}</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-2">Recent Transactions</h3>
          {transactions.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Date</th> {/* Added Date column */}
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td> {/* Display the date */}
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
        </Card>
      </div>
    </ClientLayout>
  );
};

