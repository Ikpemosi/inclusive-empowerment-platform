
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import { ref as dbRef, get, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import GalleryUpload from "./GalleryUpload";

interface GalleryItem {
  id: string;
  url: string;
  groupName: string;
  uploadedAt: string;
}

const GalleryManager = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchGallery = async () => {
    try {
      const galleryRef = dbRef(db, "gallery");
      const snapshot = await get(galleryRef);
      const items: GalleryItem[] = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.key as string,
          ...child.val()
        });
      });
      setGallery(items.reverse());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    setLoading(true);
    try {
      // Delete the image from storage
      const imageRef = storageRef(storage, item.url);
      await deleteObject(imageRef);

      // Delete the gallery item from the database
      const galleryRef = dbRef(db, `gallery/${item.id}`);
      await remove(galleryRef);

      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });

      fetchGallery();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <GalleryUpload />
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Existing Gallery Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={item.url}
                    alt={item.groupName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item)}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium">{item.groupName}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
