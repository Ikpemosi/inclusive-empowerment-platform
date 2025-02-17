
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast for accessibility announcement
    toast({
      title: "Welcome to IDEA",
      description: "This website is optimized for accessibility. Press Tab to navigate.",
      duration: 5000,
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* Additional sections will be added here */}
    </main>
  );
};

export default Index;
