<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Center;
use App\Models\Wilaya;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function listWilayas(Request $request) 
    {
        $wilayas = Wilaya::withCount(['communes', 'centers'])->get(); // Eager load counts

        return Inertia::render('Client/Locations/WilayaList', [
            'wilayas' => $wilayas,
        ]);
    }
    public function listCommunes(Request $request) 
    {

    }
    public function listCenters(Request $request)
    {
        $request->validate([
            'wilaya_id' => 'nullable|exists:wilayas,id',
            'page' => 'nullable|integer|min:1',
            'search' => 'nullable|string', // Add validation for search term
        ]);
    
        $perPage = 20;

        $query = Center::query();
    
        if ($request->filled('wilaya_id')) {
            $wilaya = Wilaya::findOrFail($request->wilaya_id);
            $query = $wilaya->centers();
        }
    
        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('commune_name', 'like', $searchTerm)
                  ->orWhere('name', 'like', $searchTerm)
                  ->orWhere('address', 'like', $searchTerm)
                  ->orWhere('gps', 'like', $searchTerm)
                  ->orWhere('wilaya_name', 'like', $searchTerm);
            });
        }
    
        $centers = $query->paginate($perPage);
    
        return Inertia::render('Client/Locations/CenterList', [
            'wilaya' => $request->filled('wilaya_id') ? Wilaya::find($request->wilaya_id) : null,
            'centers' => $centers,
            'wilayas' => Wilaya::all(),
            'pagination' => [
                'previous_page' => $centers->previousPageUrl(),
                'current_page' => $centers->currentPage(),
                'next_page' => $centers->nextPageUrl(),
                'last_page' => $centers->lastPage(),
                'per_page' => $centers->perPage(),
                'path' => $centers->path(),
                'total' => $centers->total(),
            ],
        ]);
    }
}
