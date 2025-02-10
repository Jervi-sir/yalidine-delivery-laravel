import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Separator } from '@/Components/ui/separator';

export const InputComponent = ({ 
  error, value, handleOnChange,
  label, placeholder, 
  type = 'text',
  disabled = false
}) => {
  return (
    <div className='flex items-center gap-2 border border-input rounded-md'>
      <Label className='pl-2 whitespace-nowrap'>{ label }</Label>
      <Separator orientation="vertical" className='h-5 w-0.5' />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        type={type}
        className="block w-full border-none"
        min={type === 'number' ? 0 : undefined}
        disabled={disabled}
      />
      <InputError message={error} className="mt-2" />
    </div>
  );
};