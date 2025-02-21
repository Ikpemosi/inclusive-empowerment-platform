
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { ref, push, update } from "firebase/database";

interface Event {
  id: string;
  title: string;
  registeredAttendees: number;
  maxAttendees: number;
}

interface EventRegistrationFormProps {
  event: Event;
  onSuccess: () => void;
}

const EventRegistrationForm = ({ event, onSuccess }: EventRegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (event.registeredAttendees >= event.maxAttendees) {
        throw new Error("Event is fully booked");
      }

      // Add registration
      const registrationRef = ref(db, "eventRegistrations");
      await push(registrationRef, {
        eventId: event.id,
        eventTitle: event.title,
        name,
        email,
        phone,
        registeredAt: new Date().toISOString(),
      });

      // Update event attendee count
      const eventRef = ref(db, `events/${event.id}`);
      await update(eventRef, {
        registeredAttendees: event.registeredAttendees + 1,
      });

      toast({
        title: "Success",
        description: "You have successfully registered for the event",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register for event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading || event.registeredAttendees >= event.maxAttendees}>
        {loading ? "Registering..." : 
         event.registeredAttendees >= event.maxAttendees ? "Event Full" : "Register"}
      </Button>
    </form>
  );
};

export default EventRegistrationForm;
