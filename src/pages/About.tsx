
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
                About IDEA
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Empowering communities through inclusive development and advocacy
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-secondary">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  IDEA was founded with a vision to create a more inclusive and equitable society. 
                  Our journey began with a simple yet powerful belief: everyone deserves equal 
                  opportunities to thrive and participate fully in society.
                </p>
                <p className="text-gray-600">
                  Today, we continue to work tirelessly towards this vision, partnering with 
                  communities, organizations, and stakeholders to create lasting positive change.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80" 
                  alt="Team meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
