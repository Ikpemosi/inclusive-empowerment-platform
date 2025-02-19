import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to IDEA",
      description: "This website is optimized for accessibility. Press Tab to navigate.",
      duration: 5000,
    });
  }, []);

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
    },
    {
      name: "HRM Ayo Isinyemeze",
      role: "Executive Intergovernmental Lead",
      image: "/placeholder.svg",
    },
    {
      name: "Ikechukwu Edward, CNA, RN, BSN",
      role: "Director, Fin and Admin",
      image: "/placeholder.svg",
    },
    {
      name: "Dr. Anita Adeyemi",
      role: "Director, Projects and Programs Development",
      image: "/placeholder.svg",
    }
  ];

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* About Section */}
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

      {/* What We Do Section */}
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

      {/* Team Section */}
      <Section id="team" className="bg-gradient-to-b from-accent/5 to-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-accent">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of professionals working to make a difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-gray-800">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default Index;
