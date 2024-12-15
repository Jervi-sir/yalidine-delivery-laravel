<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ApiDocsController extends Controller
{
    public function getCenters() {
        $endpoint = [
            'title' => "GET /get-centers",
            'description' => "This endpoint retrieves a list of centers with optional filters.",
            'parameters' => [
                ['name' => "wilaya_id", 'type' => "integer", 'optional' => true, 'description' => "Filter centers by Wilaya ID"],
                ['name' => "name", 'type' => "string", 'optional' => true, 'description' => "Filter centers by name (partial match)"],
                ['name' => "address", 'type' => "string", 'optional' => true, 'description' => "Filter centers by address (partial match)"],
                ['name' => "commune_id", 'type' => "integer", 'optional' => true, 'description' => "Filter centers by Commune ID"],
                ['name' => "gps", 'type' => "string", 'optional' => true, 'description' => "Filter centers by GPS (partial match)"],
            ],
            'requestUrl' => "https://yalidine.huntproducts.online/api/get-centers?wilaya_id=1&name=Main&address=Downtown",
            'curlCommand' => 'curl -X GET "https://yalidine.huntproducts.online/api/get-centers?wilaya_id=1&name=Main&address=Downtown" -H "Accept: application/json"',
            'response' => [
                'message' => "Here are the centers",
                'filters' => [
                    'wilaya' => [
                        'id' => 1,
                        'name' => "Adrar",
                        'zone' => 4,
                        'is_deliverable' => true,
                    ],
                    'name' => "Main",
                ],
                'data' => [
                    [
                        'id' => 101,
                        'name' => "Main Center",
                        'address' => "123 Main Street",
                        'gps' => "36.12345, 2.12345",
                        'commune' => [
                            'id' => 201,
                            'name' => "Commune Name",
                            'has_stop_desk' => true,
                            'is_deliverable' => true,
                            'delivery_time_parcel' => 2,
                            'delivery_time_payment' => 3,
                        ],
                        'wilaya' => [
                            'id' => 1,
                            'name' => "Adrar",
                            'zone' => 4,
                            'is_deliverable' => true,
                        ],
                    ],
                ],
            ],
        ];

        return Inertia::render('ApiDocs/ApiDocs', [
            'endpoint' => $endpoint,
        ]);
    }
    public function getWilayas() {
        $endpoint = [
            'title' => "GET /get-wilayas",
            'description' => "This endpoint retrieves a list of Wilayas with optional filters.",
            'parameters' => [
                ['name' => "zone", 'type' => "integer", 'optional' => true, 'description' => "Filter Wilayas by zone"],
                ['name' => "is_deliverable", 'type' => "boolean", 'optional' => true, 'description' => "Filter Wilayas by delivery capability"],
            ],
            'requestUrl' => "https://yalidine.huntproducts.online/api/get-wilayas?zone=1&is_deliverable=true",
            'curlCommand' => 'curl -X GET "https://yalidine.huntproducts.online/api/get-wilayas?zone=1&is_deliverable=true" -H "Accept: application/json"',
            'response' => [
                'message' => "Here are the wilayas",
                'filters' => [
                    'zone' => 1,
                    'is_deliverable' => true,
                ],
                'data' => [
                    [
                        'id' => 101,
                        'name' => "Wilaya Name",
                        'zone' => 1,
                        'is_deliverable' => true,
                    ],
                    [
                        'id' => 102,
                        'name' => "Another Wilaya",
                        'zone' => 1,
                        'is_deliverable' => false,
                    ],
                ],
            ],
        ];
    
        return Inertia::render('ApiDocs/ApiDocs', [
            'endpoint' => $endpoint,
        ]);
    }
    public function getCommunes() {

        $endpoint = [
            'title' => "GET /get-communes",
            'description' => "This endpoint retrieves a list of communes with optional filters.",
            'parameters' => [
                ['name' => "wilaya_id", 'type' => "integer", 'optional' => true, 'description' => "Filter communes by Wilaya ID"],
                ['name' => "has_stop_desk", 'type' => "boolean", 'optional' => true, 'description' => "Filter communes that have a stop desk"],
                ['name' => "is_deliverable", 'type' => "boolean", 'optional' => true, 'description' => "Filter communes that are deliverable"],
                ['name' => "delivery_time_parcel_min", 'type' => "integer", 'optional' => true, 'description' => "Filter communes with minimum parcel delivery time"],
                ['name' => "delivery_time_parcel_max", 'type' => "integer", 'optional' => true, 'description' => "Filter communes with maximum parcel delivery time"],
                ['name' => "delivery_time_payment_min", 'type' => "integer", 'optional' => true, 'description' => "Filter communes with minimum payment delivery time"],
                ['name' => "delivery_time_payment_max", 'type' => "integer", 'optional' => true, 'description' => "Filter communes with maximum payment delivery time"],
                ['name' => "name", 'type' => "string", 'optional' => true, 'description' => "Filter communes by name (partial match)"],
            ],
            'requestUrl' => "https://yalidine.huntproducts.online/api/get-communes?wilaya_id=1&name=Commune&has_stop_desk=true",
            'curlCommand' => 'curl -X GET "https://yalidine.huntproducts.online/api/get-communes?wilaya_id=1&name=Commune&has_stop_desk=true" -H "Accept: application/json"',
            'response' => [
                'message' => "Here are the communes",
                'filters' => [
                    'wilaya_id' => 1,
                    'name' => "Commune",
                    'has_stop_desk' => true,
                ],
                'data' => [
                    [
                        'id' => 101,
                        'name' => "Commune A",
                        'has_stop_desk' => true,
                        'is_deliverable' => true,
                        'delivery_time_parcel' => 3,
                        'delivery_time_payment' => 2,
                        'wilaya' => [
                            'id' => 1,
                            'name' => "Wilaya A",
                            'zone' => 1,
                            'is_deliverable' => true,
                        ],
                    ],
                    [
                        'id' => 102,
                        'name' => "Commune B",
                        'has_stop_desk' => false,
                        'is_deliverable' => true,
                        'delivery_time_parcel' => 2,
                        'delivery_time_payment' => 1,
                        'wilaya' => [
                            'id' => 1,
                            'name' => "Wilaya A",
                            'zone' => 1,
                            'is_deliverable' => true,
                        ],
                    ],
                ],
            ],
        ];
        
        return Inertia::render('ApiDocs/ApiDocs', [
            'endpoint' => $endpoint,
        ]);
    }
}
