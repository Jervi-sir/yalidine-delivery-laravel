// Wallet.jsx (USDT Wallet - Reusing from previous example - enhanced)
import { useState, useEffect } from "react";
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

export default function ShowWallet() {
    const [usdtBalance, setUsdtBalance] = useState(0); // Initialize with 0
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const response = await fetch('/api/wallet'); // Your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsdtBalance(data.balance); // Assuming your API returns { balance: ... }
                setTransactions(data.transactions); // Assuming your API returns { transactions: [...] }
            } catch (err) {
                setError(err);
                console.error("Error fetching wallet data:", err)
            } finally {
                setLoading(false);
            }
        };

        fetchWalletData();
    }, []);

    if (loading) {
        return <div>Loading wallet data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
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
