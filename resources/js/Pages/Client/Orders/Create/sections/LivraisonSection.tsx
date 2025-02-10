import { Label } from '@/Components/ui/label';
import { SelectDropdownComponent } from '../components/SelectDropdownComponent';
import { useOrder } from '../OrderContext';
import { InputComponent } from '../components/InputComponent';

export const LivraisonSection = () => {
  const {
    wilayas, errors, data, setData, handleWilayaChange,
    centers, communes
  } = useOrder();
  
  return (
    <div className='space-y-2'>
      <Label>Livraison</Label>
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
        disabled={data.is_stopdesk === null}
      />
      {data.is_stopdesk ? (
        <>
          <SelectDropdownComponent
            label={'Select Commune'}
            placeholder={'Choose commune'}
            values={communes}
            handleOnValueChange={(value) => setData('to_commune_id', value)}
            error={errors.to_commune_name}
            disabled={data.to_wilaya_name === ''}
          />
          <SelectDropdownComponent
            label={'Select Center'}
            placeholder={'Choose center'}
            values={centers}
            handleOnValueChange={(value) => setData('to_center_center_id', value)}
            error={errors.to_center_id}
            disabled={data.to_commune_name === ''}
          />
        </>
      ) : (
        <>
          <SelectDropdownComponent
            label={'Select Commune'}
            placeholder={'Choose commune'}
            values={communes}
            handleOnValueChange={(value) => setData('to_commune_id', value)}
            error={errors.to_commune_name}
            disabled={data.to_wilaya_name === ''}
          />
          <InputComponent
            label={'Address'}
            placeholder={'Enter address'}
            value={data.address}
            handleOnChange={(e) => setData('address', e.target.value)}
            error={errors.address}
            disabled={data.to_wilaya_name === ''}
          />
        </>
      )}
    </div>
  );
};