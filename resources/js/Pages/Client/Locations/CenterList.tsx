import { Head, router, usePage } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { Inertia } from '@inertiajs/inertia';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/Components/ui/dropdown-menu";
import { ChevronDown, LoaderIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import React, { useState, useEffect } from 'react';
import { WilayaDropdown } from './WilayaDropdown';

export default function CenterList({ wilaya, wilayas, centers, pagination }) {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);

  // Initialize state with URL parameters or defaults
  const [searchTerm, setSearchTerm] = useState(params.get('search') || '');
  const [selectedWilaya, setSelectedWilaya] = useState(params.get('wilaya_id') || '');
  const [columnsVisibility, setColumnsVisibility] = useState({
    name: true,
    address: true,
    commune_name: true,
  });

  const [isSearching, setIsSearching] = useState(false);
  const [isWilayaSearching, setIsWilayaSearching] = useState(false);

  const updateSearch = (search, wilayaId = selectedWilaya, page = 1) => {
    // Create an object with only the non-empty parameters
    const params = {
      ...(search ? { search } : {}),
      ...(wilayaId ? { wilaya_id: wilayaId } : {}),
      ...(page !== 1 ? { page } : {})
    };
    router.get(
      route('locations.centers'),
      params,
      {
        preserveState: true,
        preserveScroll: true,
        only: ['centers', 'pagination', 'wilaya'],
        onFinish: () => {
          setIsSearching(false);
          setIsWilayaSearching(false);
        }
      }
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsSearching(true);
      updateSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    updateSearch(searchTerm, selectedWilaya, page);
  };

  const handleWilayaSelect = (id) => {
    setIsWilayaSearching(true);
    setSelectedWilaya(id);
    updateSearch(searchTerm, id);
  };

  // Rest of your component remains the same...
  return (
    <ClientLayout path={['Locations', 'Centers']}>
      <Head title="Centers" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <h1>Centers {wilaya ? `in ${wilaya.name}` : ''}</h1>

        {/* Search and Filter */}
        <div className="flex items-center justify-between py-4 gap-3">
          <div className='flex items-center gap-3'>
            <Input
              placeholder="Search commune name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isSearching && <LoaderIcon className='animate-spin' />}
          </div>
          <div className='flex gap-3'>
            <div className='flex items-center gap-3'>
              {isWilayaSearching && <LoaderIcon className='animate-spin' />}
              <WilayaDropdown wilayas={wilayas} selectedWilaya={parseInt(selectedWilaya)} handleWilayaSelect={handleWilayaSelect} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.keys(columnsVisibility).map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column}
                    className="capitalize"
                    checked={columnsVisibility[column]}
                    onCheckedChange={(value) =>
                      setColumnsVisibility({ ...columnsVisibility, [column]: value })
                    }
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(columnsVisibility).map((column) => (
                columnsVisibility[column] && <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {centers?.data.map((center) => (
              <TableRow key={center.center_id}>
                {Object.keys(columnsVisibility).map((column) => (
                  columnsVisibility[column] && (
                    <TableCell key={column}>
                      {center[column]}
                    </TableCell>
                  )
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            {pagination.previous_page && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(pagination.current_page - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={pagination.current_page === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pagination.next_page && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(pagination.current_page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </ClientLayout>
  );
}