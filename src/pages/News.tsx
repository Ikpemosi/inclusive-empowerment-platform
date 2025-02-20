
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild } from "firebase/database";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  link: string;
  image: string;
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = ref(db, "news");
        const snapshot = await get(query(newsRef, orderByChild("date")));
        const items: NewsItem[] = [];
        
        snapshot.forEach((child) => {
          items.push({
            id: child.key!,
            ...child.val()
          });
        });

        setNewsItems(items.reverse());
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load news items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
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
              {newsItems.length === 0 && (
                <p className="text-center text-gray-500">No news items available</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
