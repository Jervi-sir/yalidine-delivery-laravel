import { Head } from '@inertiajs/react';
import { ClientLayout } from '../../Layout/Layout';
import { Button } from "@/Components/ui/button";
import { Separator } from '@/Components/ui/separator';
import { OrderProvider, useOrder } from './OrderContext';
import { ExpediteurSection } from './sections/ExpediteurSection';
import { DestinataireSection } from './sections/DestinataireSection';
import { LivraisonSection } from './sections/LivraisonSection';
import { ColiSection } from './sections/ColiSection';
import { WeightSection } from './sections/WeightSection';

export default function OrderCreate({ products }) {
  return (
    <OrderProvider products={products}>
      <OrderCreateContent />
    </OrderProvider>
  );
}

const OrderCreateContent = () => {
  const {
    handleSubmit, processing
  } = useOrder();

  return (
    <ClientLayout path={['Order', 'Create']}>
      <Head title="Create an Order" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className='max-w-md p-4 border rounded-lg shadow-md '>
          <h2 className="text-xl font-bold mb-4">Create Order</h2>
          {/*--- Expéditeur ---*/}
          <ExpediteurSection />
          <Separator className='my-4' />
          {/*--- Destinataire ---*/}
          <DestinataireSection />
          <Separator className='my-4' />
          {/*--- Livraison ---*/}
          <LivraisonSection />
          <Separator className='my-4' />
          {/*--- Coli ---*/}
          <ColiSection />
          <Separator className='my-4' />
          {/*--- Dimension & poids ---*/}
          <WeightSection />
          <Separator className='my-4' />


          {/* Order Date */}
          {/* <DateInputComponent
            label={'Order Date'}
            value={data.order_date}
            error={errors.order_date}
            handleOnSelect={(e) => setData('order_date', e)}
          /> */}
          {/* Submit Button */}
          <Button className="w-full" onClick={handleSubmit} disabled={processing}>
            {processing ? 'Creating...' : 'Submit Order'}
          </Button>
        </div>
      </div>
    </ClientLayout >
  );
}