
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage, db } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, update } from "firebase/database";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  virtualLink: string | null;
  maxAttendees: number | null;
  flyerUrl?: string;
}

interface EventFormProps {
  event?: Event | null;
  onSuccess?: () => void;
}

const EventForm = ({ event, onSuccess }: EventFormProps) => {
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

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location || "");
      setVirtualLink(event.virtualLink || "");
      setMaxAttendees(event.maxAttendees?.toString() || "");
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let flyerUrl = event?.flyerUrl || "";
      if (flyer) {
        const flyerRef = storageRef(storage, `events/flyers/${Date.now()}_${flyer.name}`);
        await uploadBytes(flyerRef, flyer);
        flyerUrl = await getDownloadURL(flyerRef);
      }

      const eventData = {
        title,
        description,
        date,
        time,
        location: location || null,
        virtualLink: virtualLink || null,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
        flyerUrl: flyerUrl || null,
        ...(event ? {} : { registeredAttendees: 0, createdAt: new Date().toISOString() })
      };

      if (event) {
        await update(dbRef(db, `events/${event.id}`), eventData);
      } else {
        await push(dbRef(db, "events"), eventData);
      }

      toast({
        title: "Success",
        description: `Event ${event ? "updated" : "added"} successfully`,
      });
      
      onSuccess?.();

      if (!event) {
        // Only reset form for new events
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setVirtualLink("");
        setMaxAttendees("");
        setFlyer(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${event ? "update" : "add"} event`,
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
            <label className="text-sm text-gray-500">
              Event Flyer (optional) {event?.flyerUrl && "- Leave empty to keep current flyer"}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFlyer(e.target.files?.[0] || null)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? `${event ? "Updating" : "Adding"}...` : event ? "Update Event" : "Add Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
