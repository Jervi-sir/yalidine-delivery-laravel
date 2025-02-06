import { useState } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";

export default function BulkOrderUpload() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCsvFile(file || null);
    setErrorMessage(""); // Clear any previous errors
  };

  const handleUpload = async () => {
    if (!csvFile) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    setUploadStatus("uploading");
    setUploadMessage("Uploading...");

    try {
      const formData = new FormData();
      formData.append("csv_file", csvFile);

      const response = await fetch("/api/orders/bulk-upload", { // Replace with your API endpoint
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
        setUploadMessage("File uploaded successfully!");
        // Optionally, you can reset the file input here
        setCsvFile(null);
      } else {
        const errorData = await response.json(); // Try to get error details from the server
        setUploadStatus("error");
        setUploadMessage(errorData.message || "Upload failed."); // Display error message
      }
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("An error occurred during upload.");
      console.error("Upload error:", error);
    }
  };

  return (
    <ClientLayout path={['Order', 'Bulk Upload']}>
      <Head title="Bulk Order Upload" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Bulk Order Upload</h2>

        <Label htmlFor="csv-file" className="mb-2">CSV File</Label>
        <Input
          type="file"
          id="csv-file"
          accept=".csv" // Only accept CSV files
          onChange={handleFileChange}
          className={cn("border-none shadow-none p-0")}
        />

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <Button onClick={handleUpload} disabled={uploadStatus === "uploading"} className="mt-4">
          {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
        </Button>

        {uploadStatus !== "idle" && (
          <p className={`mt-2 ${uploadStatus === "success" ? "text-green-500" : "text-red-500"}`}>
            {uploadMessage}
          </p>
        )}
      </div>
    </ClientLayout>
  );
};
