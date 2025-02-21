
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild } from "firebase/database";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/ui/Section";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  createdAt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const blogRef = ref(db, "blog");
        const snapshot = await get(query(blogRef, orderByChild("createdAt")));
        const blogPosts: BlogPost[] = [];
        
        snapshot.forEach((child) => {
          blogPosts.push({
            id: child.key as string,
            ...child.val()
          });
        });
        
        setPosts(blogPosts.reverse());
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - IDEA</title>
        <meta name="description" content="Read the latest updates, stories, and insights from the IDEA team." />
        <meta property="og:title" content="Blog - IDEA" />
        <meta property="og:description" content="Read the latest updates, stories, and insights from the IDEA team." />
        <meta property="og:type" content="blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        <Section id="blog" className="pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            
            {loading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-40 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id}>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                        {post.mediaType === "video" ? (
                          <video 
                            src={post.mediaUrl} 
                            controls
                            className="w-full max-h-[400px] object-cover mb-4 rounded-lg"
                          />
                        ) : (
                          <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="w-full max-h-[400px] object-cover mb-4 rounded-lg"
                          />
                        )}
                        <div className="prose max-w-none">
                          {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <time className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </CardContent>
                    </Card>
                  </article>
                ))}
                {posts.length === 0 && (
                  <p className="text-center text-gray-500">No blog posts yet.</p>
                )}
              </div>
            )}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
