
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";

const NewsForm = () => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSource, setNewsSource] = useState("");
  const [newsLink, setNewsLink] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (newsImage) {
        const imageRef = storageRef(storage, `news/${newsImage.name}`);
        await uploadBytes(imageRef, newsImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newsRef = dbRef(db, "news");
      await push(newsRef, {
        title: newsTitle,
        source: newsSource,
        link: newsLink,
        image: imageUrl,
        date: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "News item added successfully",
      });
      
      setNewsTitle("");
      setNewsSource("");
      setNewsLink("");
      setNewsImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add news item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleNewsSubmit} className="space-y-4">
          <Input
            placeholder="News Title"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Source"
            value={newsSource}
            onChange={(e) => setNewsSource(e.target.value)}
            required
          />
          <Input
            placeholder="Link"
            value={newsLink}
            onChange={(e) => setNewsLink(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setNewsImage(e.target.files?.[0] || null)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add News Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsForm;
