import { Head } from '@inertiajs/react';
import { ClientLayout } from '../Layout/Layout';
import { Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';

export default function WilayaList({ wilayas }) {
    return (
        <ClientLayout path={['Locations', 'Wilayas']}>
            <Head title="Wilayas" />
            <div className="flex flex-col gap-4 p-4 pt-0">
                <h1>Wilayas</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Communes</TableHead>
                            <TableHead>Centers</TableHead>
                            <TableHead>Actions</TableHead> {/* Add an Actions column */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {wilayas.map((wilaya) => (
                            <TableRow key={wilaya.id}>
                                <TableCell>
                                    <Link href={route('locations.centers', wilaya.id)}> {/* Link to details page */}
                                    <small>{wilaya.id} - </small>{wilaya.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{wilaya.communes_count}</TableCell>
                                <TableCell>{wilaya.centers_count}</TableCell>
                                <TableCell>
                                    <Link href={route('locations.centers', { wilaya_id: wilaya.id })}> {/* Link to centers page */}
                                        View Centers
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </ClientLayout>
    );
}