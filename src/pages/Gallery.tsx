
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/lovable-uploads/427e3443-6056-4857-99be-416ad7873886.png",
    "/lovable-uploads/980ca769-1bf1-4428-9d1d-f7e0ea97af20.png",
    "/lovable-uploads/16dc969c-fe9f-4857-b477-bd98122cc02e.png",
    "/lovable-uploads/8f5b5604-c752-4165-bbbb-f35d4eb6ffbe.png",
    "/lovable-uploads/e9ca4e75-00ff-45ce-93c0-88eb937d727c.png",
    "/lovable-uploads/a551832d-f79a-4016-9a38-c82d8bc6229d.png"
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-full items-center justify-center">
                      <button 
                        onClick={() => setSelectedImage(image)}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900"
                      >
                        View Image
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
