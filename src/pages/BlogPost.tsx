
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/ui/Section";
import { format } from "date-fns";
import Markdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  createdAt: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const postRef = ref(db, `blog/${id}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
          setPost({
            id,
            ...snapshot.val()
          });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (!loading && !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Section className="pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </Section>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} - IDEA Blog` : "Loading... - IDEA Blog"}</title>
        <meta name="description" content={post?.content.slice(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        <Section className="pt-20">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-[400px] w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : post && (
              <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <time className="text-sm text-gray-500 block mb-8">
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </time>
                
                {post.mediaType === "video" ? (
                  <video 
                    src={post.mediaUrl} 
                    controls
                    className="w-full max-h-[600px] object-cover mb-8 rounded-lg"
                  />
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-full max-h-[600px] object-cover mb-8 rounded-lg"
                  />
                )}

                <div className="mt-8">
                  <Markdown>{post.content}</Markdown>
                </div>
              </article>
            )}
          </div>
        </Section>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
