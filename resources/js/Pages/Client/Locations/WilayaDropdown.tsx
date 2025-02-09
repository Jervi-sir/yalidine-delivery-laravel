import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import React from 'react';

export const WilayaDropdown = ({ wilayas, selectedWilaya, handleWilayaSelect }) => {
  return (
    <>
      <Select onValueChange={(e) => handleWilayaSelect(e)} defaultValue={selectedWilaya}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Wilaya" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>All</SelectItem>
          {wilayas.map((w) => (
            <SelectItem key={w.id} value={w.id}>{w.id} - {w.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

    </>
  );
};