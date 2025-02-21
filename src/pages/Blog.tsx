
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild } from "firebase/database";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/ui/Section";
import { format } from "date-fns";
import Markdown from "react-markdown";

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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h1 className="text-4xl font-bold">Blog</h1>
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <Card 
                      key={post.id}
                      className="group cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedPost(post)}
                    >
                      <CardContent className="p-6">
                        {post.mediaType === "video" ? (
                          <video 
                            src={post.mediaUrl} 
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                          />
                        ) : (
                          <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover mb-4 rounded-lg"
                          />
                        )}
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <div className="line-clamp-3 text-gray-600 mb-4">
                          <Markdown>{post.content}</Markdown>
                        </div>
                        <time className="text-sm text-gray-500">
                          {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                        </time>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                )}

                {filteredPosts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No blog posts found.</p>
                )}
              </>
            )}
          </div>
        </Section>
        <Footer />
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <article className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
              <time className="text-sm text-gray-500 block mb-6">
                {format(new Date(selectedPost.createdAt), 'MMMM d, yyyy')}
              </time>
              {selectedPost.mediaType === "video" ? (
                <video 
                  src={selectedPost.mediaUrl} 
                  controls
                  className="w-full max-h-[500px] object-cover mb-6 rounded-lg"
                />
              ) : (
                <img
                  src={selectedPost.mediaUrl}
                  alt={selectedPost.title}
                  className="w-full max-h-[500px] object-cover mb-6 rounded-lg"
                />
              )}
              <div className="mt-6">
                <Markdown>{selectedPost.content}</Markdown>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Blog;
