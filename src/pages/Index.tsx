import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "@/components/ContactForm";
import VolunteerForm from "@/components/VolunteerForm";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTeamMember, setSelectedTeamMember] = useState<typeof teamMembers[0] | null>(null);
  const [latestImages, setLatestImages] = useState<{ url: string; groupName: string }[]>([]);

  useEffect(() => {
    toast({
      title: "Welcome to IDEA",
      description: "This website is optimized for accessibility. Press Tab to navigate.",
      duration: 5000,
    });

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
  }, [toast]);

  const objectives = [
    {
      title: "Education & Training",
      description: "Provide education and training programs to enhance skills and knowledge",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
    },
    {
      title: "Policy Advocacy",
      description: "Advocate for policy reforms and legal protections",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
    },
    {
      title: "Community Building",
      description: "Build capacity and empower marginalized communities",
      image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&q=80"
    },
    {
      title: "Awareness",
      description: "Promote awareness and challenge harmful stereotypes and stigma",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80"
    },
    {
      title: "Partnerships",
      description: "Foster strategic partnerships with stakeholders",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    }
  ];

  const teamMembers = [
    {
      name: "Blessing Anyiwe, HRM, RN, MPH",
      role: "Executive Director",
      image: "/placeholder.svg",
      bio: "With over 15 years of experience in healthcare and community development, Blessing leads IDEA's mission to create positive change. Her expertise in public health and nursing brings a unique perspective to addressing community needs.",
      achievements: ["Master's in Public Health", "Registered Nurse", "Healthcare Management Certification"]
    },
    {
      name: "HRM Ayo Isinyemeze",
      role: "Executive Intergovernmental Lead",
      image: "/placeholder.svg",
      bio: "As our Executive Intergovernmental Lead, HRM Ayo brings extensive experience in government relations and policy advocacy. His work focuses on building strategic partnerships and advancing our policy initiatives.",
      achievements: ["Government Relations Expert", "Policy Development Specialist", "Community Leadership Award"]
    },
    {
      name: "Ikechukwu Edward, CNA, RN, BSN",
      role: "Director, Fin and Admin",
      image: "/placeholder.svg",
      bio: "Ikechukwu oversees IDEA's financial operations and administrative functions. His background in nursing and business administration ensures efficient management of our resources.",
      achievements: ["Bachelor of Science in Nursing", "Certified Nursing Assistant", "Financial Management Certification"]
    },
    {
      name: "Dr. Anita Adeyemi",
      role: "Director, Projects and Programs Development",
      image: "/placeholder.svg",
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
            <Carousel>
              <CarouselContent>
                {latestImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                           onClick={() => navigate('/gallery')}>
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
              <CarouselPrevious />
              <CarouselNext />
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

      <Section id="contact" className="bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 text-center text-primary">
              Get Involved
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="contact" className="w-full" value={window.location.hash === "#volunteer" ? "volunteer" : "contact"}>
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

      <Dialog open={!!selectedTeamMember} onOpenChange={() => setSelectedTeamMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading mb-2">{selectedTeamMember?.name}</DialogTitle>
            <DialogDescription className="text-primary font-medium">
              {selectedTeamMember?.role}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {selectedTeamMember?.bio}
            </p>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {selectedTeamMember?.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Index;
