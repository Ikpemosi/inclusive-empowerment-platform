import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { auth, storage, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, get, query, orderByChild } from "firebase/database";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // News form state
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSource, setNewsSource] = useState("");
  const [newsLink, setNewsLink] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);

  // Gallery form state
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryGroup, setGalleryGroup] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Volunteers state
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 5;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        fetchVolunteers();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const volunteersRef = dbRef(db, "volunteers");
      const snapshot = await get(query(volunteersRef, orderByChild("submittedAt")));
      const volunteerData: any[] = [];
      
      snapshot.forEach((child) => {
        volunteerData.push({
          id: child.key,
          ...child.val()
        });
      });
      
      setVolunteers(volunteerData.reverse());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch volunteers",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      fetchVolunteers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (newsImage) {
        const imageRef = storageRef(storage, `news/${newsImage.name}`);
        await uploadBytes(imageRef, newsImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newsRef = dbRef(db, "news");
      await push(newsRef, {
        title: newsTitle,
        source: newsSource,
        link: newsLink,
        image: imageUrl,
        date: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "News item added successfully",
      });
      
      setNewsTitle("");
      setNewsSource("");
      setNewsLink("");
      setNewsImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add news item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  // Filter volunteers based on search query
  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredVolunteers.length / volunteersPerPage);
  const paginatedVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * volunteersPerPage,
    currentPage * volunteersPerPage
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Button onClick={handleLogout} variant="destructive" disabled={loading}>
              {loading ? "Logging out..." : "Logout"}
            </Button>

            <Tabs defaultValue="news" className="mt-8">
              <TabsList className="mb-8">
                <TabsTrigger value="news">Add News</TabsTrigger>
                <TabsTrigger value="gallery">Add Gallery Image</TabsTrigger>
                <TabsTrigger value="volunteers">View Volunteers</TabsTrigger>
              </TabsList>

              <TabsContent value="news">
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleNewsSubmit} className="space-y-4">
                      <Input
                        placeholder="News Title"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                      />
                      <Input
                        placeholder="Source"
                        value={newsSource}
                        onChange={(e) => setNewsSource(e.target.value)}
                      />
                      <Input
                        placeholder="Link"
                        value={newsLink}
                        onChange={(e) => setNewsLink(e.target.value)}
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewsImage(e.target.files?.[0] || null)}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add News Item"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
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
              </TabsContent>

              <TabsContent value="volunteers">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search volunteers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {paginatedVolunteers.map((volunteer) => (
                        <div
                          key={volunteer.id}
                          className="p-4 border rounded-lg space-y-2"
                        >
                          <h3 className="font-semibold">{volunteer.name}</h3>
                          <p className="text-sm text-gray-600">{volunteer.email}</p>
                          <p className="text-sm text-gray-600">{volunteer.phone}</p>
                          <div className="text-sm">
                            <strong>Skills:</strong>
                            <p className="mt-1 text-gray-600">{volunteer.skills}</p>
                          </div>
                          <div className="text-sm">
                            <strong>Availability:</strong>
                            <p className="mt-1 text-gray-600">{volunteer.availability}</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            Submitted: {new Date(volunteer.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      {filteredVolunteers.length === 0 && (
                        <p className="text-center text-gray-500">No volunteers found</p>
                      )}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center gap-2 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="flex items-center px-4">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
