import { Head, usePage } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { OrderTable } from './DataTable';

export type Order = {
  id: number; // Use number for ID
  recipient: string;
  status: "pending" | "shipped" | "delivered" | "canceled";
  amount: number;
};

export default function OrderList({ orders, pagination }) {
  const { props } = usePage();

  const handlePageChange = (page) => {
    //Inertia.get(route('orders.index'), { page: page }); // Use Inertia.get for pagination
  };

  return (
    <ClientLayout path={['Order', 'List']}>
      <Head title="List Orders" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <OrderTable orders={orders} />

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {pagination.prev_page_url && (
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              className="px-4 py-2 mx-1 border rounded"
            >
              Previous
            </button>
          )}


          {/* Display current page and total pages */}
          <span className="px-4 py-2 mx-1 border rounded">
            Page {pagination.current_page} of {pagination.last_page}
          </span>


          {pagination.next_page_url && (
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              className="px-4 py-2 mx-1 border rounded"
            >
              Next
            </button>
          )}

          {/* Optional: Display page numbers */}
          {/* {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 border rounded ${
                                pagination.current_page === page ? 'bg-gray-200' : ''
                            }`}
                        >
                            {page}
                        </button>
                    ))} */}
        </div>
      </div>
    </ClientLayout>
  );
}
