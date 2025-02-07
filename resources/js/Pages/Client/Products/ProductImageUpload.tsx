import { useState, useRef, useEffect } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { X } from "lucide-react"
import { Label } from "@/Components/ui/label"

interface ProductImage {
  id: string
  url: string
  file?: File; // Add file property for new images
}

export default function ProductImageUpload({ onChange, images: initialImages }) { // Add onChange prop
  const [images, setImages] = useState<ProductImage[]>(initialImages || []); // Initialize with prop
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange(images); // Notify parent component of image changes
  }, [images, onChange]); // Add onChange to dependency array

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file: file, // Store the File object
      }))
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 7))
    }
  }

  const removeImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between">
        <Label htmlFor="product-image">Image</Label>
        <p className="text-sm text-gray-500">{images.length}/7 images uploaded</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url || "/placeholder.svg"}
              alt="Product image"
              width={150}
              height={150}
              className="rounded-lg object-cover w-full h-32"
            />
            <button
              onClick={() => removeImage(image.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mb-0">
        <Input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        <Button onClick={handleUploadClick} disabled={images.length >= 7} className="w-full" variant="outline">
          {images.length >= 7 ? "Max images reached" : "Upload Images"}
        </Button>
      </div>
    </div>)
}
