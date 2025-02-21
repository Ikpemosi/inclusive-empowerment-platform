import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref as dbRef, get, query, orderByChild } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/admin/LoginForm";
import NewsManager from "@/components/admin/NewsManager";
import GalleryManager from "@/components/admin/GalleryManager";
import BlogForm from "@/components/admin/BlogForm";
import EventForm from "@/components/admin/EventForm";
import VolunteerList from "@/components/admin/VolunteerList";
import EventManager from "@/components/admin/EventManager";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  if (!isAuthenticated) {
    return (
      <LoginForm 
        email={email}
        password={password}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Button onClick={handleLogout} variant="destructive" disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>

            <Tabs defaultValue="news" className="mt-8">
              <TabsList className="mb-8">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              </TabsList>

              <TabsContent value="news">
                <NewsManager />
              </TabsContent>

              <TabsContent value="gallery">
                <GalleryManager />
              </TabsContent>

              <TabsContent value="blog">
                <BlogForm />
              </TabsContent>

              <TabsContent value="events">
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
                      <EventForm />
                    </CardContent>
                  </Card>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
                    <EventManager />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="volunteers">
                <VolunteerList volunteers={volunteers} />
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
