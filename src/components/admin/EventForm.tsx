
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push } from "firebase/database";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [virtualLink, setVirtualLink] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [flyer, setFlyer] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let flyerUrl = "";
      if (flyer) {
        const flyerRef = storageRef(storage, `events/flyers/${Date.now()}_${flyer.name}`);
        await uploadBytes(flyerRef, flyer);
        flyerUrl = await getDownloadURL(flyerRef);
      }

      const eventsRef = dbRef(db, "events");
      await push(eventsRef, {
        title,
        description,
        date,
        time,
        location,
        virtualLink: virtualLink || null,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
        flyerUrl,
        registeredAttendees: 0,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Event added successfully",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setVirtualLink("");
      setMaxAttendees("");
      setFlyer(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event",
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
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <Input
            placeholder="Location (optional if virtual)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Virtual Meeting Link (Zoom/Google Meet)"
            value={virtualLink}
            onChange={(e) => setVirtualLink(e.target.value)}
            type="url"
          />
          <Input
            type="number"
            placeholder="Maximum Attendees (optional)"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            min="1"
          />
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Event Flyer (optional)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFlyer(e.target.files?.[0] || null)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
