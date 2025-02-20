import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref as dbRef, get, query, orderByChild } from "firebase/database";

interface GalleryImage {
  id: string;
  url: string;
  groupName: string;
}

interface GalleryGroup {
  name: string;
  images: GalleryImage[];
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const galleryRef = dbRef(db, "gallery");
        const snapshot = await get(query(galleryRef, orderByChild("uploadedAt")));
        const groups: { [key: string]: GalleryImage[] } = {};
        
        snapshot.forEach((child) => {
          const data = child.val();
          const image: GalleryImage = {
            id: child.key!,
            url: data.url,
            groupName: data.groupName
          };
          
          if (!groups[data.groupName]) {
            groups[data.groupName] = [];
          }
          groups[data.groupName].push(image);
        });

        const formattedGroups: GalleryGroup[] = Object.entries(groups).map(([name, images]) => ({
          name,
          images: images.reverse(),
        }));

        setGalleryGroups(formattedGroups);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load gallery images",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
                Gallery
              </h1>
              <p className="text-xl text-gray-600">
                Moments and memories from our events and initiatives
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : selectedGroup ? (
              <>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="mb-8 text-primary hover:underline flex items-center gap-2"
                >
                  ← Back to Gallery
                </button>
                <h2 className="text-2xl font-bold mb-8">{selectedGroup}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {galleryGroups
                    .find((group) => group.name === selectedGroup)
                    ?.images.map((image, index) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                      >
                        <img
                          src={image.url}
                          alt={`Gallery image ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-full items-center justify-center">
                            <button 
                              onClick={() => setSelectedImage(image.url)}
                              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900"
                            >
                              View Image
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryGroups.map((group) => (
                  <div
                    key={group.name}
                    className="group cursor-pointer"
                    onClick={() => setSelectedGroup(group.name)}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                      {group.images[0] && (
                        <img
                          src={group.images[0].url}
                          alt={group.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                          <p className="text-white/80">{group.images.length} images</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
