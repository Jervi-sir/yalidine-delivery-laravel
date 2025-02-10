import { Label } from '@/Components/ui/label';
import { SelectDropdownComponent } from '../components/SelectDropdownComponent';
import { useOrder } from '../OrderContext';
import { InputComponent } from '../components/InputComponent';
import { CheckboxComponent } from '../components/CheckboxComponent';

export const ColiSection = () => {
  const {
    wilayas, errors, data, setData,
    products
  } = useOrder()
  return (
    <div className='space-y-2'>
      <Label>Le colis</Label>
      <SelectDropdownComponent
        label={'Select Product'}
        placeholder={'Choose product'}
        values={products}
        initialValue={data.product_id}
        handleOnValueChange={(value) => setData('product_id', value)}
        error={errors.product_id}
      />
      {/* Price */}
      <InputComponent
        label={'Prix'}
        placeholder={'Prix'}
        value={data.price}
        handleOnChange={(e) => setData('price', e.target.value)}
        type="number"
        error={errors.price}
      />
      {/* Free Delivery */}
      <CheckboxComponent
        label={'Livraison gratuite?'}
        onChange={(checked) => setData('freeshipping', checked)}
        checked={data.freeshipping}
        error={errors.freeshipping}
      />
    </div>
  );
};