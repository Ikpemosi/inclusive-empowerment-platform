
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
    "Provide education and training programs",
    "Advocate for policy reforms",
    "Build capacity in communities",
    "Promote awareness and challenge stigma",
    "Foster strategic partnerships"
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-accent">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-12">
            A future characterized by universal access, equal opportunities, and unfettered empowerment of women, youth, and persons with disability.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/50 backdrop-blur border-primary/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-secondary">Our Mission</h3>
                <p className="text-gray-600">
                  To advance the social, economic, and political inclusion through strategic advocacy, capacity enhancement and community engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur border-primary/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-secondary">Our Values</h3>
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-secondary">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work tirelessly to create positive change through various initiatives and programs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {objectives.map((objective, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-primary/5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <span className="inline-block w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4 flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-700">{objective}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="bg-gradient-to-b from-accent/5 to-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-accent">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of professionals working to make a difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-gray-800">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Index;
