import { useState } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";

export default function WithdrawRequest() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalStatus, setWithdrawalStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [withdrawalMessage, setWithdrawalMessage] = useState("");
  const [otherDetails, setOtherDetails] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !paymentMethod || !walletAddress) {
      setWithdrawalStatus("failed");
      setWithdrawalMessage("Please fill in all fields.");
      return;
    }

    setWithdrawalStatus("pending");
    setWithdrawalMessage("Processing your withdrawal request...");

    try {
      // In a real application, you would send a request to your backend API here
      // to process the withdrawal request.
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call delay

      setWithdrawalStatus("success");
      setWithdrawalMessage("Withdrawal request submitted successfully!");
      setAmount("");
      setPaymentMethod("");
      setWalletAddress("");
      setOtherDetails("");
    } catch (error) {
      setWithdrawalStatus("failed");
      setWithdrawalMessage("An error occurred during withdrawal.");
      console.error("Withdrawal error:", error);
    }
  };

  return (
    <ClientLayout path={['Wallet', 'Withdraw']}>
      <Head title="Withdraw Request" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Withdraw Request</h2>

        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <Label htmlFor="amount">Amount (USDT)</Label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <Label htmlFor="payment_method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="usdt_trc20">USDT (TRC20)</SelectItem>
                  <SelectItem value="usdt_erc20">USDT (ERC20)</SelectItem>
                  {/* Add more payment methods */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="wallet_address">Wallet Address</Label>
            <Input
              type="text"
              id="wallet_address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter wallet address"
              required
            />
          </div>

          <div>
            <Label htmlFor="other_details">Other Details (Optional)</Label>
            <Textarea
              id="other_details"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Any additional information"
              className="resize-none"
            />
          </div>

          <Button type="submit" disabled={withdrawalStatus === "pending"} className="w-full">
            {withdrawalStatus === "pending" ? "Processing..." : "Submit Request"}
          </Button>

          {withdrawalStatus !== "idle" && (
            <p className={`mt-2 ${withdrawalStatus === "success" ? "text-green-500" : "text-red-500"}`}>
              {withdrawalMessage}
            </p>
          )}
        </form>
      </div>
    </ClientLayout>
  );
};
