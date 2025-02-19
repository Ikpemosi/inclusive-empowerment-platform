
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { auth, storage, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
  const [galleryImage, setGalleryImage] = useState<File | null>(null);
  const [galleryGroup, setGalleryGroup] = useState("");

  // Volunteers state
  const [volunteers, setVolunteers] = useState<any[]>([]);

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
      const querySnapshot = await getDocs(collection(db, "volunteers"));
      const volunteerData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVolunteers(volunteerData);
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

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (newsImage) {
        const imageRef = ref(storage, `news/${newsImage.name}`);
        await uploadBytes(imageRef, newsImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "news"), {
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

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!galleryImage) throw new Error("No image selected");
      if (!galleryGroup) throw new Error("Please specify a group name");

      const imageRef = ref(storage, `gallery/${galleryImage.name}`);
      await uploadBytes(imageRef, galleryImage);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "gallery"), {
        url: imageUrl,
        groupName: galleryGroup,
        uploadedAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Gallery image added successfully",
      });
      
      setGalleryImage(null);
      setGalleryGroup("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add gallery image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            
            <Tabs defaultValue="news">
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
                        onChange={(e) => setGalleryImage(e.target.files?.[0] || null)}
                        required
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Gallery Image"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteers">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {volunteers.map((volunteer) => (
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
                      {volunteers.length === 0 && (
                        <p className="text-center text-gray-500">No volunteers yet</p>
                      )}
                    </div>
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
