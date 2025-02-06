import { Head, usePage } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { OrderTable } from './DataTable';


const orders: Order[] = [
  {
    id: "ORD12345",
    recipient: "John Doe",
    status: "shipped",
    amount: 250,
  },
  {
    id: "ORD12346",
    recipient: "Jane Smith",
    status: "pending",
    amount: 180,
  },
  {
    id: "ORD12347",
    recipient: "Alice Johnson",
    status: "delivered",
    amount: 320,
  },
  {
    id: "ORD12348",
    recipient: "Bob Brown",
    status: "canceled",
    amount: 150,
  },
];

export type Order = {
  id: string;
  recipient: string;
  status: "pending" | "shipped" | "delivered" | "canceled";
  amount: number;
};

export default function OrderList() {
  const { props } = usePage();
  // const orders = props.orders;

  return (
    <ClientLayout path={['Order', 'List']}>
      <Head title="List Orders" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <OrderTable orders={orders}/>
      </div>
    </ClientLayout>
  );
}
