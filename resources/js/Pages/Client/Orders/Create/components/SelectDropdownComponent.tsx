import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Separator } from '@/Components/ui/separator';
import React from 'react';

export const SelectDropdownComponent = ({ label, placeholder, values, initialValue = undefined, error, handleOnValueChange, disabled = false }) => {
  return (
    <div className='flex items-center gap-2 border border-input rounded-md'>
      <Label className='pl-2'>{ label }</Label>
      <Separator orientation="vertical" className='h-5 w-0.5' />
      <Select 
        value={initialValue} 
        onValueChange={handleOnValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full border-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map(value => (
              <SelectItem key={value.id} value={value.id}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <InputError message={error} className="mt-2" />
    </div>
  );
};