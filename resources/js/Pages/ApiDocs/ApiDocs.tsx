import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Button } from "@/Components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { LayoutPage } from "./Layout";


export default function ApiDocs({ endpoint }) {
  const endpoints = [
    {
      title: "GET /get-centers",
      description: "This endpoint retrieves a list of centers with optional filters.",
      parameters: [
        { name: "wilaya_id", type: "integer", optional: true, description: "Filter centers by Wilaya ID" },
        { name: "name", type: "string", optional: true, description: "Filter centers by name (partial match)" },
        { name: "address", type: "string", optional: true, description: "Filter centers by address (partial match)" },
        { name: "commune_id", type: "integer", optional: true, description: "Filter centers by Commune ID" },
        { name: "gps", type: "string", optional: true, description: "Filter centers by GPS (partial match)" },
      ],
      requestUrl: "https://yalidine.huntproducts.online/api/get-centers?wilaya_id=1&name=Main&address=Downtown",
      curlCommand: `curl -X GET "https://yalidine.huntproducts.online/api/get-centers?wilaya_id=1&name=Main&address=Downtown" -H "Accept: application/json"`,
      response: {
        message: "Here are the centers",
        filters: {
          wilaya: {
            id: 1,
            name: "Adrar",
            zone: 4,
            is_deliverable: true,
          },
          name: "Main",
        },
        data: [
          {
            id: 101,
            name: "Main Center",
            address: "123 Main Street",
            gps: "36.12345, 2.12345",
            commune: {
              id: 201,
              name: "Commune Name",
              has_stop_desk: true,
              is_deliverable: true,
              delivery_time_parcel: 2,
              delivery_time_payment: 3,
            },
            wilaya: {
              id: 1,
              name: "Adrar",
              zone: 4,
              is_deliverable: true,
            },
          },
        ],
      },
    },
    // Add other endpoints here
  ];

  return (
    <LayoutPage>
      <ApiCard {...endpoint} />
      {/* {endpoints.map((endpoint, index) => (
        <ApiCard key={index} {...endpoint} />
      ))} */}
    </LayoutPage>
  );
}

const ApiCard = ({ title, description, parameters, requestUrl, curlCommand, response }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{description}</p>
        <h3 className="font-semibold text-lg py-1">Parameters</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-neutral-950 dark:border-neutral-950 text-left rounded-xl overflow-hidden">
            <thead className="bg-neutral-900 dark:bg-neutral-900">
              <tr>
                <th className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">Name</th>
                <th className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">Type</th>
                <th className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">Required</th>
                <th className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr key={index} className="font-mono odd:bg-white even:bg-gray-50 dark:odd:bg-neutral-800 dark:even:bg-neutral-800">
                  <td className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">{param.name}</td>
                  <td className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">{param.type}</td>
                  <td className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">{param.optional ? "No" : "Yes"}</td>
                  <td className="border border-neutral-950 dark:border-neutral-950 px-4 py-2">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <RequestComponent requestUrl={requestUrl} />
        <CurlComponent curlCommand={curlCommand} />
        <h3 className="font-semibold text-lg py-1 mt-4">Response</h3>
        <div className="rounded-md bg-gray-100 dark:bg-neutral-900 p-4 text-sm">
          <pre className="font-sans">
            <code>{JSON.stringify(response, null, 2)}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

const RequestComponent = ({ requestUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <h3 className="font-semibold text-lg py-1 mt-4">Request</h3>
      <div className="relative rounded-md bg-gray-100 dark:bg-gray-950 p-4 text-sm">
        <pre className="font-mono">
          <code>{requestUrl}</code>
        </pre>
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(requestUrl)}
                >
                  {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                  <span className="sr-only">Copy request URL</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy request URL</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

const CurlComponent = ({ curlCommand }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <h3 className="font-semibold text-lg py-1 mt-4">cURL</h3>
      <div className="relative rounded-md bg-gray-100 dark:bg-neutral-900 p-4 text-sm">
        <pre className="font-mono">
          <code className="w-full ">{curlCommand}</code>
        </pre>
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(curlCommand)}
                >
                  {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                  <span className="sr-only">Copy cURL command</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy cURL command</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};


