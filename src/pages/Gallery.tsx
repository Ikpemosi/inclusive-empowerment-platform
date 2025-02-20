import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { ref as dbRef, get, query, orderByChild } from "firebase/database"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  groupName: string
}

interface GalleryGroup {
  name: string
  images: GalleryImage[]
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const galleryRef = dbRef(db, "gallery")
        const snapshot = await get(query(galleryRef, orderByChild("uploadedAt")))
        const groups: { [key: string]: GalleryImage[] } = {}

        snapshot.forEach((child) => {
          const data = child.val()
          const image: GalleryImage = {
            id: child.key!,
            url: data.url,
            groupName: data.groupName,
          }

          if (!groups[data.groupName]) {
            groups[data.groupName] = []
          }
          groups[data.groupName].push(image)
        })

        const formattedGroups: GalleryGroup[] = Object.entries(groups).map(([name, images]) => ({
          name,
          images: images.reverse(),
        }))

        setGalleryGroups(formattedGroups)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load gallery images",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryData()
  }, [toast])

  const handlePrevImage = () => {
    if (!selectedImage || !selectedGroup) return
    const currentGroup = galleryGroups.find((group) => group.name === selectedGroup)
    if (!currentGroup) return
    const currentIndex = currentGroup.images.findIndex((img) => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + currentGroup.images.length) % currentGroup.images.length
    setSelectedImage(currentGroup.images[prevIndex])
  }

  const handleNextImage = () => {
    if (!selectedImage || !selectedGroup) return
    const currentGroup = galleryGroups.find((group) => group.name === selectedGroup)
    if (!currentGroup) return
    const currentIndex = currentGroup.images.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % currentGroup.images.length
    setSelectedImage(currentGroup.images[nextIndex])
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src="/gallery-background.jpg"
              alt="Gallery Background"
              className="w-full h-full object-cover opacity-10"
            />
          </motion.div>
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Gallery
              </h1>
              <p className="text-xl text-gray-600">Moments and memories from our events and initiatives</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">
                <motion.div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </motion.div>
              </div>
            ) : selectedGroup ? (
              <>
                <motion.button
                  onClick={() => setSelectedGroup(null)}
                  className="mb-8 text-primary hover:underline flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft />
                  Back to Gallery
                </motion.button>
                <motion.h2
                  className="text-3xl font-bold mb-8 text-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {selectedGroup}
                </motion.h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {galleryGroups
                    .find((group) => group.name === selectedGroup)
                    ?.images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                        }}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary hover:text-white transition-colors duration-300"
                          >
                            View Image
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {galleryGroups.map((group) => (
                  <motion.div
                    key={group.name}
                    className="group cursor-pointer"
                    onClick={() => setSelectedGroup(group.name)}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                    }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                      {group.images[0] && (
                        <img
                          src={group.images[0].url || "/placeholder.svg"}
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
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative">
              <img src={selectedImage.url || "/placeholder.svg"} alt="Full size" className="w-full h-auto" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <button
                  onClick={handlePrevImage}
                  className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Gallery

