import { Label } from '@/Components/ui/label';
import { SelectDropdownComponent } from '../components/SelectDropdownComponent';
import { useOrder } from '../OrderContext';

export const ExpediteurSection = () => {
  const {
    wilayas, errors, data, setData
  } = useOrder()
  return (
    <div className='space-y-2'>
      <Label>Expéditeur</Label>
      <SelectDropdownComponent
        label={'Wilaya de départ'}
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
    </div>
  );
};