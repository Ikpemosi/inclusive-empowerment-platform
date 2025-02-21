import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild } from "firebase/database";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/ui/Section";
import EventRegistrationForm from "@/components/events/EventRegistrationForm";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  virtualLink: string | null;
  maxAttendees: number | null;
  registeredAttendees: number;
  flyerUrl?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = ref(db, "events");
      const snapshot = await get(query(eventsRef, orderByChild("date")));
      const eventsList: Event[] = [];
      
      snapshot.forEach((child) => {
        eventsList.push({
          id: child.key as string,
          ...child.val()
        });
      });
      
      setEvents(eventsList);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isDateWithEvent = (date: Date) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isPastEvent = (date: string) => {
    return new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <>
      <Helmet>
        <title>Events Calendar - IDEA</title>
        <meta name="description" content="View and register for upcoming IDEA events." />
        <meta property="og:title" content="Events Calendar - IDEA" />
        <meta property="og:description" content="View and register for upcoming IDEA events." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        <Section id="events" className="pt-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Events Calendar</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow"
                  modifiers={{
                    hasEvent: (date) => isDateWithEvent(date),
                  }}
                  modifiersStyles={{
                    hasEvent: { 
                      backgroundColor: 'rgb(var(--primary) / 0.15)',
                      fontWeight: 'bold',
                      color: 'rgb(var(--primary))',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(var(--primary))'
                      }
                    }
                  }}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
                </h2>
                {selectedDate && getEventsForDate(selectedDate).map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    {event.flyerUrl && (
                      <img
                        src={event.flyerUrl}
                        alt={`${event.title} flyer`}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Time: {event.time}</p>
                      {event.location && <p>Location: {event.location}</p>}
                      {event.virtualLink && (
                        <p>
                          Virtual Link:{" "}
                          <a
                            href={event.virtualLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Join Meeting
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      {event.maxAttendees && (
                        <span className="text-sm text-gray-500">
                          {event.registeredAttendees}/{event.maxAttendees} registered
                        </span>
                      )}
                      <Button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegistration(true);
                        }}
                        disabled={isPastEvent(event.date)}
                      >
                        {isPastEvent(event.date) ? "Past Event" : "Register"}
                      </Button>
                    </div>
                  </div>
                ))}
                {selectedDate && getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500">No events scheduled for this date.</p>
                )}
              </div>
            </div>
          </div>
        </Section>
        <Footer />
      </div>

      {selectedEvent && (
        <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <EventRegistrationForm 
              event={selectedEvent}
              onSuccess={() => {
                setShowRegistration(false);
                fetchEvents();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Events;
