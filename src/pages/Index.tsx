import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "@/components/ContactForm";
import VolunteerForm from "@/components/VolunteerForm";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [latestImages, setLatestImages] = useState<{ url: string; groupName: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("contact");
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    toast({
      title: "Welcome to IDEA",
      description: "This website is optimized for accessibility. Press Tab to navigate.",
      duration: 5000,
    });

    // Handle hash-based navigation
    const handleHashChange = () => {
      if (window.location.hash === "#volunteer") {
        setActiveTab("volunteer");
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (window.location.hash === "#contact") {
        setActiveTab("contact");
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHashChange(); // Initial check
    window.addEventListener("hashchange", handleHashChange);

    const fetchLatestGalleryImages = async () => {
      try {
        const galleryRef = ref(db, "gallery");
        const snapshot = await get(query(galleryRef, orderByChild("uploadedAt"), limitToLast(5)));
        const images: { url: string; groupName: string }[] = [];
        
        snapshot.forEach((child) => {
          const data = child.val();
          images.push({
            url: data.url,
            groupName: data.groupName
          });
        });

        setLatestImages(images.reverse());
      } catch (error) {
        console.error("Failed to load gallery preview:", error);
      }
    };

    fetchLatestGalleryImages();

    const fetchUpcomingEvents = async () => {
      try {
        const eventsRef = ref(db, "events");
        const snapshot = await get(query(eventsRef, orderByChild("date")));
        const events: any[] = [];
        const today = new Date().setHours(0, 0, 0, 0);
        
        snapshot.forEach((child) => {
          const event = {
            id: child.key,
            ...child.val()
          };
          if (new Date(event.date).getTime() >= today) {
            events.push(event);
          }
        });
        
        setUpcomingEvents(events.slice(0, 3)); // Get next 3 upcoming events
      } catch (error) {
        console.error("Failed to load upcoming events:", error);
      }
    };

    fetchUpcomingEvents();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [toast]);

  const objectives = [
    {
      title: "Education & Training",
      description: "Provide education and training programs to enhance skills and knowledge",
      image: "education-unsplash.jpg"
    },
    {
      title: "Policy Advocacy",
      description: "Advocate for policy reforms and legal protections",
      image: "policy-idea.jpg"
    },
    {
      title: "Community Building",
      description: "Build capacity and empower marginalized communities",
      image: "foodbank-pexels.jpg"
    },
    {
      title: "Awareness",
      description: "Promote awareness and challenge harmful stereotypes and stigma",
      image: "awareness-ideas.jpg"
    },
    {
      title: "Partnerships",
      description: "Foster strategic partnerships with stakeholders",
      image: "partnership-unsplash.jpg"
    }
  ];

  const teamMembers = [
    {
      name: "Blessing Anyiwe, HRM, RN, MPH",
      role: "Executive Director",
      image: "/MadamBlessing.jpg",
      bio: "With over 15 years of experience in healthcare and community development, Blessing leads IDEA's mission to create positive change. Her expertise in public health and nursing brings a unique perspective to addressing community needs.",
      achievements: ["Master's in Public Health", "Registered Nurse", "Healthcare Management Certification"]
    },
    {
      name: "HRM Ayo Isinyemeze",
      role: "Executive Intergovernmental Lead",
      image: "/HRMAyo.jpg",
      bio: "As our Executive Intergovernmental Lead, HRM Ayo brings extensive experience in government relations and policy advocacy. His work focuses on building strategic partnerships and advancing our policy initiatives.",
      achievements: ["Government Relations Expert", "Policy Development Specialist", "Community Leadership Award"]
    },
    {
      name: "Ikechukwu Edward, CNA, RN, BSN",
      role: "Director, Fin and Admin",
      image: "/MrIke.jpg",
      bio: "Ikechukwu oversees IDEA's financial operations and administrative functions. His background in nursing and business administration ensures efficient management of our resources.",
      achievements: ["Bachelor of Science in Nursing", "Certified Nursing Assistant", "Financial Management Certification"]
    },
    {
      name: "Dr. Anita Adeyemi",
      role: "Director, Projects and Programs Development",
      image: "/DrAnita.jpg",
      bio: "Dr. Adeyemi leads the development and implementation of IDEA's programs. Her expertise in project management and community development has been instrumental in our success.",
      achievements: ["Ph.D. in Community Development", "Project Management Professional", "Impact Assessment Specialist"]
    }
  ];

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <Section id="about" className="bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-accent">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            A future characterized by universal access, equal opportunities, and unfettered empowerment of women, youth, and persons with disability.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-white to-primary/5 border-primary/10 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-secondary group-hover:text-primary transition-colors">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To advance the social, economic, and political inclusion through strategic advocacy, capacity enhancement and community engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-accent/5 border-accent/10 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-secondary group-hover:text-accent transition-colors">
                  Our Values
                </h3>
                <p className="text-gray-600">
                  Inclusivity, empowerment, and social justice guide our work towards creating a more equitable society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="what-we-do" className="bg-gradient-to-b from-secondary/5 to-accent/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-secondary">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work tirelessly to create positive change through various initiatives and programs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {objectives.map((objective, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={objective.image}
                    alt={objective.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-heading font-semibold text-xl">
                    {objective.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{objective.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="team" className="bg-gradient-to-b from-accent/5 to-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-accent">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of professionals working to make a difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-gray-800">{member.name}</h3>
                <p className="text-primary mb-4">{member.role}</p>
                <Link 
                  to="/team"
                  className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {latestImages.length > 0 && (
        <Section id="gallery-preview" className="bg-gradient-to-b from-white to-primary/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary">Gallery Preview</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a glimpse at our recent events and activities
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {latestImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <div 
                        className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer h-full"
                        onClick={() => setSelectedImage(image.url)}
                      >
                        <img
                          src={image.url}
                          alt={image.groupName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium">{image.groupName}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
            <div className="text-center mt-8">
              <Link 
                to="/gallery"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Full Gallery
              </Link>
            </div>
          </div>
        </Section>
      )}

      {upcomingEvents.length > 0 && (
        <Section id="upcoming-events" className="bg-gradient-to-b from-white to-primary/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join us at our upcoming events and be part of our community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {event.flyerUrl && (
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <img
                        src={event.flyerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <p>{event.time}</p>
                    {event.location && <p>{event.location}</p>}
                  </div>
                  <Link to="/events">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </Section>
      )}

      <Section id="contact" className="bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 text-center text-primary">
              Get Involved
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="contact">Contact Us</TabsTrigger>
                    <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-heading font-semibold mb-4">Send us a Message</h3>
                      <ContactForm />
                    </div>
                  </TabsContent>
                  <TabsContent value="volunteer">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-heading font-semibold mb-4">Volunteer Application</h3>
                      <VolunteerForm />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Footer />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size gallery"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Index;
