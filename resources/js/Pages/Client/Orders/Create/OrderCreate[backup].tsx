import { Head } from '@inertiajs/react';
import { ClientLayout } from '../../Layout/Layout';
import { useState, useEffect } from 'react';
import { Button } from "@/Components/ui/button";
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { SelectDropdownComponent } from './components/SelectDropdownComponent';
import { InputComponent } from './components/InputComponent';
import { DateInputComponent } from './components/DateInputComponent';
import { Separator } from '@/Components/ui/separator';

export default function OrderCreate({ products }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    // Recipient Details
    recipient: '',
    firstName: '',
    familyName: '',
    contactPhone: '',
    // Address
    from_wilaya_id: '',
    from_wilaya_name: '',
    to_wilaya_name: '',
    to_commune_name: '',
    to_center_id: '',
    address: '',
    // Order
    order_date: null,
    is_stopdesk: false,
    do_insurance: false,
    declared_value: 0,
    freeshipping: false,
    has_exchange: false,
    // Product
    product_id: '',
    quantity: '',
    amount: '',
    price: null,
    product_to_collect: null,
    more_then_5kg: false,
  });

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [centers, setCenters] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    // Fetch wilayas from your API
    axios.get('/api/get-wilayas').then(response => {
      setWilayas(response.data.data);
      const savedFromWilaya = localStorage.getItem('from_wilaya_id');
      if (savedFromWilaya) {
        setData('from_wilaya_id', parseInt(savedFromWilaya) as any);
      }
    });
  }, []);

  const handleWilayaChange = (wilayaId) => {
    setData('to_wilaya_name', wilayas.find(w => w.id === wilayaId).name);
    setData('to_commune_name', '');
    setData('to_center_id', '');

    // Fetch communes for the selected wilaya
    axios.get('/api/get-communes', {
      params: { wilaya_id: wilayaId }
    }).then(response => {
      setCommunes(response.data.data);
    });

    // Fetch centers for the selected wilaya
    axios.get('/api/get-centers', {
      params: { wilaya_id: wilayaId }
    }).then(response => {
      setCenters(response.data.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('orders.store'), {
      onSuccess: () => {
        reset();
        setDate(null);
      },
      onError: (err) => {
        console.log(err);
      }
    });
  };

  return (
    <ClientLayout path={['Order', 'Create']}>
      <Head title="Create an Order" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className='p-4 border rounded-lg shadow-md '>
          <h2 className="text-xl font-bold mb-4">Create Order</h2>
          <div className="lg:grid grid-cols-2 ">
            <div className='space-y-4'>
              {/* From Wilaya */}
              <SelectDropdownComponent
                label={'From Wilaya'}
                placeholder={'Enter from wilaya name'}
                values={wilayas}
                initialValue={data.from_wilaya_id} // Set initial value from localStorage
                error={errors.from_wilaya_name}
                handleOnValueChange={(wilayaId) => {
                  setData('to_wilaya_name', wilayas.find(w => w.id === wilayaId).name);
                  setData('from_wilaya_id', wilayaId);
                  localStorage.setItem('from_wilaya_id', wilayaId);
                }}
              />
              {/* Delivery Type */}
              <SelectDropdownComponent
                label={'Delivery Type'}
                placeholder={'Choose delivery type'}
                values={[{ id: false, name: 'Commune' }, { id: true, name: 'Stopdesk' }]}
                handleOnValueChange={(value) => setData('is_stopdesk', value === true)}
                error={errors.is_stopdesk}
              />
              {/* To Wilaya */}
              <SelectDropdownComponent
                label={'To Wilaya'}
                placeholder={'Choose wilaya'}
                values={wilayas}
                handleOnValueChange={(e) => handleWilayaChange(e)}
                error={errors.to_wilaya_name}
              />
              {/* <RadioGroupComponent
                initialValue={data.is_stopdesk ? "stopdesk" : "commune"}
                handleOnValueChange={(value) => setData('is_stopdesk', value === "stopdesk")}
                values={[{ id: 'stopdesk', name: 'Stopdesk'}, { id: 'a_domicile', name: 'A domicile'}]}
              /> */}
              {data.is_stopdesk ? (
                <>
                  <SelectDropdownComponent
                    label={'Select Commune'}
                    placeholder={'Choose commune'}
                    values={communes}
                    handleOnValueChange={(value) => setData('to_commune_name', value)}
                    error={errors.to_commune_name}
                  />
                  <SelectDropdownComponent
                    label={'Select Center'}
                    placeholder={'Choose center'}
                    values={centers}
                    handleOnValueChange={(value) => setData('to_center_id', value)}
                    error={errors.to_center_id}
                  />
                </>
              ) : (
                <>
                  <SelectDropdownComponent
                    label={'Select Commune'}
                    placeholder={'Choose commune'}
                    values={communes}
                    handleOnValueChange={(value) => setData('to_commune_name', value)}
                    error={errors.to_commune_name}
                  />
                  <InputComponent
                    label={'Address'}
                    placeholder={'Enter address'}
                    value={data.address}
                    handleOnChange={(e) => setData('address', e.target.value)}
                    error={errors.address}
                  />
                </>
              )}
            </div>
            <div className='flex flex-col lg:flex-row'>
              <Separator className="h-0.5 w-full my-4 lg:my-0 lg:h-full lg:w-0.5 lg:mx-4" />
              <div className='flex-1 space-y-4'>
                {/* Recipient Name */}
                <InputComponent
                  label={'Recipient Name'}
                  placeholder={'Enter recipient name'}
                  value={data.recipient}
                  handleOnChange={(e) => setData('recipient', e.target.value)}
                  error={errors.recipient}
                />
                {/* Product Selection */}
                <SelectDropdownComponent
                  label={'Select Product'}
                  placeholder={'Choose product'}
                  values={products}
                  initialValue={data.product_id}
                  handleOnValueChange={(value) => setData('product_id', value)}
                  error={errors.product_id}
                />
                {data.product_id
                  && <>
                  </>
                }
                {/* Quantity */}
                <InputComponent
                  label={'Quantity'}
                  placeholder={'Enter quantity'}
                  value={data.quantity}
                  handleOnChange={(e) => setData('quantity', e.target.value)}
                  type="number"
                  error={errors.quantity}
                />
                {/* Amount */}
                <InputComponent
                  label={'Amount'}
                  placeholder={'Enter amount'}
                  value={data.amount}
                  handleOnChange={(e) => setData('amount', e.target.value)}
                  type="number"
                  error={errors.amount}
                />
                {/* Order Date */}
                <DateInputComponent
                  label={'Order Date'}
                  value={data.order_date}
                  error={errors.order_date}
                  handleOnSelect={(e) => setData('order_date', e)}
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <Button className="w-full mt-10" onClick={handleSubmit} disabled={processing}>
            {processing ? 'Creating...' : 'Submit Order'}
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
}