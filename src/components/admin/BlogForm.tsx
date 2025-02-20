
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let mediaUrl = "";
      if (media) {
        const mediaRef = storageRef(storage, `blog/${media.name}`);
        await uploadBytes(mediaRef, media);
        mediaUrl = await getDownloadURL(mediaRef);
      }

      const blogRef = dbRef(db, "blog");
      await push(blogRef, {
        title,
        content,
        mediaUrl,
        mediaType: media?.type.startsWith("video/") ? "video" : "image",
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Blog post added successfully",
      });
      
      setTitle("");
      setContent("");
      setMedia(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
            required
          />
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setMedia(e.target.files?.[0] || null)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Blog Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
