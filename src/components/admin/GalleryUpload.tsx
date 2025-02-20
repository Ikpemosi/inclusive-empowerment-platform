
import { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";

const GalleryUpload = () => {
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryGroup, setGalleryGroup] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      // Clean up old preview URL
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);
    
    try {
      if (galleryImages.length === 0) throw new Error("No images selected");
      if (!galleryGroup) throw new Error("Please specify a group name");

      for (let i = 0; i < galleryImages.length; i++) {
        const image = galleryImages[i];
        const imageRef = storageRef(storage, `gallery/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        const galleryRef = dbRef(db, "gallery");
        await push(galleryRef, {
          url: imageUrl,
          groupName: galleryGroup,
          uploadedAt: new Date().toISOString(),
        });

        // Update progress
        setUploadProgress(((i + 1) / galleryImages.length) * 100);
      }

      toast({
        title: "Success",
        description: "Gallery images added successfully",
      });
      
      // Clean up
      setGalleryImages([]);
      setGalleryPreviews(prev => {
        prev.forEach(url => URL.revokeObjectURL(url));
        return [];
      });
      setGalleryGroup("");
      setUploadProgress(0);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add gallery images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleGallerySubmit} className="space-y-4">
          <Input
            placeholder="Group Name (e.g., News Conference 2024)"
            value={galleryGroup}
            onChange={(e) => setGalleryGroup(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImageSelect}
            required
          />
          
          {galleryPreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadProgress > 0 && (
            <Progress value={uploadProgress} className="w-full" />
          )}

          <Button type="submit" disabled={loading || galleryImages.length === 0}>
            {loading ? "Uploading..." : "Upload Images"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GalleryUpload;
