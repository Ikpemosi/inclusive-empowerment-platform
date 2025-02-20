
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import { ref as dbRef, get, remove, update } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import NewsForm from "./NewsForm";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  link: string;
  image: string;
  date: string;
}

const NewsManager = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSource, setEditSource] = useState("");
  const [editLink, setEditLink] = useState("");
  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      const newsRef = dbRef(db, "news");
      const snapshot = await get(newsRef);
      const newsItems: NewsItem[] = [];
      snapshot.forEach((child) => {
        newsItems.push({
          id: child.key as string,
          ...child.val()
        });
      });
      setNews(newsItems.reverse());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load news items",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (newsItem: NewsItem) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    
    setLoading(true);
    try {
      // Delete the image from storage if it exists
      if (newsItem.image) {
        const imageRef = storageRef(storage, newsItem.image);
        await deleteObject(imageRef);
      }

      // Delete the news item from the database
      const newsRef = dbRef(db, `news/${newsItem.id}`);
      await remove(newsRef);

      toast({
        title: "Success",
        description: "News item deleted successfully",
      });

      fetchNews();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    setLoading(true);
    try {
      const newsRef = dbRef(db, `news/${editingNews.id}`);
      await update(newsRef, {
        title: editTitle,
        source: editSource,
        link: editLink,
      });

      toast({
        title: "Success",
        description: "News item updated successfully",
      });

      setEditingNews(null);
      fetchNews();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <NewsForm />
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Existing News Items</h3>
        {news.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">Source: {item.source}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingNews(item);
                      setEditTitle(item.title);
                      setEditSource(item.source);
                      setEditLink(item.link);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit News Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <Input
              placeholder="News Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Source"
              value={editSource}
              onChange={(e) => setEditSource(e.target.value)}
              required
            />
            <Input
              placeholder="Link"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManager;
