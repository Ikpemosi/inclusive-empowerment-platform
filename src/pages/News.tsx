
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const News = () => {
  const newsItems = [
    {
      title: "Coalition of NGOs Set to Promote Digital Literacy & Inclusivity for PWDs",
      date: "2024",
      source: "News Authority",
      link: "https://www.newsauthority.com.ng/coalition-of-ngos-set-to-promote-digital-literacy-inclusivity-for-pwds",
      image: "/lovable-uploads/16dc969c-fe9f-4857-b477-bd98122cc02e.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-primary">
                IDEA in the News
              </h1>
              <p className="text-xl text-gray-600">
                Media coverage and press releases about our initiatives
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {newsItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-[300px] overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <span className="text-sm text-primary font-medium">{item.date}</span>
                        <h2 className="text-2xl font-heading font-bold text-gray-800">
                          {item.title}
                        </h2>
                        <p className="text-gray-600">Source: {item.source}</p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
