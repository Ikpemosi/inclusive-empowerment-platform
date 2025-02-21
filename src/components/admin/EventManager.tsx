import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { ref, get, remove, update } from "firebase/database";
import EventForm from "./EventForm";

interface Registrant {
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
}

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

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [showRegistrants, setShowRegistrants] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const eventsPerPage = 5;
  const [registrantPage, setRegistrantPage] = useState(1);
  const [registrantSearch, setRegistrantSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = ref(db, "events");
      const snapshot = await get(eventsRef);
      const eventsList: Event[] = [];
      
      snapshot.forEach((child) => {
        eventsList.push({
          id: child.key as string,
          ...child.val()
        });
      });
      
      setEvents(eventsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    }
  };

  const fetchRegistrants = async (eventId: string) => {
    try {
      const registrantsRef = ref(db, "eventRegistrations");
      const snapshot = await get(registrantsRef);
      const registrantsList: Registrant[] = [];
      
      snapshot.forEach((child) => {
        const registration = child.val();
        if (registration.eventId === eventId) {
          registrantsList.push(registration);
        }
      });
      
      setRegistrants(registrantsList.sort((a, b) => 
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load registrants",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    setLoading(true);
    try {
      await remove(ref(db, `events/${eventId}`));
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const filteredRegistrants = registrants.filter((registrant) =>
    registrant.name.toLowerCase().includes(registrantSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {paginatedEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-[2fr,1fr] gap-4">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEditForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="mt-2">{event.description}</p>
                  {event.flyerUrl && (
                    <img 
                      src={event.flyerUrl} 
                      alt="Event flyer" 
                      className="mt-4 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Registration Status</h4>
                    <p className="text-sm text-gray-600">
                      Total Registrants: {event.registeredAttendees}
                      {event.maxAttendees && ` / ${event.maxAttendees}`}
                    </p>
                    <Button
                      className="mt-4 w-full"
                      variant="outline"
                      onClick={() => {
                        setSelectedEvent(event);
                        fetchRegistrants(event.id);
                        setShowRegistrants(true);
                      }}
                    >
                      View Registrants
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
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

      <Dialog open={showRegistrants} onOpenChange={setShowRegistrants}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedEvent?.title} - Registrants
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Total Registrants: {registrants.length}
                {selectedEvent?.maxAttendees ? ` / ${selectedEvent.maxAttendees}` : ''}
              </p>
              <Input
                placeholder="Search registrants..."
                className="max-w-xs"
                onChange={(e) => setRegistrantSearch(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registered At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrants.map((registrant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{registrant.name}</TableCell>
                      <TableCell>{registrant.email}</TableCell>
                      <TableCell>{registrant.phone}</TableCell>
                      <TableCell>
                        {new Date(registrant.registeredAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRegistrants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No registrants found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {registrants.length > 10 && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(Math.ceil(filteredRegistrants.length / 10))].map((_, i) => (
                  <Button
                    key={i}
                    variant={registrantPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRegistrantPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <EventForm event={selectedEvent} onSuccess={() => {
            setShowEditForm(false);
            fetchEvents();
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManager;
