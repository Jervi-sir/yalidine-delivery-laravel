<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeliveryApiHelpers
{
  public static function create_parcel($parcels)
  {
    $url = 'YOUR_API_ENDPOINT_HERE'; // Replace with the actual API endpoint
    $api_id = 'YOUR_API_ID_HERE'; // Replace with your API ID
    $api_token = 'YOUR_API_TOKEN_HERE'; // Replace with your API token
    try {
      $response = Http::withHeaders([
        'X-API-ID' => $api_id,
        'X-API-TOKEN' => $api_token,
        'Content-Type' => 'application/json',
      ])->post($url, $parcels);

      // You might want to log the request and response for debugging
      Log::info('API Request Data:', [
        'url' => $url,
        'headers' => [
          'X-API-ID' => $api_id,
          'X-API-TOKEN' => $api_token,
          'Content-Type' => 'application/json',
        ],
        'body' => $parcels,
      ]);

      Log::info('API Response Data:', [
        'status' => $response->status(),
        'body' => $response->body(),
      ]);

      // Check for successful response (status code 2xx)
      if ($response->successful()) {
        return response()->json($response->json(), $response->status());
      } else {
        // Handle the error appropriately.  Return the error response
        // from the API, or a generic error message.
        return response()->json(
          [
            'error' => 'API request failed',
            'details' => $response->json(), // Or $response->body()
          ],
          $response->status()
        );
      }
    } catch (\Exception $e) {
      // Handle exceptions (e.g., network errors, timeouts)
      Log::error('API Request Exception:', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
      ]);

      return response()->json(
        ['error' => 'API request failed', 'details' => $e->getMessage()],
        500
      ); // Or another appropriate error code
    }
  }
}
