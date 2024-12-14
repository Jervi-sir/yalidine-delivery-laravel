<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\Commune;
use App\Models\Wilaya;
use Illuminate\Http\Request;

class GeneralDataController extends Controller
{
    /*
    | get Centers
    |--------------------------------------------------------------------------
    | @params: wilaya_id (integer), name(string), address (string), commune_id (integer), gps (string)
    */
    public function getCenters(Request $request)
    {
        $request->validate([
            'wilaya_id' => ['nullable'],
            'name' => ['nullable'],
            'address' => ['nullable'],
            'commune_id' => ['nullable'],
            'gps' => ['nullable'],
        ]);
        // Start the query
        $query = Center::query();

        // Track applied filters
        $filters = [];

        // Apply optional filters
        if ($request->has('wilaya_id')) {
            $query->where('wilaya_id', $request->wilaya_id);
            $wilaya = Wilaya::find($request->wilaya_id);
            $filters['wilaya'] = $wilaya ? [
                'id' => $wilaya->id,
                'name' => $wilaya->name,
                'zone' => $wilaya->zone,
                'is_deliverable' => $wilaya->is_deliverable,
            ] : null;
        }

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
            $filters['name'] = $request->name;
        }

        if ($request->has('address')) {
            $query->where('address', 'like', '%' . $request->address . '%');
            $filters['address'] = $request->address;
        }

        if ($request->has('commune_id')) {
            $query->where('commune_id', $request->commune_id);
            $filters['commune_id'] = $request->commune_id;
        }

        if ($request->has('gps')) {
            $query->where('gps', 'like', '%' . $request->gps . '%');
            $filters['gps'] = $request->gps;
        }

        // Execute the query and get the results
        $centers = $query->get();

        $data['centers'] = $centers->map(function ($center) {
            $wilaya = Wilaya::find($center->wilaya_id);
            $commune = Commune::find($center->commune_id);

            return [
                'id' => $center->center_id,
                'name' => $center->name,
                'address' => $center->address,
                'gps' => $center->gps,
                'commune' => $commune ? [
                    'id' => $commune->id,
                    'name' => $commune->name,
                    'has_stop_desk' => $commune->has_stop_desk,
                    'is_deliverable' => $commune->is_deliverable,
                    'delivery_time_parcel' => $commune->delivery_time_parcel,
                    'delivery_time_payment' => $commune->delivery_time_payment,
                ] : null,
                'wilaya' => $wilaya ? [
                    'id' => $wilaya->id,
                    'name' => $wilaya->name,
                    'zone' => $wilaya->zone,
                    'is_deliverable' => $wilaya->is_deliverable,
                ] : null,
            ];
        });

        // Return the response
        return response()->json([
            'message' => 'Here are the centers',
            'filters' => $filters,
            'data' => $data['centers']
        ]);
    }

    /*
    | get Wilayas
    |--------------------------------------------------------------------------
    | @params: zone(string), is_deliverable (boolean)
    */
    public function getWilaya(Request $request)
    {
        $request->validate([
            'zone' => ['nullable'],
            'is_deliverable' => ['nullable'],
        ]);
        // Start the query
        $query = Wilaya::query();

        // Track applied filters
        $filters = [];

        // Apply filters
        if ($request->has('zone')) {
            $query->where('zone', $request->zone);
            $filters['zone'] = $request->zone;
        }

        if ($request->has('is_deliverable')) {
            $query->where('is_deliverable', $request->is_deliverable);
            $filters['is_deliverable'] = $request->is_deliverable;
        }

        // Execute the query
        $wilayas = $query->get();

        $data['wilayas'] = $wilayas->map(function ($wilaya) {
            return [
                'id' => $wilaya->id,
                'name' => $wilaya->name,
                'zone' => $wilaya->zone,
                'is_deliverable' => $wilaya->is_deliverable,
            ];
        });

        return response()->json([
            'message' => 'Here are the wilayas',
            'filters' => $filters,
            'data' => $data['wilayas']
        ]);
    }

    /*
    | get Communes
    |--------------------------------------------------------------------------
    | @params: wilaya_id (integer), has_stop_desk(boolean), is_deliverable(boolean),
        delivery_time_parcel_min (string), delivery_time_parcel_max (string), delivery_time_payment_min (string), delivery_time_payment_max (string),
        name (string),
    */
    public function getCommunes(Request $request)
    {
        $request->validate([
            'wilaya_id' => ['nullable'],
            'has_stop_desk' => ['nullable'],
            'is_deliverable' => ['nullable'],
            'delivery_time_parcel_min' => ['nullable'],
            'delivery_time_parcel_max' => ['nullable'],
            'delivery_time_payment_min' => ['nullable'],
            'delivery_time_payment_max' => ['nullable'],
            'name' => ['nullable'],
        ]);
        // Start the query
        $query = Commune::query();

        // Track applied filters
        $filters = [];

        // Apply optional filters
        if ($request->has('wilaya_id')) {
            $query->where('wilaya_id', $request->wilaya_id);
            $filters['wilaya_id'] = $request->wilaya_id;
        }

        if ($request->has('has_stop_desk')) {
            $query->where('has_stop_desk', $request->has_stop_desk);
            $filters['has_stop_desk'] = $request->has_stop_desk;
        }

        if ($request->has('is_deliverable')) {
            $query->where('is_deliverable', $request->is_deliverable);
            $filters['is_deliverable'] = $request->is_deliverable;
        }

        if ($request->has('delivery_time_parcel_min')) {
            $query->where('delivery_time_parcel', '>=', $request->delivery_time_parcel_min);
            $filters['delivery_time_parcel_min'] = $request->delivery_time_parcel_min;
        }

        if ($request->has('delivery_time_parcel_max')) {
            $query->where('delivery_time_parcel', '<=', $request->delivery_time_parcel_max);
            $filters['delivery_time_parcel_max'] = $request->delivery_time_parcel_max;
        }

        if ($request->has('delivery_time_payment_min')) {
            $query->where('delivery_time_payment', '>=', $request->delivery_time_payment_min);
            $filters['delivery_time_payment_min'] = $request->delivery_time_payment_min;
        }

        if ($request->has('delivery_time_payment_max')) {
            $query->where('delivery_time_payment', '<=', $request->delivery_time_payment_max);
            $filters['delivery_time_payment_max'] = $request->delivery_time_payment_max;
        }

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
            $filters['name'] = $request->name;
        }

        // Execute the query and get the results
        $communes = $query->get();

        $data['communes'] = $communes->map(function ($commune) {
            $wilaya = Wilaya::find($commune->wilaya_id);

            return [
                'id' => $commune->id,
                'name' => $commune->name,
                'has_stop_desk' => $commune->has_stop_desk,
                'is_deliverable' => $commune->is_deliverable,
                'delivery_time_parcel' => $commune->delivery_time_parcel,
                'delivery_time_payment' => $commune->delivery_time_payment,
                'wilaya' => $wilaya ? [
                    'id' => $wilaya->id,
                    'name' => $wilaya->name,
                    'zone' => $wilaya->zone,
                    'is_deliverable' => $wilaya->is_deliverable,
                ] : null,
            ];
        });

        // Return the response
        return response()->json([
            'message' => 'Here are the communes',
            'filters' => $filters,
            'data' => $data['communes']
        ]);
    }

}
